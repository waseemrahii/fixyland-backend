import express from "express";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointmentController.js";

const router = express.Router();

// CRUD Routes
router.post("/", createAppointment);          // Create
router.get("/", getAppointments);            // Get all
router.get("/:id", getAppointmentById);      // Get by ID
router.put("/:id", updateAppointment);       // Update
router.delete("/:id", deleteAppointment);    // Delete

export default router;
