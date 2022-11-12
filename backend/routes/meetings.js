//our meetings api which is going to deal with meetings in the database
import express from 'express';
import { getFilledSlots, getMeetingByID, getMeetings, updateMeeting, createMeeting } from '../controllers/meetings.js';

const router = express.Router();

//all these below are different endpoints of the meetings api

//create new meeting
router.route('/').post(createMeeting);

//get all meetings for a user (hotel or customer) using their ID pass via query parameters
router.route('/').get(getMeetings);

//get a single meeting between a hotel and a customer via their ids
// router.route('/:hotelID/:customerID').get(getMeeting);

//get list of the filled meeting slots for a hotel via ID
router.route('/slots/:userID').get(getFilledSlots);

//get or update a meeting using meetingID
router.route('/:id').get(getMeetingByID).put(updateMeeting);

export default router;