import mongoose from "mongoose";
import dotenv from "dotenv";
import TeamMember from "./models/TeamMember.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const teamMembers = [
  {
    name: "Divyansh Gaur",
    role: "Founder & Director",
    bio: "Divyansh founded Aatman Foundation...",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    name: "Alice Johnson",
    role: "CEO & Founder",
    bio: "Alice is the visionary leader behind our company, driving innovation and excellence.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
  },
  {
    name: "Michael Smith",
    role: "CTO",
    bio: "Michael oversees our technology strategy, ensuring cutting-edge solutions.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
  },
  {
    name: "Sophia Lee",
    role: "Lead Designer",
    bio: "Sophia crafts stunning designs that resonate with our audience.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  },
  {
    name: "Daniel Martinez",
    role: "Backend Engineer",
    bio: "Daniel builds robust backend systems that power our platform.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
  },
  {
    name: "Emily Brown",
    role: "Marketing Head",
    bio: "Emily leads our marketing team, creating compelling brand narratives.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    name: "James Wilson",
    role: "Full-Stack Developer",
    bio: "James specializes in both frontend and backend development.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79"
  },
  {
    name: "Olivia Davis",
    role: "HR Manager",
    bio: "Olivia ensures our team thrives in a positive work environment.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4"
  }
];

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");
    await TeamMember.deleteMany();
    await TeamMember.insertMany(teamMembers);
    console.log("Team members seeded!");
    mongoose.connection.close();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
