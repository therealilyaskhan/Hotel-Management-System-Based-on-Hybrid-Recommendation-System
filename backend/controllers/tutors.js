import path from 'path';
import Tutor from '../models/Tutor.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

export const getTutors = expressAsyncHandler(async (req, res, next) => {
  let query;
  let queryString = JSON.stringify(req.query);
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    match => `$${match}`
  );

  query = Tutor.find(JSON.parse(queryString));

  const tutors = await query;

  if (!tutors)
    throw new ErrorResponse(`No Tutors found.`, 404);

  res.status(200).json({ success: true, count: tutors.length, data: tutors });
});

export const getTutor = expressAsyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findById(req.params.id);

  if (!tutor)
    throw new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: tutor });
});

export const updateTutor = expressAsyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!tutor)
    throw new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: tutor });
});

export const deleteTutor = expressAsyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findByIdAndDelete(req.params.id);

  if (!tutor)
    throw new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: {} });
});

//get nearby tutors within a sphere of defined radius:
//GET /api/tutors/radius/:longitude/:latitude/:distance (In Km)
export const getNearbyTutor = expressAsyncHandler(async (req, res, next) => {
  const { longitude, latitude, distance } = req.params;

  //calculate radius of the circle using the radian formula as an input to that formula "the distance in miles from the user". That way we could define how big or small the user defines the circle he/she wanna search tutors in;

  //divide distance by radius of earth
  //earth radius: 6,378 km

  const radius = distance / 6378;

  const tutors = await Tutor.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius]
      }
    }
  });

  if (!tutors)
    throw new ErrorResponse(`No nearby tutors found.`, 404);

  res.status(200).json({
    success: true,
    count: tutors.length,
    data: tutors
  });
});

export const tutorImageUpload = expressAsyncHandler(async (req, res, next) => {
  const tutor = await Tutor.findById(req.params.id);

  if (!tutor)
    throw new ErrorResponse(`Tutor not found with id of ${req.params.id}`, 404);

  if (!req.files)
    throw new ErrorResponse('Please attach your photo.', 400);

  const file = req.files.image;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith('image'))
    throw new ErrorResponse('Please attach file of type image.', 400);

  // Check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD)
    throw new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400);

  // Create custom filename
  file.name = `photo_${tutor._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      throw new ErrorResponse('Could not upload the image.', 500);
    }

    await Tutor.findByIdAndUpdate(req.params.id, { image: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });

  });

});

//tutor signup endpoint function
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

//signin endpoint function tutor
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