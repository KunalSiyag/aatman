import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag } from "lucide-react"
import { formatDate } from "@/lib/utils"

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${slug}`, {
      cache: "no-store",
    })
    if (!res.ok) {
      return null
    }
    return res.json()
  } catch (error) {
    console.error("Error loading blog post:", error)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  if (!post) notFound()

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Back Button */}
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-primary hover:underline mb-6 transition"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      {/* Blog Header */}
      <div className="space-y-6">
        {/* Image */}
        <div className="aspect-video relative rounded-xl overflow-hidden shadow-md">
          <Image
            src={post.image || "/placeholder.svg?height=400&width=800"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Title & Metadata */}
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="h-4 w-4" />
              <span className="inline-block bg-muted px-2 py-0.5 rounded-full text-xs">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="mt-10 prose prose-neutral prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  )
}
