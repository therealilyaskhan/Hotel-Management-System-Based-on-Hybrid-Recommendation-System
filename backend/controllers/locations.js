import Location from '../models/Location.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

//get all tutors for a specific point
export const getTutors = expressAsyncHandler(async (req, res, next) => {
  const tutors = await Location.find({
    inboxID: req.params.inboxID,
  });

  if (!tutors)
    throw new ErrorResponse(`No tutors found`, 404);

  //if tutors are found then fill the res object
  res
    .status(200)
    .json({
      success: true,
      count: tutors.length,
      data: tutors
    });

});

//get location of a tutor via his id:
export const getLocation = expressAsyncHandler(async (req, res, next) => {
  const location = await Location.findOne({
    tutorID: req.params.id
  });

  if (!location)
    throw new ErrorResponse(`location not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: location.location });
});

//create new location 
export const createLocation = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { latitude, longitude, tutorID } = req.body;

  if (!(latitude && longitude && tutorID))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Location
  const location = await Location.create({ latitude, longitude, tutorID });

  res.status(200).json({ success: true, data: location.location });

});