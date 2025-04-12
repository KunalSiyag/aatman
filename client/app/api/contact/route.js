import mongoose from "mongoose"
import Contact from "@/models/Contact"
import { NextResponse } from "next/server"
import dotenv from "dotenv"

dotenv.config()

// Connect to MongoDB once
let isConnected = false
async function connectDB() {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    isConnected = true
    console.log("✅ MongoDB connected")
  } catch (err) {
    console.error("❌ MongoDB connection error:", err)
  }
}

// POST /api/contact
export async function POST(req) {
  try {
    await connectDB()

    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      )
    }

    const newContact = new Contact({ name, email, phone, subject, message })
    await newContact.save()

    console.log("📬 Contact submission saved:", newContact)

    return NextResponse.json({ message: "Message sent successfully." }, { status: 200 })
  } catch (error) {
    console.error("❌ Error in contact API:", error)
    return NextResponse.json({ message: "Internal server error." }, { status: 500 })
  }
}
