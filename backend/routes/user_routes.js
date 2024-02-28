import express from 'express';
import { getAllUsers, signupUser, loginUser } from '../controllers/user_controller.js';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/signup', signupUser);
router.post('/login', loginUser);
export default router;
