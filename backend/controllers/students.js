import Student from '../models/Student.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

export const getStudents = expressAsyncHandler(async (req, res, next) => {
  const students = await Student.find();

  if (!students)
    throw new ErrorResponse(`No students found`, 404);

  //if students are found then fill the res object
  res
    .status(200)
    .json({
      success: true,
      count: students.length,
      data: students
    });

});

export const getStudent = expressAsyncHandler(async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student)
    throw new ErrorResponse(`Student not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: student });
});

export const updateStudent = expressAsyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!student)
    throw new ErrorResponse(`Student not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: student });
});

export const deleteStudent = expressAsyncHandler(async (req, res, next) => {
  const student = await Student.findByIdAndDelete(req.params.id);

  if (!student)
    throw new ErrorResponse(`Student not found with id of ${req.params.id}`, 404);

  res.status(200).json({ success: true, data: {} });
});
