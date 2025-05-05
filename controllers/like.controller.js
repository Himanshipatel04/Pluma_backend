import { Like } from "../models/like.model";

export const createLike = async (req, res) => {
  // const { blogId } = req.params;
  const { userId, blogId } = req.body; // Assuming userId is sent in the request body

  try {
    const existingLike = await Like.findOne({ blog: blogId, user: userId });
    if (existingLike) {
      // If the like already exists, delete it (unlike)
      await Like.findOneAndDelete({ blog: blogId, user: userId });
      return res.status(400).json({ message: "Unliked!" });
    }
    // Create a new like
    const like = await Like.create({ blog: blogId, user: userId });
    res.status(201).json({ message: "Liked!", like });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getLikes = async (req, res) => {
  const { blogId } = req.params;

  try {
    const likes = await Like.find({ blog: blogId }).populate("user", "name email"); // Populate user details     
    // Count the number of likes for the blog post              
    const likeCount = await Like.countDocuments({ blog: blogId });          
    res.status(200).json({likesCount: likeCount || 0 ,likedUsers: likes});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteLike = async (req, res) => {
  const { blogId, userId } = req.params;

  try {
    const like = await Like.findOneAndDelete({ blog: blogId, user: userId });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }
    res.status(200).json({ message: "Unliked!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllLikes = async (req, res) => {
  try {
    const likes = await Like.find().populate("user", "name");
    res.status(200).json({ likes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
