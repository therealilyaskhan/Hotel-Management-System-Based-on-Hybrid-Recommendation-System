import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import StudentDashboard from './layout/StudentDashboard';
import TutorDashboard from './layout/TutorDashboard';
import { ThemeProvider } from '@material-ui/core/styles';
import { io } from "socket.io-client";

import Topbar from './components/Topbar';
import Footer from './components/Footer';
import UserSigninScreen from './screens/UserSigninScreen';
import StudentSignupScreen from './screens/StudentSignupScreen';
import TutorSignupScreen from './screens/TutorSignupScreen';
import TutorProfileScreen from './screens/TutorProfileScreen';
import TutorMoreInfoScreen from './screens/TutorMoreInfoScreen';
import Messenger from './screens/Messenger';
import Room from './screens/Room';

import theme from './theme/theme';
import ResultsLayout from './layout/ResultsLayout';
import ScheduleMeetingScreen from './screens/ScheduleMeetingScreen';
import { useEffect, useState } from 'react';

function App() {
  const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const [socket, setSocket] = useState(false);

  useEffect(() => {
    if (user)
      setSocket(io("ws://localhost:8900"));
  }, []);

  useEffect(() => {
    if (user && socket)
      socket?.emit("addUser", user._id);
  }, [user, socket]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Topbar sticky responsive socket={socket} />
            <HomeLayout />
            < Footer />
          </Route>
          <Route path="/signin">
            <Topbar />
            <UserSigninScreen />
            < Footer />
          </Route>
          <Route path="/students/signup">
            <Topbar sticky />
            <StudentSignupScreen />
            < Footer />
          </Route>
          <Route path="/tutors/signup">
            <Topbar sticky />
            <TutorSignupScreen />
            < Footer />
          </Route>
          <Route path="/tutors/profile">
            <Topbar sticky socket={socket} />
            <TutorProfileScreen />
            < Footer />
          </Route>
          <Route path="/tutors/moreinfo">
            <Topbar />
            <TutorMoreInfoScreen />
            < Footer />
          </Route>
          <Route path="/tutors/dashboard">
            <TutorDashboard socket={socket} />
            <Footer crop />
          </Route>
          <Route path="/students/dashboard">
            <StudentDashboard socket={socket} />
            <Footer crop />
          </Route>
          <Route path="/messenger">
            <Topbar sticky responsive color="#00b0ff" />
            <Messenger />
          </Route>
          <Route path="/results">
            <Topbar sticky responsive socket={socket} />
            <ResultsLayout />
            <Footer />
          </Route>
          <Route path="/schedule">
            <Topbar sticky responsive socket={socket} />
            <ScheduleMeetingScreen />
            <Footer />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
