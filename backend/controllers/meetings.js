import Meeting from '../models/Meeting.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

export const getMeetings = expressAsyncHandler(async (req, res, next) => {
  const meetings = await Meeting.find();

  if (!meetings)
    throw new ErrorResponse(`No meetings found`, 404);

  //if meetings are found then fill the res object
  res
    .status(200)
    .json({
      success: true,
      count: meetings.length,
      data: meetings
    });

});

export const getMeeting = expressAsyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findById(req.params.id);

  if (!meeting)
    throw new ErrorResponse(`Meeting not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: meeting });
});

export const updateMeeting = expressAsyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!meeting)
    throw new ErrorResponse(`Meeting not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: meeting });
});

export const deleteMeeting = expressAsyncHandler(async (req, res, next) => {
  const meeting = await Meeting.findByIdAndDelete(req.params.id);

  if (!meeting)
    throw new ErrorResponse(`Meeting not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: {} });
});

//create new meeting 
export const createMeeting = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { venue, status, tutorID, studentID, date, course, feedbackID, slot } = req.body;

  if (!(venue && status && tutorID && studentID && date && course && slot))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Meeting
  const meeting = await Meeting.create({
    venue,
    status,
    tutorID,
    studentID,
    date,
    course,
    feedbackID,
    slot
  });

  // //create token:
  // const token = meeting.getSignedJwtToken();

  res.status(200).json({ success: true, data: meeting });

});