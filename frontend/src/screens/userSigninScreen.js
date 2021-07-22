import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { signin } from '../store/actionCreators/userActions';

function UserSigninScreen(props) {
  const { userInfo, loading, error } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isTutor, setIsTutor] = useState(false);

  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    if (email && password)
      props.authenticateUser(email, password, isTutor);
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
          <p className="forgot-password text-center">
            New User?
            <Link to="/users/signup"> Sign up?</Link>
            <div>Or</div>
            {
              isTutor ?
                (<Link onClick={() => setIsTutor(false)}>Signin as Student</Link>) :
                (<Link onClick={() => setIsTutor(true)}>Signin as Tutor</Link>)
            }
          </p>
        </form>
      </div>
    </div>
  );
}

//here we are subscribing to the state.user.userInfo object property living inside the redux store, each time this state.user.userInfo object is replace by a new object returned by any one of the reducers, we are going to get the updated object inside the props.userInfo, and whenever new props are passed to a component, that component as a whole is always re-rendered always;
const mapStateToProps = (state) => {
  return {
    userInfo: state.userSignin.userInfo,
    error: state.userSignin.error,
    loading: state.userSignin.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: (email, password, isTutor) => {
      dispatch(signin(email, password, isTutor));
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(UserSigninScreen);