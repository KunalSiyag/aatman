import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Calendar, Settings, Shield } from "lucide-react"
import { getAuthUser } from "@/lib/auth"
import LogoutButton from "@/components/auth/logout-button";
export default async function AdminDashboard() {
  const user = await getAuthUser()

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        {user && (
          <p className="text-muted-foreground">
            Logged in as <span className="font-medium">{user.username}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/blog">
          <Card className="hover:shadow-md transition-all cursor-pointer h-full">
            <CardHeader>
              <FileText className="h-8 w-8 mb-2 text-primary" />
              <CardTitle>Blog Management</CardTitle>
              <CardDescription>Create, edit, and manage blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Manage all your blog content in one place</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-md transition-all cursor-pointer h-full">
          <CardHeader>
            <Users className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Control access and roles for your team members</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer h-full">
          <CardHeader>
            <Calendar className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Events</CardTitle>
            <CardDescription>Manage upcoming events and registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Schedule and organize your foundation's events</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer h-full">
          <CardHeader>
            <Settings className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Site Settings</CardTitle>
            <CardDescription>Configure website settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Customize your website appearance and behavior</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all cursor-pointer h-full">
          <CardHeader>
            <Shield className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Security</CardTitle>
            <CardDescription>Manage authentication and security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configure admin access and security preferences</p>
          </CardContent>
        </Card>
      </div>
      <LogoutButton/>
    </div>
  )
}
