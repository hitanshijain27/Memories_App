import express from 'express';
import {  getPosts, getPost, createPost, updatePost, deletePost} from '../controllers/posts.js';
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:Id', getPost);
router.patch('/:Id', updatePost);
router.delete('/:Id', deletePost);

export default router;