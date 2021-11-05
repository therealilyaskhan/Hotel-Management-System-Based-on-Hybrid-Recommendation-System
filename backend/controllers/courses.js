import Course from '../models/Course.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

//get all courses
export const getCourses = expressAsyncHandler(async (req, res, next) => {
  const courses = await Course.find();

  if (!courses)
    throw new ErrorResponse(`No courses found`, 404);

  //if courses are found then fill the res object
  res
    .status(200)
    .json({
      success: true,
      count: courses.length,
      data: courses
    });

});

//get one course
export const getCourse = expressAsyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course)
    throw new ErrorResponse(`Course not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: course });
});

// update single course data
export const updateCourse = expressAsyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!course)
    throw new ErrorResponse(`Course not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: course });
});

//delete single course by id
export const deleteCourse = expressAsyncHandler(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);

  if (!course)
    throw new ErrorResponse(`Course not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: {} });
});

//create new course 
export const createCourse = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { title, category } = req.body;

  if (!(title && category))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  // Create Course
  const course = await Course.create({
    title,
    category
  });

  // //create token:
  // const token = course.getSignedJwtToken();

  res.status(200).json({ success: true, _id: course });

});