import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeLayout from './layout/HomeLayout';
import StudentDashboard from './layout/StudentDashboard';
import TutorDashboard from './layout/TutorDashboard';
import { ThemeProvider } from '@material-ui/core/styles';

import Topbar from './components/Topbar';
import Footer from './components/Footer';
import UserSigninScreen from './screens/UserSigninScreen';
import StudentSignupScreen from './screens/StudentSignupScreen';
import TutorSignupScreen from './screens/TutorSignupScreen';
import TutorMoreInfoScreen from './screens/TutorMoreInfoScreen';
import Messenger from './screens/Messenger';

import theme from './theme/theme';
import ResultsLayout from './layout/ResultsLayout';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Topbar sticky responsive />
            <HomeLayout />
            < Footer />
          </Route>
          <Route path="/signin">
            <Topbar />
            <UserSigninScreen />
            < Footer />
          </Route>
          <Route path="/students/signup">
            <Topbar />
            <StudentSignupScreen />
            < Footer />
          </Route>
          <Route path="/tutors/signup">
            <Topbar />
            <TutorSignupScreen />
            < Footer />
          </Route>
          <Route path="/tutors/moreinfo">
            <Topbar />
            <TutorMoreInfoScreen />
            < Footer />
          </Route>
          <Route path="/tutors/dashboard">
            <TutorDashboard />
            <Footer crop />
          </Route>
          <Route path="/students/dashboard">
            <StudentDashboard />
            <Footer crop />
          </Route>
          <Route path="/messenger">
            <Topbar sticky responsive color="#00b0ff" />
            <Messenger />
          </Route>
          <Route path="/results">
            <Topbar sticky responsive />
            <ResultsLayout />
            <Footer />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
