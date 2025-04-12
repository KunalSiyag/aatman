import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  Aategory: {type: String, required: true},
  Author: {type: String, required: true},
  Description: {type: String, required: true},
  Date: {type:Date, required: true},
  Title: {type: String, required: true}
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
