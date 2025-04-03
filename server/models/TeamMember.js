import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  image: String,
});

export default mongoose.model("TeamMember", teamMemberSchema);
