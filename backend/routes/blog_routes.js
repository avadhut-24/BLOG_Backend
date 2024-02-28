import express from 'express';
import { getAllBlogs, addBlogs, updateBlog, getById, deleteById } from '../controllers/blog_controller.js';

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/add', addBlogs);
router.put('/update/:id', updateBlog);
router.get('/:id', getById);
router.delete('/:id', deleteById);
export default router;
