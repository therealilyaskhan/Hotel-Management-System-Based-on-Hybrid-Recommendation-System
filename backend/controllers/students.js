import Student from '../models/Student.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

export const getStudents = expressAsyncHandler(async (req, res, next) => {
  const students = await Student.find();

  if (!students)
    throw new ErrorResponse(`No students found`, 404);

  //if students are found then fill the res object
  res
    .status(200)
    .json({
      success: true,
      count: students.length,
      data: students
    });

});

export const getStudent = expressAsyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student)
    throw new ErrorResponse(`Student not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: student });
});

export const updateStudent = expressAsyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!student)
    throw new ErrorResponse(`Student not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: student });
});

export const deleteStudent = expressAsyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student)
    throw new ErrorResponse(`Student not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: {} });
});

//student signup function
export const signup = expressAsyncHandler(async (req, res, next) => {
  console.log('blahhhh');
  //pulling props out of req.body for validation reasons
  const { firstName, lastName, email, password } = req.body;

  if (!(firstName && lastName && email && password))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Student
  const student = await Student.create({
    firstName,
    lastName,
    email,
    password
  });

  //create token:
  const token = student.getSignedJwtToken();

  res.status(200).json({ success: true, token, firstName: student.firstName, _id: student._id });

});

//student signin endpoint function
export const signin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter email and password' });
  }

  // Check for student and also make the query to return the pass which when querying a document normally wouldn't be returned as we have for the password field the "select" property = false in the Student Model
  const student = await Student.findOne({ email }).select('+password');

  if (!student) {
    return res.status(401).json({ success: false, message: 'Student does not exist' });
  }

  // Check if password matches
  const isMatch = await student.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid Credentials' });
  }

  //generate token for signed user:
  const token = student.getSignedJwtToken();

  res.status(200).json({ success: true, token, firstName: student.firstName, _id: student._id });

});