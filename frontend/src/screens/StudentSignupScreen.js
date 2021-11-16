import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const StudentSignupScreen = (props) => {
  // const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;
  const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const redirect = userInfo.category === 'students' ? '/students/dashboard/profile' : '/tutors/dashboard/profile';


  const submitHandler = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      //form submission logic here
      const student = {
        firstName,
        lastName,
        email,
        password
      };

      try {
        setLoading(true);
        const res = await axios.post("students/signup", student);
        const data = res.data.data;
        if (data) {
          localStorage.setItem('userInfo', JSON.stringify(data));
          setUserInfo(data);
          setLoading(false);
        }

      } catch (err) {
        setLoading(false);
        setError(err.message);
      }

    }
  };

  useEffect(() => {
    if (userInfo) {
      // props.history.push('/users/:Id'); //redirect user to his profile
      props.history.push(redirect);
    }
  }, [props.history, userInfo, redirect]);


  return (

    <div className="auth-wrapper my-5">
      <div className="auth-inner mt-5">

        <form onSubmit={submitHandler}>
          <h3>Let's Sign you up as Student!</h3>

          {loading && <LoadingBox msg={`Registering you as a Student! Please wait...`} />}
          {error && <MessageBox msg={error} variant='danger'></MessageBox>}

          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              className="form-control"
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              className="form-control"
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter a new password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">Sign Up as Student</button>

          <hr />

          <Link to="/tutors/signup" type="submit" className="btn btn-danger btn-block">Take me to Tutor Registration Page <i className="fa fa-arrow-right"></i></Link>

          <p className="forgot-password text-right">
            Already registered <Link to="/signin">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default withRouter(StudentSignupScreen);