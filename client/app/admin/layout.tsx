import type React from "react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-xl">
              Admin Dashboard
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/admin/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                View Site
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-muted/40">{children}</main>
    </div>
  )
}
