import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';
import TutorProfileCard from '../components/Card/TutorProfileCard';
import BottomDrawer from '../components/tutor/BottomDrawer';
import axios from 'axios';

function ResultsLayout(props) {
  const location = useLocation();

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const [tutorIDs, setTutorIDs] = useState(location.state.tutorIDs);
  const { term } = location.state;

  const [tutorsData, setTutorsData] = useState([]);

  useEffect(() => {

    if (tutorIDs.length) {
      const getTutorsData = async () => {
        let res = await axios.all(tutorIDs.map(tutorID => axios.get("tutors/" + tutorID.trim())));
        let tutors = res.map((r) => {
          const { _id, imageURL, categoryName, firstName, lastName, hourlyRate, experience, averageRating, city, country } = r.data.data;
          return { _id, imageURL, categoryName, firstName, lastName, city, country, hourlyRate, experience, averageRating };
        });
        setTutorsData(tutors);
      };
      getTutorsData();
    }
  }, [tutorIDs]);

  return (
    <Box>
      {
        !tutorIDs.length ?
          <>
            <BottomDrawer />
            <Box height={380} display="flex" justifyContent="center" alignItems="center">

              no results found

            </Box>
          </> :
          !tutorsData.length ?
            <Box height={450} display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
            :
            <>
              <BottomDrawer tutorIDs={tutorIDs} setTutorIDs={setTutorIDs} />
              <Box fontSize={25} className="text-capitalize pt-4 pb-3 px-4">
                <span className="font-weight-bold">{tutorIDs.length} {term} tutor{tutorIDs.length > 1 ? "s" : ""}</span> for you
              </Box>
              <div className="row mb-5">
                {
                  tutorsData.map((tutor) => (
                    <div key={tutor._id} className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"><TutorProfileCard tutorInfo={tutor} currentUser={userInfo._id ? userInfo : false} /></div>
                  ))
                }
              </div>
            </>
      }
    </Box>
  );
}

export default ResultsLayout;
