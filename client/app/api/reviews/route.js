import { NextResponse } from "next/server";
import mongoose from "mongoose";
import Review from "@/models/Review";

export async function GET() {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  try {
    const reviews = await Review.find();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
