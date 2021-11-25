import Location from '../models/Location.js';
import Tutor from '../models/Tutor.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

//get specific list of tutor in a specific location circle radius:
export const getTutorsWithinRadius = expressAsyncHandler(async (req, res, next) => {
  const { tutorIDs, latitude, longitude, distance } = req.body;

  //radius of earth in meters 6371000 m and 6,371 km
  //we will divide the passed distance in meters by the total radius of earth in meters

  //calculation radius in meters for the circle inside which the user wants tutors
  const radius = distance / 6371000;

  const tutors = await Location.find({
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius]
      }
    },
    tutorID: { "$in": tutorIDs }
  },
    { _id: 0, __v: 0, updatedAt: 0, createdAt: 0, location: 0 }
  );

  const filteredTutorIDs = tutors.map((tutor) => tutor.tutorID);

  if (!filteredTutorIDs.length)
    res.status(200)
      .json({
        success: false,
        data: []
      });
  else
    res
      .status(200)
      .json({
        success: true,
        data: filteredTutorIDs
      });

});

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

  const city = location.location.city;
  const country = location.location.country;

  //updating tutor's city and country via his id:
  await Tutor.findByIdAndUpdate(tutorID, { city, country }, {
    new: true,
    runValidators: true
  });

  res.status(200).json({ success: true, data: location.location });

});