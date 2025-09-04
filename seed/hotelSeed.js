import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Hotel from "../models/Hotel.js";

dotenv.config();
connectDB();

const hotelData = [
  { name: "Hotel Paradise", location: "New York", rating: 4.5, pricePerNight: 150, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" },
  { name: "Luxury Inn", location: "Los Angeles", rating: 4.8, pricePerNight: 200, image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80" },
];

const importData = async () => {
  try {
    await Hotel.deleteMany();
    await Hotel.insertMany(hotelData);
    console.log("✅ Hotels Seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
