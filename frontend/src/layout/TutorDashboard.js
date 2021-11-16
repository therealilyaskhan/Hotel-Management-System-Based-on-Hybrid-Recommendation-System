import React, { useEffect } from 'react';
import {
  useHistory,
  Switch,
  Route
} from "react-router-dom";
import AppBarAndDrawer from '../components/tutor/AppBarAndDrawer';
import TutorProfileScreen from '../screens/TutorProfileScreen';
import TutorDashboardScreen from '../screens/TutorDashboardScreen';
import TutorMapScreen from '../screens/TutorMapScreen';
import LogoutScreen from '../screens/LogoutScreen';

function TutorDashboard() {
  const { _id, categoryID } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;
  const history = useHistory();

  useEffect(() => {
    if (!_id) {
      history.push('/tutors/signup');
    } else if (!categoryID) {
      history.push('/tutors/moreinfo');
    }
  }, [history, categoryID, _id]);

  return (
    <div>
      <AppBarAndDrawer />
      <Switch>
        <Route exact path="/tutors/dashboard/profile">
          <TutorProfileScreen />
        </Route>
        <Route path="/tutors/dashboard/dashboard">
          <TutorDashboardScreen _id={_id} />
        </Route>
        <Route path="/tutors/dashboard/map">
          <TutorMapScreen _id={_id} />
        </Route>
        <Route path="/tutors/dashboard/settings">
          <div>settings</div>
        </Route>
        <Route path="/tutors/dashboard/logout">
          <LogoutScreen />
        </Route>
      </Switch>
    </div>

  );
}

export default TutorDashboard;
