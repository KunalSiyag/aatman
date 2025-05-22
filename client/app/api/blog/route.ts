import { NextResponse } from "next/server"
import {connectToDatabase} from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"

export async function GET() {
  try {
    await connectToDatabase()
    const posts = await BlogPost.find({}).sort({ date: -1 })

    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "slug", "excerpt", "content", "author", "category"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 })
      }
    }

    await connectToDatabase()

    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug: body.slug })
    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    const newPost = new BlogPost(body)
    await newPost.save()

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
