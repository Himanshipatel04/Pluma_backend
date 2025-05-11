// routes/blogRoutes.js
import express from 'express';
import { createBlog, getAllBlogs,getBlogByUser, updateBlog, deleteBlog, getBlogById, repostBlog } from '../controllers/blog.controller.js'; 

const router = express.Router();

router.post('/create', createBlog); // Protect the create blog route
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.get('/user/:id', getBlogByUser);
router.put('/:id', updateBlog); // Protect the update blog route
router.delete('/:id', deleteBlog); // Protect the delete blog route
router.post("/:id/:userId/repost", repostBlog);

export default router;
