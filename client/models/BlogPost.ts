import mongoose, { Schema, type Document } from "mongoose"

export interface IBlogPost extends Document {
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: Date
  category: string
  image: string
  featured?: boolean
}

const BlogPostSchema: Schema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  image: { type: String, default: "/placeholder.svg?height=200&width=400" },
  featured: { type: Boolean, default: false },
})

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>("BlogPost", BlogPostSchema)
