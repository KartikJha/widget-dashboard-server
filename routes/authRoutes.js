import express from 'express';
import { registerUser, loginUser } from '../services/authService.js';

const router = express.Router();

router.post('/user', registerUser); // Register endpoint
router.post('/token', loginUser);       // Login endpoint

export default router;
