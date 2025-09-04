import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    type: { type: String, enum: ["single", "double", "suite"], required: true },
    room: { type: String, required: true }, // Example: "101", "102"
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);
