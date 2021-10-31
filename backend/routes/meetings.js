//our meetings api which is going to deal with meetings in the database
import express from 'express';
import { deleteMeeting, getMeeting, getMeetings, updateMeeting, createMeeting } from '../controllers/meetings.js';

const router = express.Router();

//all these below are different endpoints of the meetings api
router.route('/').get(getMeetings).post(createMeeting);

router.route('/:id').get(getMeeting).put(updateMeeting).delete(deleteMeeting);

export default router;