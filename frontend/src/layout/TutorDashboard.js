import React, { useEffect, useState } from 'react';
import {
  useHistory,
  Switch,
  Route
} from "react-router-dom";
import AppBarAndDrawer from '../components/tutor/AppBarAndDrawer';
import TutorProfileInfo from '../screens/TutorProfileInfo';
import TutorDashboardScreen from '../screens/TutorDashboardScreen';
import MeetingScreen from '../screens/MeetingScreen';
import TransactionScreen from '../screens/TransactionScreen';
import TutorMapScreen from '../screens/TutorMapScreen';
import LogoutScreen from '../screens/LogoutScreen';
import MeetingRoom from '../screens/MeetingRoom';
import moment from 'moment';
import axios from 'axios';

function TutorDashboard() {
  const { _id, categoryID } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const [activeMeeting, setActiveMeeting] = useState([]);

  const history = useHistory();

  useEffect(() => {
    if (!_id) {
      history.push('/tutors/signup');
    } else if (!categoryID) {
      history.push('/tutors/moreinfo');
    }
  }, [history, categoryID, _id]);

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
        <Route exact path="/tutors/dashboard/profile">
          <TutorProfileInfo />
        </Route>
        <Route path="/tutors/dashboard/dashboard">
          <TutorDashboardScreen />
        </Route>
        <Route path="/tutors/dashboard/map">
          <TutorMapScreen _id={_id} />
        </Route>
        <Route exact path="/tutors/dashboard/meetings">
          <MeetingScreen />
        </Route>
        <Route exact path="/tutors/dashboard/meetingroom">
          <MeetingRoom meeting={activeMeeting.length ? activeMeeting : false} />
        </Route>
        <Route exact path="/tutors/dashboard/transactions">
          <TransactionScreen type="tutor" />
        </Route>
        <Route path="/tutors/dashboard/logout">
          <LogoutScreen />
        </Route>
      </Switch>
    </div>

  );
}

export default TutorDashboard;
