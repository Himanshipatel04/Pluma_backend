// Importing required modules
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection";

// Initialize dotenv to access environment variables
dotenv.config();

// Initialize the Express app
const app = express();

// Middlewares
app.use(express.json()); // For parsing JSON requests
app.use(
  cors({
    origin: "*", // Allow all origins (you can restrict this to specific domains)
  })
); // Enable CORS for cross-origin requests
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data
app.use((req, res, next) => {
  console.log(`${req.method} Request made to:  ${req.url}`);
  // You can add more custom logic here
  next(); // Always call next() to pass control to the next middleware or route handler
});

// MongoDB connection
connectDB();

// Example route
app.get("/", (req, res) => {
  res.send("Hello from PLUMA backend!");
});

// Add API routes (example)
import userRoutes from "./routes/user.routes.js"; // Sample route for users
import blogRoutes from "./routes/blogs.routes.js"; // Sample route for users
// import { automateDeepSeekCheck } from "./utils/checkAbusiveContent.js";
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
