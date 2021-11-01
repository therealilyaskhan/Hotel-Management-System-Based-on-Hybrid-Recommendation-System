//our tutors api which is going to deal with Tutors in the database
import express from 'express';
import { deleteTutor, getNearbyTutor, getTutor, getTutors, tutorImageUpload, updateTutor, signup, signin } from '../controllers/tutors.js';

const router = express.Router();

//nearby tutors endpoint:
router.route('/radius/:longitude/:latitude/:distance').get(getNearbyTutor);

router.route('/:id/image').put(tutorImageUpload);

//all these below are different endpoints of the tutors api
router.route('/').get(getTutors);

//tutors signin and signup endpoint:
router.post('/signup', signup);
router.post('/signin', signin);

router.route('/:id').get(getTutor).put(updateTutor).delete(deleteTutor);

export default router;