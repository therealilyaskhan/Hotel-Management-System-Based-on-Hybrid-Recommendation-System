//our students api which is going to deal with students in the database
import express from 'express';
import { deleteStudent, getStudent, getStudents, updateStudent } from '../controllers/students.js';

const router = express.Router();

//all these below are different endpoints of the students api
router.route('/').get(getStudents);

router.route('/:id').get(getStudent).put(updateStudent).delete(deleteStudent);

export default router;