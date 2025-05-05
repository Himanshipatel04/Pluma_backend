import mongoose from "mongoose";
import dotenv from "dotenv"; // Import dotenv to
// Load environment variables from a .env file
dotenv.config();

// Database connection function
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from the environment variables
    await mongoose.connect(process.env.MONGO_URI, {dbName: "pluma"});   
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure code if DB connection fails
  }
};

// Export the connection function to be used elsewhere in the app
export default connectDB;
