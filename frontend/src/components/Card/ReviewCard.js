import React from 'react';
import Rating from '@material-ui/lab/Rating';
import moment from 'moment';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Typography } from '@material-ui/core';

function ReviewCard({ feedback }) {
  const { studentID } = feedback;
  const [studentInfo, setStudentInfo] = useState(false);

  useEffect(() => {
    if (studentID) {
      const getStudentInfo = async () => {
        try {
          const res = await axios.get("students/" + studentID);
          if (res.data.success)
            setStudentInfo(res.data.data);
        } catch (err) {
          console.log(err);
        }
      };
      getStudentInfo();
    }
  }, [studentID]);

  console.log(feedback);

  return (
    studentInfo ?
      <div class="media media-review">
        <div class="media-user"><img src={"http://localhost:5000/" + studentInfo?.imageURL} alt="" /></div>
        <div class="media-body">
          <div class="M-flex">
            <h2 class="title"><Typography className="font-weight-bold text-left"> {studentInfo.firstName} {studentInfo.lastName} </Typography>  {moment(feedback.createdAt).format("MMMM Do YYYY, h:mm:ss A")}</h2>
            <div class="rating-row">
              <ul>
                <Rating name="read-only" precision={0.5} value={feedback.rating} readOnly />
              </ul>
            </div>
          </div>
          <div class="description">{feedback.review}</div>
        </div>
      </div> :
      null


  );
}

export default ReviewCard;
