import Teach from '../models/Teach.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

//get all teaches for a specific course
export const getHotels = expressAsyncHandler(async (req, res, next) => {
  const course = req.query.course.trim();

  const hotels = await Teach.find(
    {
      course: {
        $regex: new RegExp('^' + course + '.*', 'i')
      }
    },
    { _id: 0, __v: 0, course: 0, createdAt: 0, updatedAt: 0 }
  ).exec();

  if (!hotels.length)
    res.status(200).json([]);
  else
    res.status(200).json(hotels);

});

//get one teach
export const getTeach = expressAsyncHandler(async (req, res, next) => {
  const teach = await Teach.findById(req.params.id);

  if (!teach)
    throw new ErrorResponse(`Teach not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: teach });
});

// update single teach data
export const updateTeach = expressAsyncHandler(async (req, res, next) => {
  const teach = await Teach.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!teach)
    throw new ErrorResponse(`Teach not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: teach });
});

//delete single teach by id
export const deleteTeach = expressAsyncHandler(async (req, res, next) => {
  const teach = await Teach.findByIdAndDelete(req.params.id);

  if (!teach)
    throw new ErrorResponse(`Teach not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: {} });
});

//create new teach 
export const createTeach = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { hotelID, course } = req.body;

  if (!(hotelID && course))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Teach
  const teach = await Teach.create({
    hotelID,
    course
  });

  // //create token:
  // const token = teach.getSignedJwtToken();

  res.status(200).json({ success: true, data: teach });

});