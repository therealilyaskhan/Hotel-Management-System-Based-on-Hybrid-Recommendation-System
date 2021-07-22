import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../store/actionCreators/userActions';

function Navbar(props) {
  const userInfo = props.userInfo;

  const signoutHandler = () => {
    props.userSignout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

      <Link to="/" className="navbar-brand">TutorPerHour</Link>

      <button className="navbar-toggler" data-target="#navbarMenu" data-toggle="collapse">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div id="navbarMenu" className="collapse navbar-collapse">
        <ul className="navbar-nav mx-auto">
          <div className="d-block d-lg-none">
            <li className="nav-item">
              <Link className="nav-link" to="/users/signin">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users/signup">Signup</Link>
            </li>
          </div>

          <li className="nav-item">
            <Link className="nav-link" to="#">Find A Tutor</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">How it Works</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Resources</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Start Tutoring</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">About Us</Link>
          </li>
        </ul>
        <div className="d-none d-lg-block">
          {userInfo ? (
            <>
              <Link className="navbar__login text-uppercase btn text-white btn-sm mr-3" to="#">{userInfo.firstName}</Link>
              <Link className="text-uppercase btn btn-outline-danger text-white btn-sm" to="#signout" onClick={signoutHandler}>Sign Out</Link>
            </>
          ) : (
            <>
              <Link className="navbar__login text-uppercase btn text-white btn-sm mr-3" to="/users/signin">Log in</Link>
              <Link className="text-uppercase btn btn-outline-success text-white btn-sm" to="/users/signup">Sign up</Link>
            </>
          )}
        </div>
      </div>

    </nav >
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    userSignout: () => {
      dispatch(signout());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userSignin.userInfo
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Navbar);