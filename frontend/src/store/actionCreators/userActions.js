import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNOUT, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS, USER_SIGNUP_FAIL } from '../constants/actionTypes';

export const signin = (email, password, isTutor) => {
  const url = isTutor ?
    '/api/auth/tutors/signin' :
    '/api/auth/students/signin';

  return async (dispatch) => {
    dispatch({
      type: USER_SIGNIN_REQUEST,
      payload: { email, password }
    });

    try {
      const res = await fetch(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
      );

      if (!res.ok) { // error coming back from server
        throw Error('Invalid email or password');
      }

      const data = await res.json();

      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
      // auto catches network / connection error
      dispatch({
        type: USER_SIGNIN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }

  };
};

export const signout = () => {
  return (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_SIGNOUT });
  };
};

export const signup = (userSignupDetails) => {
  const { isTutor } = userSignupDetails;
  const url = isTutor ?
    '/api/auth/tutors/signup' :
    '/api/auth/students/signup';

  return async (dispatch) => {
    dispatch({
      type: USER_SIGNUP_REQUEST,
      payload: userSignupDetails
    });

    try {
      const res = await fetch(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userSignupDetails)
        }
      );

      if (!res.ok) { // error coming back from server
        throw Error('Signup failed!');
      }

      const data = await res.json();

      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: data
      });
      dispatch({
        type: USER_SIGNIN_SUCCESS,
        payload: data
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (error) {
      // auto catches network / connection error
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
      });
    }

  };
};