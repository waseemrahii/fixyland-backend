import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import connectDB from "./config/db.js" 

import staffRoutes from "./routes/staffRoutes.js"
import hotelRoutes from "./routes/hotelRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js"

import errorHandler from "./middleware/errorHandler.js"

dotenv.config()
connectDB()

const app = express()

// ✅ CORS configuration
const allowedOrigins = ["https://fixyland-main.vercel.app", "http://localhost:5173"]

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true)
      if (!allowedOrigins.includes(origin)) {
        return callback(new Error(`CORS policy: This origin (${origin}) is not allowed.`), false)
      }
      return callback(null, true)
    },
    credentials: true,
  }),
)

app.use(express.json())
app.use(morgan("dev"))

// ✅ Health check
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "Fixyland Backend API is live ✅",
    version: "v0",
  })
})

// ✅ Versioned API
const API_VERSION = "/api/v0"
app.use(`${API_VERSION}/staff`, staffRoutes)
app.use(`${API_VERSION}/hotels`, hotelRoutes)
app.use(`${API_VERSION}/appointments`, appointmentRoutes)

// Error Middleware
app.use(errorHandler)

export default app
