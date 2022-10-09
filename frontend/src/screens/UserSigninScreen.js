import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function UserSigninScreen(props) {
  const [userInfo, setUserInfo] = useState(localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTutor, setIsTutor] = useState(false);

  const redirect = userInfo.category === 'students' ? '/' : '/tutors/dashboard/profile';

  const submitHandler = async (e) => {
    let signinEndpoint = isTutor ? "tutors/signin" : "students/signin";

    e.preventDefault();
    if (email && password) {
      const student = {
        email,
        password
      };

      try {
        setLoading(true);
        const res = await axios.post(signinEndpoint, student);
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
          <h3>Sign In {isTutor ? 'Tutor' : 'Student'}</h3>

          {loading && <LoadingBox msg='Signing you in! Please wait...' />}
          {error && <MessageBox msg={error} variant='danger'></MessageBox>}

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

          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
          <div className="forgot-password text-center">
            New User?
            <Link to="/students/signup"> Sign up?</Link>
            <div>Or</div>
            {
              isTutor ?
                (<Link to="#" onClick={() => setIsTutor(false)}>Signin as Student</Link>) :
                (<Link to="#" onClick={() => setIsTutor(true)}>Signin as Tutor</Link>)
            }
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(UserSigninScreen);
