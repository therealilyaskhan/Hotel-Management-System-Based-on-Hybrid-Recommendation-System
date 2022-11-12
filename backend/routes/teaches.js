//our feedbacks api which is going to deal with feedbacks in the database
import express from 'express';
import { deleteTeach, getTeach, getHotels, updateTeach, createTeach } from '../controllers/teaches.js';

const router = express.Router();

//all these below are different endpoints of the feedbacks api
//all hotels teaching a particular course:
router.route('/').get(getHotels).post(createTeach);


router.route('/:id').get(getTeach).put(updateTeach).delete(deleteTeach);

export default router;