import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.models.Review || mongoose.model("Review", ReviewSchema);
