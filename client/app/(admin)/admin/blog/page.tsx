"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Edit, Plus, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"

interface BlogPost {
  _id: string
  title: string
  slug: string
  author: string
  category: string
  date: string
}

export default function AdminBlogPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/blog")

        if (!res.ok) {
          throw new Error("Failed to fetch posts")
        }

        const data = await res.json()
        setPosts(data)
      } catch (err) {
        setError("Error loading blog posts. Please try again.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleDelete = async (slug: string) => {
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        throw new Error("Failed to delete post")
      }

      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post.slug !== slug))
      setDeleteDialogOpen(false)
    } catch (err) {
      console.error("Error deleting post:", err)
      setError("Failed to delete post. Please try again.")
    }
  }

  const confirmDelete = (slug: string) => {
    setPostToDelete(slug)
    setDeleteDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Blog Management</h1>
        <div className="text-center py-10">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Blog Management</h1>
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={() => router.push("/admin/blog/new")}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-10 bg-muted rounded-lg">
          <p className="mb-4">No blog posts found.</p>
          <Button onClick={() => router.push("/admin/blog/new")}>Create Your First Post</Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>{formatDate(post.date)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.push(`/admin/blog/edit/${post.slug}`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => confirmDelete(post.slug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => postToDelete && handleDelete(postToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
