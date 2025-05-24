"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface BlogPostData {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  image: string
}

export default function EditBlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { slug } = params

  const [formData, setFormData] = useState<BlogPostData>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    image: "",
  })

  const [originalSlug, setOriginalSlug] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/blog/${slug}`)

        if (!res.ok) {
          throw new Error("Failed to fetch post")
        }

        const post = await res.json()
        setFormData(post)
        setOriginalSlug(post.slug)
      } catch (err) {
        console.error("Error fetching post:", err)
        setError("Failed to load blog post. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch(`/api/blog/${originalSlug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to update blog post")
      }

      router.push("/admin/blog")
    } catch (err) {
      console.error("Error updating post:", err)
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
        <div className="text-center py-10">Loading...</div>
      </div>
    )
  }

  if (error && !formData.title) {
    return (
      <div className="container mx-auto py-16 px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>
        <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>
        <Button onClick={() => router.push("/admin/blog")}>Back to Blog Management</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-16 px-4 max-w-4xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.push("/admin/blog")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog Management
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>Update the details of your blog post</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && <div className="bg-red-50 text-red-500 p-4 rounded-md mb-6">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" name="slug" value={formData.slug} onChange={handleChange} required />
              <p className="text-sm text-muted-foreground">This will be used in the URL</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input id="image" name="image" value={formData.image} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                required
              />
              <p className="text-sm text-muted-foreground">A short summary that appears on the blog listing</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                required
              />
              <p className="text-sm text-muted-foreground">HTML content is supported</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
