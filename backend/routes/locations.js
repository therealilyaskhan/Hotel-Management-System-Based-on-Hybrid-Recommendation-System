//our locations api which is going to deal with locations in the database
import express from 'express';
import { getTutors, getLocation, createLocation, getTutorsWithinRadius } from '../controllers/locations.js';

const router = express.Router();

//all these below are different endpoints of the locations api
router.route('/').post(createLocation);

//endpoint for getting location of a single tutor via id
router.route('/:id').get(getLocation);

//following endpoint is used to get all tutors from a specific location
router.route('/:latitude/:longitude').get(getTutors);

//get specific list of tutor in a specific location circle radius:
router.route('/radius').post(getTutorsWithinRadius);

export default router;