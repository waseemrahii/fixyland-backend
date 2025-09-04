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

// ✅ Allowed origins for frontend
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174"
];

// ✅ CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman or server requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: Origin ${origin} not allowed`), false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware
app.use(express.json());
app.use(morgan("dev"));

// ✅ Root route (GET /)
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Fixyland Backend API is live ✅",
    version: "v0"
  });
});

// ✅ API versioning
const API_VERSION = "/api/v0";
app.use(`${API_VERSION}/staff`, staffRoutes);
app.use(`${API_VERSION}/hotels`, hotelRoutes);
app.use(`${API_VERSION}/appointments`, appointmentRoutes);

// ✅ Error handling middleware
app.use(errorHandler);

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

