import mongoose from "mongoose";
import dotenv from "dotenv";
import Review from "./models/Review.js";

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const reviews = [
  {
    name: "Rahul Mehta",
    location: "Delhi",
    rating: 5,
    text: "The yoga sessions organized by Aatman Foundation have transformed my life. The instructors are knowledgeable and compassionate.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c"
  },
  {
    name: "Meera Patel",
    location: "Mumbai",
    rating: 5,
    text: "I've been volunteering with Aatman Foundation's environmental initiatives for the past year, and I'm impressed by their commitment.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2"
  },
  {
    name: "Arjun Singh",
    location: "Jaipur",
    rating: 4,
    text: "The community service programs run by Aatman Foundation address real needs in our neighborhood.",
    image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79"
  },
  {
    name: "Lakshmi Krishnan",
    location: "Bangalore",
    rating: 5,
    text: "As a donor to Aatman Foundation, I appreciate their transparency and the regular updates about how my contributions are used.",
    image: "https://images.unsplash.com/photo-1554151228-14d9def656e4"
  }
];

const seedDatabase = async () => {
  try {
    await Review.deleteMany();
    await Review.insertMany(reviews);
    console.log("Reviews seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding reviews:", error);
    mongoose.connection.close();
  }
};

seedDatabase();
