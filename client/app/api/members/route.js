import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";

export async function GET() {
  try {
    await connectToDatabase();
    const members = await TeamMember.find();
    return NextResponse.json(members, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching members", error }, { status: 500 });
  }
}
