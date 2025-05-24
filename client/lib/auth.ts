import { cookies } from "next/headers"

// Simple authentication configuration
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123", // In production, use environment variables and hashed passwords
}

const AUTH_COOKIE_NAME = "admin-auth"
const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface AuthUser {
  username: string
  isAuthenticated: boolean
}

// Server-side authentication functions
export async function authenticateUser(username: string, password: string): Promise<boolean> {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
}

export async function createAuthSession(username: string): Promise<string> {
  // In production, use a proper JWT or session token
  const sessionData = {
    username,
    timestamp: Date.now(),
  }
  return Buffer.from(JSON.stringify(sessionData)).toString("base64")
}

export async function verifyAuthSession(token: string): Promise<AuthUser | null> {
  try {
    const sessionData = JSON.parse(Buffer.from(token, "base64").toString())

    // Check if session is expired (7 days)
    if (Date.now() - sessionData.timestamp > AUTH_COOKIE_MAX_AGE * 1000) {
      return null
    }

    return {
      username: sessionData.username,
      isAuthenticated: true,
    }
  } catch {
    return null
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies()
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME)

    if (!authCookie) {
      return null
    }

    return await verifyAuthSession(authCookie.value)
  } catch {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTH_COOKIE_MAX_AGE,
    path: "/",
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE_NAME)
}

// Client-side authentication context
export function isAuthenticatedOnClient(): boolean {
  if (typeof window === "undefined") return false

  // Check for auth cookie on client side (simplified check)
  return document.cookie.includes(AUTH_COOKIE_NAME)
}
