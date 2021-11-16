import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const TutorSignupScreen = (props) => {
  const info = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;
  const [userInfo, setUserInfo] = useState(info);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [description, setDescription] = useState('');

  const redirect = '/tutors/moreinfo';


  const submitHandler = async (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password && experience && hourlyRate && description) {
      //form submission logic here
      const tutor = {
        firstName,
        lastName,
        email,
        password,
        experience,
        hourlyRate,
        description
      };

      try {
        setLoading(true);
        const res = await axios.post("tutors/signup", tutor);
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
          <h3>Let's Sign you up as Tutor!</h3>

          {loading && <LoadingBox msg={`Registering you as a Tutor! Please wait...`} />}
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

          <div className="form-group">
            <label htmlFor="hourlyRate">Hourly Rate</label>

            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">$</span>
              </div>
              <input
                type="number"
                className="form-control"
                id="hourlyRate"
                aria-label="Amount (to the nearest dollar)"
                name="hourlyRate"
                onChange={(e) => setHourlyRate(e.target.value)}
                required
              />
              <div className="input-group-append">
                <span className="input-group-text">.00</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="experience">How many years of tutoring experience do you have?</label>
            <div className="input-group mb-3">
              <input
                type="number"
                className="form-control"
                id="experience"
                aria-label="Years of Experience"
                name="experience"
                onChange={(e) => setExperience(e.target.value)}
                required
              />
              <div className="input-group-append">
                <span className="input-group-text">Years</span>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              rows='3'
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              placeholder="Please write a little about yourself..."
              required
            >
            </textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Sign Up as Tutor</button>

          <hr />

          <Link to="/students/signup" type="submit" className="btn btn-danger btn-block">Take me to Student Sign Up Page <i className="fa fa-arrow-right"></i></Link>

          <p className="forgot-password text-right">
            Already registered <Link to="/signin">sign in?</Link>
          </p>
        </form>
      </div >
    </div >
  );
};

export default withRouter(TutorSignupScreen);