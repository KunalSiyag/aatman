import { NextResponse } from "next/server"
import {connectToDatabase} from "@/lib/mongodb"
import BlogPost from "@/models/BlogPost"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    await connectToDatabase()
    const post = await BlogPost.findOne({ slug })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params
    const body = await request.json()

    await connectToDatabase()

    // Find the post to update
    const post = await BlogPost.findOne({ slug })
    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    // If slug is being changed, check if new slug already exists
    if (body.slug && body.slug !== slug) {
      const existingPost = await BlogPost.findOne({ slug: body.slug })
      if (existingPost) {
        return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
      }
    }

    // Update the post
    const updatedPost = await BlogPost.findOneAndUpdate({ slug }, { $set: body }, { new: true, runValidators: true })

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const { slug } = params

    await connectToDatabase()

    const post = await BlogPost.findOneAndDelete({ slug })

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}
