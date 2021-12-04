import Meeting from '../models/Meeting.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

export const getMeetings = expressAsyncHandler(async (req, res, next) => {

  const userID = req.query.userID.trim();

  const meetings = await Meeting.find(
    {
      $or: [{ tutorID: userID }, { studentID: userID }]
    },
    { __v: 0 }
  );

  if (!meetings)
    res
      .status(200)
      .json([]);
  else
    res
      .status(200)
      .json(meetings);

});

export const getMeetingByID = expressAsyncHandler(async (req, res, next) => {
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

export const getFilledSlots = expressAsyncHandler(async (req, res, next) => {
  const { userID } = req.params;
  //find all meetings having either student or tutor ID:
  const meetings = await Meeting.find(
    {
      $or: [{ tutorID: userID }, { studentID: userID }]
    },
    {
      _id: 0,
      course: 0,
      studentID: 0,
      tutorID: 0,
      feedbackID: 0,
      status: 0,
      venue: 0,
      createdAt: 0,
      updatedAt: 0,
      __v: 0
    }
  );

  if (!meetings.length)
    res.status(200).json([]);
  else
    res.status(200).json(meetings);
});

//create new meeting 
export const createMeeting = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { latitude, longitude, tutorID, studentID, startDate, endDate } = req.body;

  if (!(latitude && longitude && tutorID && studentID && startDate && endDate))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Meeting
  const meeting = await Meeting.create({
    latitude,
    longitude,
    tutorID,
    studentID,
    startDate,
    endDate
  });

  res.status(200).json({ success: true, data: meeting });

});