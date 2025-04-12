// File: pages/api/contact.js

import mongoose from "mongoose";
import Contact from "../models/contact.js";

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection caching to prevent re-connection issues in development
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB connected:", isConnected);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw new Error("Failed to connect to MongoDB");
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { name, email, phone, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Please fill in all required fields." });
  }

  try {
    await connectDB(); // Connect to MongoDB

    // Create and save a new contact entry
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();

    console.log("📬 Contact Form Submission Saved:", newContact);

    return res.status(200).json({ message: "Message sent and saved successfully." });
  } catch (error) {
    console.error("❌ Error saving contact message:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}
