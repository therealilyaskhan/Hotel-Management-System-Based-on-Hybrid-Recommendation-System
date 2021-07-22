import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import userSigninScreen from './screens/userSigninScreen';
import UserSignupScreen from './screens/userSignupScreen';

import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (
    <Router>
      <>
        <Navbar />
        <main>
          <Switch>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/users/signup" component={UserSignupScreen} ></Route>
            <Route path="/users/signin" component={userSigninScreen}></Route>
          </Switch>
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
