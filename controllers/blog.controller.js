// controllers/blogController.js
import Blog from "../models/blog.model.js"; // Import the Blog model
import User from "../models/user.model.js"; // Import the User model
import { checkAbusiveContent } from "../utils/checkAbusiveContent.js";
// import { checkAbusiveContent } from "../utils/checkAbusiveContent.js";
import { checkSimilarity } from "../utils/checkSimilarity.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  const { title, content, author, tags, category } = req.body;

  try {
    // Validate if author exists
    const user = await User.findById(author);
    if (!user) {
      return res.status(404).json({ message: "Author not found" });
    }

    const similarity = await checkSimilarity(content);

    if (similarity) {
      return res.status(400).json({
        message:
          "Sorry, we can't publish this blog as its content is highly similar to an existing post. At Pluma, we ensure originality and take strong measures to prevent plagiarism. Please consider revising your content before submitting.",
      });
    }

    const abusiveContent = await checkAbusiveContent(content);

    if (abusiveContent) {
      return res.status(400).json({
        message:
          "Sorry, we can't publish this blog as it contains abusive or inappropriate content. At Pluma, we prioritize a safe and respectful environment for all users. Please revise your content before submitting.",
      });
    }

    // Create the blog post
    const blog = new Blog({
      title,
      content,
      author: user._id,
      tags,
      category,
    });

    // Save the blog post to the database
    await blog.save();
    res.status(201).json({ message: "Blog created successfully!", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all blog posts
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email"); // Populate the author field with name and email
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single blog post by ID
export const getBlogById = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a blog post
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content, tags, category } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags || blog.tags;
    blog.category = category || blog.category;

    await blog.save();
    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a blog post
export const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.deleteOne(); // instead of blog.remove()
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogByUser = async (req, res) => {
  const { id } = req.params;

  try {
    const blogs = await Blog.find({ author: id }).populate(
      "author",
      "name email"
    );
    if (!blogs) {
      return res.status(404).json({ message: "No blogs found for this user" });
    }
    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
