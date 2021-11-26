import React from 'react';
import {
  Switch,
  Route
} from "react-router-dom";
import AppBarAndDrawer from '../components/student/AppBarAndDrawer';
import LogoutScreen from '../screens/LogoutScreen';
import StudentDashboardScreen from '../screens/StudentDashboardScreen';
import StudentProfileScreen from '../screens/StudentProfileScreen';
import MeetingScreen from '../screens/MeetingScreen';

function StudentDashboard() {
  return (
    <div>
      <AppBarAndDrawer />
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
        <Route path="/students/dashboard/logout">
          <LogoutScreen />
        </Route>
      </Switch>
    </div>

  );
}

export default StudentDashboard;
