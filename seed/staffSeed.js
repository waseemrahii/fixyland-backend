import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Staff from "../models/Staff.js";

dotenv.config();
connectDB();

const staffData = [
  { name: "John Doe", role: "Manager", experience: 10, image: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" },
  { name: "Jane Smith", role: "Receptionist", experience: 5, image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" },
];

const importData = async () => {
  try {
    await Staff.deleteMany();
    await Staff.insertMany(staffData);
    console.log("✅ Staff Seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
