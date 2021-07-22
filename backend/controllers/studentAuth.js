import Student from '../models/Student.js';
import expressAsyncHandler from 'express-async-handler';
import ErrorResponse from '../utils/ErrorResponse.js';

//student signup endpoint
export const signup = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { firstName, lastName, email, address, password, zipcode } = req.body;

  if (!(firstName && lastName && email && address && password && zipcode))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Student
  const student = await Student.create({
    firstName,
    lastName,
    email,
    address,
    password,
    zipcode
  });

  //create token:
  const token = student.getSignedJwtToken();

  res.status(200).json({ success: true, token, firstName: student.firstName, _id: student._id });

});

//signin endpoint
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