import Tutor from '../models/Tutor.js';
import expressAsyncHandler from 'express-async-handler';

//tutor signup endpoint
export const signup = expressAsyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, address, password, zipcode } = req.body;

  // Create Tutor
  const tutor = await Tutor.create({
    firstName,
    lastName,
    email,
    address,
    password,
    zipcode
  });

  //create token:
  const token = tutor.getSignedJwtToken();

  res.status(200).json({ success: true, token, firstName: tutor.firstName, _id: tutor._id });

});

//signin endpoint
export const signin = expressAsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate emil & password
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Please enter email and password' });
  }

  // Check for tutor and also make the query to return the pass which when querying a document normally wouldn't be returned as we have for the password field the "select" property = false in the Tutor Model
  const tutor = await Tutor.findOne({ email }).select('+password');

  if (!tutor) {
    return res.status(401).json({ success: false, message: 'Tutor does not exist' });
  }

  // Check if password matches
  const isMatch = await tutor.matchPassword(password);

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid Credentials' });
  }

  //generate token for signed user:
  const token = tutor.getSignedJwtToken();

  res.status(200).json({ success: true, token, firstName: tutor.firstName, _id: tutor._id });

});