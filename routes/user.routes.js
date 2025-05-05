// routes/userRoutes.js
import express from "express";
import * as userController from "../controllers/user.controller.js";
import rateLimit from "express-rate-limit";

// Limit to 3 login attempts per 15 minutes
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3, // limit each IP to 3 login attempts per windowMs
    message: {
      message: "Too many login attempts. Please try again after 15 minutes.",
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
  

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", loginLimiter, userController.loginUser);
router.get("/profile", userController.getUserProfile); // Protect this route with authentication middleware
router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUserById); // Get user by ID
router.put("/:id", userController.updateUser); // Update user by ID (protected route)
router.delete("/:id", userController.deleteUser); // Delete user by ID (protected route)

export default router;
