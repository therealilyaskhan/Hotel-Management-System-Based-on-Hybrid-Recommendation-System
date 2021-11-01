//our feedbacks api which is going to deal with feedbacks in the database
import express from 'express';
import { deleteFeedback, getFeedback, getFeedbacks, updateFeedback, createFeedback } from '../controllers/feedbacks.js';

const router = express.Router();

//all these below are different endpoints of the feedbacks api
router.route('/').get(getFeedbacks).post(createFeedback);

router.route('/:id').get(getFeedback).put(updateFeedback).delete(deleteFeedback);

export default router;