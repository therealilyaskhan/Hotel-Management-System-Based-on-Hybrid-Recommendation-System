import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import { useHistory } from 'react-router';
import AppBarAndDrawer from '../components/student/AppBarAndDrawer';
import LogoutScreen from '../screens/LogoutScreen';
import StudentDashboardScreen from '../screens/StudentDashboardScreen';
import StudentProfileScreen from '../screens/StudentProfileScreen';
import MeetingScreen from '../screens/MeetingScreen';
import MeetingRoom from '../screens/MeetingRoom';
import axios from 'axios';
import moment from 'moment';
import TransactionScreen from '../screens/TransactionScreen';

function StudentDashboard() {
  const { _id } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const [activeMeeting, setActiveMeeting] = useState([]);

  const history = useHistory();

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
      <AppBarAndDrawer activeMeeting={activeMeeting.length ? activeMeeting.length : false} />
      <Switch>
        <Route exact path="/students/dashboard/profile">
          <StudentProfileScreen />
        </Route>
        <Route exact path="/students/dashboard/dashboard">
          <StudentDashboardScreen />
        </Route>
        <Route exact path="/students/dashboard/meetings">
          <MeetingScreen />
        </Route>
        <Route exact path="/students/dashboard/meetingroom">
          <MeetingRoom meeting={activeMeeting.length ? activeMeeting : false} />
        </Route>
        <Route exact path="/students/dashboard/transactions">
          <TransactionScreen type="student" />
        </Route>
        <Route path="/students/dashboard/logout">
          <LogoutScreen />
        </Route>
      </Switch>
    </div>

  );
}

export default StudentDashboard;
