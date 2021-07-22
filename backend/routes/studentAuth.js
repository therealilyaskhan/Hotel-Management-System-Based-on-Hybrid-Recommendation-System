import express from 'express';
import { signup, signin } from '../controllers/studentAuth.js';

const router = express.Router();
//nearby tutors endpoint:
router.post('/signup', signup);
router.post('/signin', signin);

export default router;