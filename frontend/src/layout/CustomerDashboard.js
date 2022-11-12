import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  Switch,
  Route
} from "react-router-dom";
import { useHistory } from 'react-router';
import AppBarAndDrawer from '../components/customer/AppBarAndDrawer';
import LogoutScreen from '../screens/LogoutScreen';
import CustomerDashboardScreen from '../screens/CustomerDashboardScreen';
import CustomerProfileScreen from '../screens/CustomerProfileScreen';
import MeetingScreen from '../screens/MeetingScreen';
import MeetingRoom from '../screens/MeetingRoom';
import axios from 'axios';
import moment from 'moment';
import TransactionScreen from '../screens/TransactionScreen';

function CustomerDashboard({ socket }) {
  const { _id } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const [activeMeeting, setActiveMeeting] = useState([]);

  const history = useHistory();

  const [eventMounted, setEventMounted] = useState(false);

  useEffect(() => {
    if (socket && !eventMounted) {
      socket.on("getMessage", (data) => {
        //on getting message notify user
        console.log(data);
        toast(`${data.senderName}: ${data.message}`);
      });
      setEventMounted(true);
    }
  }, [socket, eventMounted]);

  useEffect(() => {
    if (_id) {
      const getAllMeetings = async () => {
        try {
          const res = await axios.get("meetings?userID=" + _id);
          const allMeetings = res.data;
          const activeOnes = [];
          allMeetings.forEach((meeting) => {
            //check if meeting is a pending one but is an active one (no need to update the DB simply push it into active meetings array and mark it as active on frontend)
            if (meeting.status === 'pending' && moment(meeting.startDate, "MMMM Do YYYY, h:mm:ss A").diff(moment()) < 5000 && moment(meeting.endDate, "MMMM Do YYYY, h:mm:ss A").diff(moment()) >= 5000) {
              activeOnes.push(meeting);
            }
          });
          setActiveMeeting(activeOnes);
        } catch (err) {
          console.log(err);
        }
      };
      getAllMeetings();
    } else {
      history.push('/signin');
    }
  }, [_id, history]);

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
      <AppBarAndDrawer socket={socket} activeMeeting={activeMeeting.length ? activeMeeting.length : false} />
      <Switch>
        <Route exact path="/customers/dashboard/profile">
          <CustomerProfileScreen />
        </Route>
        <Route exact path="/customers/dashboard/dashboard">
          <CustomerDashboardScreen />
        </Route>
        <Route exact path="/customers/dashboard/meetings">
          <MeetingScreen />
        </Route>
        <Route exact path="/customers/dashboard/meetingroom">
          <MeetingRoom meeting={activeMeeting.length ? activeMeeting : false} />
        </Route>
        <Route exact path="/customers/dashboard/transactions">
          <TransactionScreen type="customer" />
        </Route>
        <Route path="/customers/dashboard/logout">
          <LogoutScreen />
        </Route>
      </Switch>
    </div>

  );
}

export default CustomerDashboard;
