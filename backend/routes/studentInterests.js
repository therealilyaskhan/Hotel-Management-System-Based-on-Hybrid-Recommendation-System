//our feedbacks api which is going to deal with feedbacks in the database
import express from 'express';
import { deleteStudentInterest, createOrUpdateInterest, getStudentInterests } from '../controllers/studentInterests.js';

const router = express.Router();

//all these below are different endpoints of the feedbacks api
//get interests of a student using ID
router.route('/:studentID').get(getStudentInterests);

// Create or update an interest
router.route('/').post(createOrUpdateInterest);

router.route('/').delete(deleteStudentInterest);

//update a student interest
// router.route('/:studentID').put(updateStudentInterests).delete(deleteStudentInterests);

export default router;