import * as likeController from '../controllers/like.controller.js';           
import { Router } from 'express';

const router = Router(); // Create a new router instance                                            

router.post('/createLike', likeController.createLike); // Create a new like for a blog post    
router.get('/:blogId', likeController.getLikes); // Get all likes for a blog post                           
router.delete('/:blogId/:userId', likeController.deleteLike); // Delete a like by ID                    
router.get('/', likeController.getAllLikes); 

export default router; 