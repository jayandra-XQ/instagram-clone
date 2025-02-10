import express from 'express';
import { commentPost, createPost, getPosts, likePost } from '../controllers/postController.js';
import { upload } from '../middlewares/multerConfig.js';


const router = express.Router();



router.post("/", upload.single("image"), createPost)
router.get("/", getPosts)
router.post("/:id/like", likePost)
router.post("/:id/comment", commentPost)


export default router;

