//our feedbacks api which is going to deal with feedbacks in the database
import express from 'express';
import { deleteTeach, getTeach, getTeaches, updateTeach, createTeach } from '../controllers/teaches.js';

const router = express.Router();

//all these below are different endpoints of the feedbacks api
router.route('/').get(getTeaches).post(createTeach);

router.route('/:id').get(getTeach).put(updateTeach).delete(deleteTeach);

export default router;