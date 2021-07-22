import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { signup } from '../store/actionCreators/userActions';

const UserSignupScreen = (props) => {
  const { userInfo, loading, error } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [password, setPassword] = useState('');
  const [radio, setRadio] = useState('no');
  const [isTutor, setIsTutor] = useState(false);

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';


  const submitHandler = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && address && zipcode && password)
      props.registerUser({ firstName, lastName, email, address, zipcode, password, isTutor });
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
          <h3>Let's Sign you up!</h3>

          {loading && <LoadingBox msg={`Registering you as a ${isTutor ? 'Tutor' : 'Student'}! Please wait...`} />}
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
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              placeholder="Enter your address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="zipcode">Zip code</label>
            <input
              type="text"
              name="zipcode"
              id="zipcode"
              onChange={(e) => setZipcode(e.target.value)}
              className="form-control"
              placeholder="Enter valid zip or postal code"
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

          <div className="form-group my-4">
            <div className="form__radio-group">
              <input
                type="radio"
                name="radio"
                id="student"
                checked={radio === 'no'}
                onChange={
                  (e) => {
                    setRadio('no');
                    setIsTutor(!(e.target.checked));
                  }
                }
                className="form__radio-input form-control"
              />
              <label htmlFor="student" className="form__radio-label">
                <span className="form__radio-button"></span>
                Student
                </label>
            </div>

            <div className="form__radio-group">
              <input
                type="radio"
                name="radio"
                id="tutor"
                checked={radio === 'yes'}
                onChange={
                  (e) => {
                    setRadio('yes');
                    setIsTutor(e.target.checked);
                  }
                }
                className="form__radio-input form-control"
              />
              <label htmlFor="tutor" className="form__radio-label">
                <span className="form__radio-button"></span>
                <span className="form__radio-text">Tutor</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
          <p className="forgot-password text-right">
            Already registered <Link to="/users/signin">sign in?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userSignup.userInfo,
    error: state.userSignup.error,
    loading: state.userSignup.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (userSignupDetails) => {
      dispatch(signup(userSignupDetails));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserSignupScreen);