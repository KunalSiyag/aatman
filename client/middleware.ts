import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyAuthSession } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for admin routes (except login)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const authCookie = request.cookies.get("admin-auth")

    if (!authCookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }

    try {
      const user = await verifyAuthSession(authCookie.value)

      if (!user) {
        return NextResponse.redirect(new URL("/admin/login", request.url))
      }
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
  }

  // Redirect to admin dashboard if already authenticated and trying to access login
  if (pathname === "/admin/login") {
    const authCookie = request.cookies.get("admin-auth")

    if (authCookie) {
      try {
        const user = await verifyAuthSession(authCookie.value)

        if (user) {
          return NextResponse.redirect(new URL("/admin", request.url))
        }
      } catch {
        // Invalid session, continue to login page
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
