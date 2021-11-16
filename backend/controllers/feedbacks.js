import Feedback from '../models/Feedback.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

//get all feedbacks
export const getFeedbacks = expressAsyncHandler(async (req, res, next) => {
  const feedbacks = await Feedback.find();

  if (!feedbacks)
    throw new ErrorResponse(`No feedbacks found`, 404);

  //if feedbacks are found then fill the res object
  res
    .status(200)
    .json({
      success: true,
      count: feedbacks.length,
      data: feedbacks
    });

});

//get one feedback
export const getFeedback = expressAsyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback)
    throw new ErrorResponse(`Feedback not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: feedback });
});

// update single feedback data
export const updateFeedback = expressAsyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!feedback)
    throw new ErrorResponse(`Feedback not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: feedback });
});

//delete single feedback by id
export const deleteFeedback = expressAsyncHandler(async (req, res, next) => {
  const feedback = await Feedback.findByIdAndDelete(req.params.id);

  if (!feedback)
    throw new ErrorResponse(`Feedback not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: {} });
});

//create new feedback 
export const createFeedback = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { tutorID, studentID, meetingID, rating, review } = req.body;

  if (!(tutorID && studentID && meetingID && rating && review))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Feedback
  const feedback = await Feedback.create({
    tutorID,
    studentID,
    meetingID,
    rating,
    review
  });

  // //create token:
  // const token = feedback.getSignedJwtToken();

  res.status(200).json({ success: true, data: feedback });

});