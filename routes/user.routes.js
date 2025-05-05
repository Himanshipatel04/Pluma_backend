// routes/userRoutes.js
import express from "express";
import * as userController from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/profile", userController.getUserProfile); // Protect this route with authentication middleware
router.get("/", userController.getAllUsers); // Get all users
router.get("/:id", userController.getUserById); // Get user by ID
router.put("/:id", userController.updateUser); // Update user by ID (protected route)
router.delete("/:id", userController.deleteUser); // Delete user by ID (protected route)

export default router;
