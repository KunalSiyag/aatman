import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Calendar, Settings } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

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
      </div>
    </div>
  )
}
