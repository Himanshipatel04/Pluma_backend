// Importing required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit"; // ✅ Rate limiter added
import connectDB from "./config/dbConnection";

// Initialize dotenv to access environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: "*", // Allow all origins (you can restrict this to specific domains)
  })
); // Enable CORS for cross-origin requests // For parsing URL-encoded data
app.use((req, res, next) => {
  console.log(`${req.method} Request made to:  ${req.url}`);
  // You can add more custom logic here
  next(); // Always call next() to pass control to the next middleware or route handler
});


// Trust proxy if behind something like Vercel, Heroku, or Render
app.set("trust proxy", 1);

// ✅ Global Rate Limiter Middleware (100 reqs per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Limit each IP to 100 requests
  message: "Too many requests from this IP. Please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter); // Apply to all routes

// MongoDB connection
connectDB();

// Example route
app.get("/", (req, res) => {
  res.send("Hello from PLUMA backend!");
});

// Add API routes (example)
import userRoutes from "./routes/user.routes.js"; // Sample route for users
import blogRoutes from "./routes/blogs.routes.js"; // Sample route for users
import likeRoutes from "./routes/like.routes.js"; // Sample route for likes                
// import { automateDeepSeekCheck } from "./utils/checkAbusiveContent.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/likes", likeRoutes); // Sample route for 



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
