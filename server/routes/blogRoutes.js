const express = require("express")
const Blog = require("../models/Blog")
const router = express.Router()

// Fetch all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
    res.status(200).json(blogs)
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" })
  }
})

// Fetch a single blog by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const blog = await Blog.findById(id)
    if (!blog) return res.status(404).json({ error: "Blog not found" })
    res.status(200).json(blog)
  } catch (error) {
    res.status(500).json({ error: "Error fetching blog" })
  }
})

// Seed database with initial blogs (Optional for testing)
router.post("/seed", async (req, res) => {
  const sampleBlogs = [
    {
      title: "The Impact of Community Service",
      excerpt: "How our community initiatives are making a difference in rural areas...",
      author: "Divyansh Gaur",
      date: "March 15, 2023",
      category: "Community",
      image: "/placeholder.svg",
    },
    {
      title: "Yoga for Mental Wellbeing",
      excerpt: "Exploring the benefits of yoga practices for mental health and wellness...",
      author: "Priya Sharma",
      date: "February 28, 2023",
      category: "Yoga",
      image: "/placeholder.svg",
    },
  ]

  try {
    await Blog.insertMany(sampleBlogs)
    res.status(201).json({ message: "Blogs seeded successfully" })
  } catch (error) {
    res.status(500).json({ error: "Error seeding blogs" })
  }
})

module.exports = router
