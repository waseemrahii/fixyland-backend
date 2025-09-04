import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    rating: { type: Number, default: 0 },
    pricePerNight: { type: Number, required: true },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);
