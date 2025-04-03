import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
  name: String,
  role: String,
  bio: String,
  image: String,
});

export default mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);

