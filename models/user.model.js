// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"], // Default roles could be 'admin' or 'user'
      default: "user",
    },
    bio: {
      type: String,
      default: "", // Optional field for user bio
    },

    // Add any other necessary fields like date of birth, bio, etc.
  },
  { timestamps: true } // This will automatically add createdAt and updatedAt fields
);

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare the provided password with the stored password hash
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model("User", userSchema);

export default User;
