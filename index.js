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

// ✅ CORS configuration
const allowedOrigins = [
    "https://fixyland-main.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS policy: This origin (${origin}) is not allowed.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));

// ✅ Health check route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Fixyland Backend API is live ✅",
    version: "v0"
  });
});

// ✅ API versioning
const API_VERSION = "/api/v0";

// Routes
app.use(`${API_VERSION}/staff`, staffRoutes);
app.use(`${API_VERSION}/hotels`, hotelRoutes);
app.use(`${API_VERSION}/appointments`, appointmentRoutes);

// Error Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
