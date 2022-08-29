import express from "express";
import { getPosts,createPost,getSinglePost,deletePost,updatePost} from "../controllers/posts.js"

const router = express.Router();

//http://localhost:5000/posts
// GET POST DELETE UPDATE PATCH


router.get('/', getPosts)
router.get('/:id', getSinglePost)
router.post('/',createPost)
router.delete('/:id', deletePost)
router.patch('/:id',updatePost)
export default router;
