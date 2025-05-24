import { type NextRequest, NextResponse } from "next/server"
import { authenticateUser, createAuthSession, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    const isValid = await authenticateUser(username, password)

    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session token
    const sessionToken = await createAuthSession(username)

    // Create response
    const response = NextResponse.json({ success: true, message: "Login successful" }, { status: 200 })

    // Set auth cookie
    await setAuthCookie(sessionToken)

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
