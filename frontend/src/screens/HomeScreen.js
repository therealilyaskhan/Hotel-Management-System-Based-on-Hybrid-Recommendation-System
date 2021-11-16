import { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import { Box, makeStyles, TextField } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

import BgVideo from '../components/BgVideo';
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    '& .MuiFilledInput-input': {
      color: '#fff'
    }
  },
});

export default function HomeScreen() {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;
  const history = useHistory();

  const inputField = useRef(null);
  const classes = useStyles();
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (userInfo?.category === 'tutors') {
      history.push('/tutors/dashboard/profile');
    }
  }, []);

  const autocomplete = async (e, value) => {
    setInputValue(value.trim());
    try {
      const res = await axios.get("courses/search?term=" + inputValue);
      const titles = res.data.map((course) => course.title);

      setSuggestions(titles);
    } catch (err) {
      console.log(err);
    }
  };

  const searchTutors = async () => {

    if (inputValue.trim() === '')
      return;

    try {
      const res = await axios.get("teaches?course=" + inputValue.trim());
      const tutors = res.data.map((tutor) => tutor.tutorID);
      history.push({
        pathname: '/results',
        tutorIDs: tutors
      });
    } catch (err) {
      console.log(err);
    }

  };

  return (
    <>
      <Box className="hero__container">
        <BgVideo title="hero" />
        <div className="home__inner">
          <div className="d-flex min-vh-100">
            <div className="m-auto w-50 text-center">
              <h1 className="mb-0 font-weight-normal text-center">Find an expert tutor.</h1>

              <h4 className="text-center font-weight-lighter font-smaller m-3 h5">Private, 1–on–1 lessons with the expert instructor of your choice. <span className="d-none d-md-inline-block">Decide how much you pay and who you want to work with. The choice is yours.</span></h4>

              <div className="d-inline-block text-left">
                <small className="mb-1 d-inline-block">What would you like to learn ?</small>
                <Autocomplete
                  onInputChange={autocomplete}
                  autoComplete={true}
                  autoSelect
                  id="combo-box-demo"
                  openOnFocus={false}
                  noOptionsText=''
                  clearOnEscape
                  fullWidth
                  options={suggestions}
                  getOptionLabel={(option) => option}
                  style={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      inputRef={inputField}
                      value={inputValue}
                      className={classes.root}
                      InputProps={{
                        className: classes.root
                      }} {...params} autoFocus color="secondary" variant="filled" />
                  )}
                />
                <button onClick={searchTutors} className="btn btn-primary btn-block mt-3">GET HELP</button>
              </div>

            </div>
          </div>


          {
            !userInfo?.category ?
              <div className="row home__scroll">
                <div className="col col-md-6 m-auto text-center">
                  <a href="#getting-help" className="btn btn-outline-primary border-0 text-white home__btn">
                    <span className="home__scroll-text px-3 d-inline-block">See how personalized learning – in-person – can work for you</span>
                    <i className="fa fa-chevron-down home__scroll-icon"></i>
                  </a>
                </div>
              </div> :
              null
          }
        </div>
      </Box>

      {
        !userInfo?.category ?
          <>
            <div id="getting-help" className="row mt-5 mb-5">
              <div className="col">
                <h2 className="mb-0 text-dark font-weight-normal h1 text-center"> Getting help is easier than you think.</h2>
              </div>
            </div>

            <section className="how-it-works container">
              <div className="row text-center">
                <div className="col-md-4 mb-4">
                  <div className="circle-icon mb-4">
                    <h2 className="circle-icon__content">1</h2>
                  </div>
                  <div>
                    <h4 className="font-weight-normal text-dark">TELL US WHERE YOU’RE STRUGGLING</h4>
                    <p className="mt-0 mb-4 text-dark">Connect with experts in more than 300 skills and subjects.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="circle-icon mb-4">
                    <h2 className="circle-icon__content">2</h2>
                  </div>
                  <div>
                    <h4 className="font-weight-normal text-dark">CHOOSE THE TUTOR YOU WANT</h4>
                    <p className="mt-0 mb-4 text-dark">Search online for a tutor with the right qualifications and hourly rates.</p>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="circle-icon mb-4">
                    <h2 className="circle-icon__content">3</h2>
                  </div>
                  <div>
                    <h4 className="font-weight-normal text-dark">BOOK YOUR LESSON</h4>
                    <p className="mt-0 mb-4 text-dark">Tell your tutor when you’d like to meet, and only pay for the time you need.</p>
                  </div>
                </div>
              </div>

              <div className="row text-center">
                <div className="col w-100  col-12 text-center mb-0">
                  <Link to="/students/signup" className="btn btn-primary btn-lg mb-4">get started</Link>
                </div>
              </div>
            </section>

            <section className="become-a-tutor py-5">
              <div className="row text-center py-5">

                <div className="col py-3">
                  <div className="container">
                    <h1 className="mb-4 text-white font-weight-light">Start tutoring with us today.</h1>
                    <p className="text-white mb-3">We’re always looking for talented tutors. Set your own rate, get paid and make a difference.</p>
                  </div>
                  <Link to="/tutors/signup" className="btn btn-outline-light btn-lg">Apply today</Link>
                </div>

              </div>
            </section>
          </>
          :
          null
      }
    </>
  );
}
