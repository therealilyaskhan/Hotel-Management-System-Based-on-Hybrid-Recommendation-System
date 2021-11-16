import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress, Grid } from '@material-ui/core';
import TutorProfileCard from '../components/Card/TutorProfileCard';
import BottomDrawer from '../components/tutor/BottomDrawer';
import axios from 'axios';

function ResultsLayout(props) {
  const location = useLocation();

  const tutorIDs = location.tutorIDs;
  const [tutorsData, setTutorsData] = useState([]);

  useEffect(() => {

    if (tutorIDs?.length) {
      const getTutorsData = async () => {
        let res = await axios.all(tutorIDs.map(tutorID => axios.get("tutors/" + tutorID.trim())));
        let tutors = res.map((r) => {
          const { _id, imageURL, categoryName, firstName, lastName, hourlyRate, experience, averageRating } = r.data.data;
          return { _id, imageURL, categoryName, firstName, lastName, hourlyRate, experience, averageRating };
        });
        console.log(tutors);
      };


      // const getTutorsData = async () => {

      //   for (const tutorID of tutorIDs) {
      //     const tutor = await axios.get("tutors/" + tutorID.trim());
      //     const { _id, imageURL, categoryName, firstName, lastName, hourlyRate, experience, averageRating } = tutor.data.data;

      //     tutors.push({ _id, imageURL, categoryName, firstName, lastName, hourlyRate, experience, averageRating });
      //   }
      // };

      getTutorsData();
    }
  }, []);

  return (
    <Box>
      {
        !tutorIDs?.length ?
          <>
            <BottomDrawer />
            <div class="">
              <div class="row">

                <div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"><TutorProfileCard /></div>
                <div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"><TutorProfileCard /></div>
                <div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"><TutorProfileCard /></div>
                <div class="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"><TutorProfileCard /></div>

              </div>
            </div>
          </> :
          !tutorsData.length ?
            <CircularProgress />
            :
            <TutorProfileCard />
      }
    </Box>
  );
}

export default ResultsLayout;
