import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";

import staffRoutes from "./routes/staffRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

import errorHandler from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const API_VERSION = "/api/v0";

app.use(`${API_VERSION}/staff`, staffRoutes);
app.use(`${API_VERSION}/hotels`, hotelRoutes);
app.use(`${API_VERSION}/appointments`, appointmentRoutes);
// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
