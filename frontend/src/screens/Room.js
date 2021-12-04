import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, CircularProgress, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import ReactTimerStopwatch from '../components/stopwatch/ReactTimerStopwatch';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useEffect, useRef } from 'react';
import axios from 'axios';

import { io } from "socket.io-client";
import Rating from '@material-ui/lab/Rating';

const fromTime = new Date(0, 0, 0, 0, 0, 0, 0);

function Room() {
  const { category, _id } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;
  const currentIsTutor = category === 'tutors';
  const history = useHistory();
  const location = useLocation();
  const [studentStarted, setStudentStarted] = useState(false);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [paymentApproved, setPaymentApproved] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [paid, setPaid] = useState(false);
  const [isOn, setIsOn] = useState(false);
  const [meetingDuration, setMeetingDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const { tutorInfo, studentInfo, meetingInfo } = location.state;

  // real time notification on joining room starting meeting and making payment all
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", _id);
  }, [socket, _id]);

  const startMeeting = () => {
    setIsOn(true);
    const receiverID = currentIsTutor ? studentInfo._id : tutorInfo._id;
    socket.current.emit("sendNotification", {
      receiverID,
      type: 'start',
    });
  };

  const stopMeeting = () => {
    setIsOn(false);
  };

  const markAsPaid = () => {
    const receiverID = currentIsTutor ? studentInfo._id : tutorInfo._id;
    socket.current.emit("sendNotification", {
      receiverID,
      type: 'paid',
    });
    setPaid(true);
  };

  const submitReviewHandler = async () => {
    if (review && rating) {
      //we need following payload:
      /*
      rating,
      review,
      tutorID
      studentID
      meetingID
      */
      const payload = {
        rating,
        review: review.trim(),
        tutorID: tutorInfo._id,
        studentID: studentInfo._id,
        meetingID: meetingInfo._id
      };

      const res = await axios.post('feedbacks', payload);
      const feedbackCreated = res.data.success;
      if (feedbackCreated)
        history.push('/students/dashboard/dashboard');
      else
        console.log('feedback not created!');
    }
  };

  useEffect(() => {
    if (meetingDuration) {
      const receiverID = currentIsTutor ? studentInfo._id : tutorInfo._id;
      socket.current.emit("sendNotification", {
        receiverID,
        meetingDuration,
        type: 'stop',
      });
    }
  }, [meetingDuration]);

  useEffect(() => {
    socket.current.on("getNotification", (data) => {
      if (data.type === 'start') {
        setStudentStarted(true);
      }
      else if (data.type === 'stop') {
        setMeetingDuration(data.meetingDuration);
        setOpenPaymentModal(true);
      }
      else if (data.type === 'paid') {
        setPaid(true);
      }
      else if (data.type === 'approved') {
        setPaymentApproved(true);
      }

    });
  }, [socket]);

  useEffect(() => {
    if (meetingDuration)
      setOpenPaymentModal(true);
  }, [meetingDuration, isOn]);

  const approvePayment = async () => {
    //create payment record in the database
    // we need following info in the payload
    /*
    meetingID,
    tutorID,
    studentID,
    meetingDuration,
    amount
    */
    if (meetingDuration) {
      //lets calculate amount first
      const amount = (meetingDuration / 3600 * tutorInfo.hourlyRate).toFixed(2);

      const reqBody = {
        tutorID: tutorInfo._id,
        studentID: studentInfo._id,
        meetingID: meetingInfo._id,
        meetingDuration,
        amount
      };

      try {
        setLoading(true);
        //first mark the meeting as attended via it's id
        //updating meeting status to attended
        const meetingStatus = {
          status: "attended"
        };

        const meetingAttended = await axios.put(`meetings/${meetingInfo._id}`, meetingStatus);

        if (meetingAttended.data.success) {
          const res = await axios.post('transactions', reqBody);
          const transactionCreated = res.data.success;
          if (transactionCreated) {
            setLoading(false);
            setPaymentApproved(true);
            const receiverID = currentIsTutor ? studentInfo._id : tutorInfo._id;
            socket.current.emit("sendNotification", {
              receiverID,
              type: 'approved',
            });
            history.push('/tutors/dashboard/dashboard');
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    }

  };

  return (
    <Box className="meeting-room d-flex justify-content-center align-items-center text-white">
      <Box className="room__details">
        <Typography className="mb-4" variant='h3' align='center' sx={{ py: 4 }}>
          <span className="text-capitalize text-info font-weight-bold">Participants</span>
        </Typography>
        <Box className="d-flex justify-content-around align-items-center">
          <Box className="room__participant">
            <img src={"http://localhost:5000/" + tutorInfo.imageURL} className="img-radius w-100" alt="User-Profile-Image" />
            <Typography variant="subtitle1" className="mt-2 text-white font-weight-bold" align='center'>
              TUTOR
            </Typography>
            <Typography variant="subtitle1" className="text-white font-weight-bold" align='center'>
              {tutorInfo.firstName} {tutorInfo.lastName}
            </Typography>
          </Box>
          {
            !currentIsTutor
              ?
              <Box>
                <ReactTimerStopwatch
                  setMeetingDuration={setMeetingDuration}
                  isOn={isOn}
                  className="react-stopwatch-timer__table" watchType="stopwatch"
                  displayCircle={true} color="gray" hintColor="greenyellow" fromTime={fromTime} displayHours={true}>
                  <button className={`btn-block btn-${isOn ? "danger" : "info"} font-weight-bold btn mt-3`} onClick={() => {
                    if (!isOn)
                      startMeeting();
                    else if (isOn)
                      stopMeeting();
                  }}>{isOn ? "STOP" : "START"}</button>
                </ReactTimerStopwatch>
              </Box>
              :
              studentStarted ?
                <Box>
                  <ReactTimerStopwatch
                    isOn={true}
                    className="react-stopwatch-timer__table" watchType="stopwatch"
                    displayCircle={true} color="gray" hintColor="greenyellow" fromTime={fromTime} displayHours={true}>
                  </ReactTimerStopwatch>
                </Box> :
                <Box>
                  Student has not started the meeting yet.
                </Box>
          }
          <Box className="room__participant">
            <img src={"http://localhost:5000/" + studentInfo.imageURL} className="img-radius w-100" alt="User-Profile-Image" />
            <Typography variant="subtitle1" className="mt-2 text-white font-weight-bold" align='center'>
              STUDENT
            </Typography>
            <Typography variant="subtitle1" className="text-white font-weight-bold" align='center'>
              {studentInfo.firstName} {studentInfo.lastName}
            </Typography>
          </Box>
        </Box>
        <Typography className="mt-4 mb-2" variant='h3' align='center' sx={{ py: 4 }}>
          <span className="text-capitalize text-info font-weight-bold">Location</span>
        </Typography>
        <Typography variant="subtitle1" className="text-white font-weight-bold" align='center'>
          {meetingInfo.venue.formattedAddress}
        </Typography>
      </Box>
      {/* modal */}
      <Dialog disableEscapeKeyDown open={openPaymentModal} fullWidth >
        {
          paymentApproved ?
            <DialogTitle className="pb-0 my-2">
              <Typography className="p-2 payment__title text-info font-weight-bold text-capitalize" variant='h5' align='center'>
                Congratulations {studentInfo.firstName}!
              </Typography>
            </DialogTitle>
            :
            <DialogTitle className="pt-0 mt-0">
              <Typography className="p-2 pt-0 payment__title text-capitalize" variant='h5' align='center'>
                Great job {currentIsTutor ? tutorInfo.firstName : studentInfo.firstName}! {currentIsTutor ? "You are now about to get paid for the session." : "It's now time to pay your tutor."}
              </Typography>
            </DialogTitle>
        }
        {
          paymentApproved ?
            <DialogContent className="pb-0 mb-0">
              <Typography className="px-2 mx-2 payment__title text-capitalize" variant='h5' align='center'>
                Your payment has been approved by {tutorInfo.firstName}. Please share your overall experience with the tutor
              </Typography>
            </DialogContent>
            :
            <DialogContent>
              <Typography variant="subtitle1" className="text-text-center" align='center'>
                Your meeting lasted for <span className="text-info font-weight-bold">{new Date(meetingDuration * 1000).toISOString().substr(11, 8)}.</span> You {currentIsTutor ? "conducted" : "took"} the session for about <span className="text-info font-weight-bold">{(meetingDuration / 3600).toFixed(4)} hours!</span> and you will {currentIsTutor ? "get paid " : "pay your tutor "}<span className="text-info font-weight-bold">${(meetingDuration / 3600 * tutorInfo.hourlyRate).toFixed(2)}</span>
              </Typography>
            </DialogContent>
        }
        <DialogActions className={paymentApproved ? "d-block px-4 mt-1" : ""}>
          {
            currentIsTutor ?
              <button disabled={!paid} className="btn-block btn btn-info m-2 mx-4" onClick={approvePayment}>{loading ? <CircularProgress /> : paid ? "APPROVE PAYMENT" : "WAITING FOR PAYMENT"}</button>
              :
              paymentApproved ?
                <>
                  <Box textAlign="center" className="mb-2">
                    <Rating
                      value={rating}
                      onChange={(event, newValue) => {
                        setRating(newValue);
                      }}
                    />
                  </Box>
                  <Box>
                    <TextField fullWidth label="Write a short review to your tutor" variant="outlined" multiline minRows={2} value={review} onChange={(event) => {
                      setReview(event.target.value);
                    }} />
                  </Box>
                  <Box className="my-3">
                    <button onClick={submitReviewHandler} className="text-uppercase btn-block btn btn-info" >submit</button>
                  </Box>
                </>
                :
                <button disabled={paid} className="text-uppercase btn-block btn btn-info m-2 mx-4" onClick={markAsPaid}>{paid ? `WAITING FOR ${tutorInfo.firstName} TO APPROVE PAYMENT` : "MARK AS PAID"}</button>
          }
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Room;
