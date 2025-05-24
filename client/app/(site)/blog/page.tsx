import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
export const dynamic = 'force-dynamic';

async function getBlogPosts() {
  try {
    const res = await fetch("https://aatmanfoundation.netlify.app/api/blog", {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch blog posts")
    }

    return res.json()
  } catch (error) {
    console.error("Error loading blog posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
      <p className="text-muted-foreground mb-12">Insights, stories, and updates from Aatman Foundation</p>

      {blogPosts.length === 0 ? (
        <div className="text-center py-10">
          <p>No blog posts found. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post._id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image
                  src={post.image || "/placeholder.svg?height=200&width=400"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="text-sm text-muted-foreground mb-2">
                  {post.category} • {formatDate(post.date)}
                </div>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">By {post.author}</div>
                <Link href={`blog/${post.slug}`} className="text-primary hover:underline text-sm font-medium">
                  Read More
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}