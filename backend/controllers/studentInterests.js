import StudentInterest from '../models/StudentInterest.js';
import expressAsyncHandler from 'express-async-handler'; // read about express-async-handler in NodeJS Fundamentals notes;
import ErrorResponse from '../utils/ErrorResponse.js';

//get all interests of a student
export const getStudentInterests = expressAsyncHandler(async (req, res, next) => {
  //retrieve the interests of user from db and respond with it
  const { studentID } = req.params;
  const { interests } = await StudentInterest.findOne(
    {
      studentID
    },
    { __v: 0, studentID: 0, _id: 0 }
  );

  if (!interests)
    throw new ErrorResponse(`No interests found`, 404);

  //if studentInterests are found then fill the res object
  res
    .status(200)
    .json(interests);

});

//create new student interest 
export const createOrUpdateInterest = expressAsyncHandler(async (req, res, next) => {
  console.log('blah');
  //pulling props out of req.body for validation reasons
  const { interest, studentID } = req.body;

  if (!(interest && studentID))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  //retrieve current interests using student id:
  const record = await StudentInterest.findOne(
    {
      studentID
    },
    { __v: 0, studentID: 0, _id: 0 }
  );

  const existingInterests = record ? record.interests : [];

  // Create new Interest
  await StudentInterest.updateOne(
    {
      studentID
    },
    {
      studentID,
      interests: [...existingInterests, interest]
    },
    { upsert: true }
  );

  //now retrieve the interests of user from db and respond with it
  const { interests } = await StudentInterest.findOne(
    {
      studentID
    },
    { __v: 0, studentID: 0, _id: 0 }
  );

  res.status(200).json(interests);

});

//delete a particular interest from all the interests of a student using studentID
/**

 Function to find the probability

 function kPresentProbability(a,n,k)
{
    let count = 0;

    for (let i = 0; i < n; i++)
        if (a[i] == k)
            count+=1;
    // find probability
    return count / n;
}

 */
export const deleteStudentInterest = expressAsyncHandler(async (req, res, next) => {
  //pulling props out of req.body for validation reasons
  const { interest, studentID } = req.body;

  if (!(interest && studentID))
    throw new ErrorResponse('One of the required fields is missing. Make sure all fields are filled correctly.', 400);

  //retrieve current interests using student id:
  const record = await StudentInterest.findOne(
    {
      studentID
    },
    { __v: 0, studentID: 0, _id: 0 }
  );

  const existingInterests = record ? record.interests : [];

  const index = existingInterests.indexOf(interest);
  if (index !== -1)
    existingInterests.splice(index, 1);

  // Create new Interest
  await StudentInterest.updateOne(
    {
      studentID
    },
    {
      studentID,
      interests: existingInterests
    }
  );

  //now retrieve the interests of user from db and respond with it
  const { interests } = await StudentInterest.findOne(
    {
      studentID
    },
    { __v: 0, studentID: 0, _id: 0 }
  );

  res.status(200).json(interests);

});