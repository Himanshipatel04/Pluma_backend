// models/Blog.js
import mongoose from "mongoose";

// Define the Blog Schema
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User who wrote the blog
      required: true,
    },
    tags: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
    },
    originalBlog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      default: null,
    },
    repostedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // Other optional fields can be added, like categories, comments, etc.
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

// Create the Blog model from the schema
const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
