import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  // Sample blog data - in a real app, this would come from a CMS or API
  const blogPosts = [
    {
      id: 1,
      title: "The Impact of Community Service",
      excerpt: "How our community initiatives are making a difference in rural areas...",
      author: "Divyansh Gaur",
      date: "March 15, 2023",
      category: "Community",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Yoga for Mental Wellbeing",
      excerpt: "Exploring the benefits of yoga practices for mental health and wellness...",
      author: "Priya Sharma",
      date: "February 28, 2023",
      category: "Yoga",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Nature Conservation Efforts",
      excerpt: "Our recent initiatives to protect local ecosystems and promote sustainability...",
      author: "Amit Patel",
      date: "January 20, 2023",
      category: "Environment",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Volunteer Stories: Making a Difference",
      excerpt: "Stories from our volunteers about their experiences and the impact they've made...",
      author: "Ritu Verma",
      date: "December 12, 2022",
      category: "Volunteers",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
      <p className="text-muted-foreground mb-12">Insights, stories, and updates from Aatman Foundation</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
            <CardHeader>
              <div className="text-sm text-muted-foreground mb-2">
                {post.category} • {post.date}
              </div>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.excerpt}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">By {post.author}</div>
              <Link href={`/blog/${post.id}`} className="text-primary hover:underline text-sm font-medium">
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

