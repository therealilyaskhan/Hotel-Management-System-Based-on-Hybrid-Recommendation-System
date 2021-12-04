import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';
import TutorProfileCard from '../components/Card/TutorProfileCard';
import BottomDrawer from '../components/tutor/BottomDrawer';
import Carousel from '../components/Carousel';
import axios from 'axios';

function ResultsLayout(props) {
  const location = useLocation();

  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const [tutorIDs, setTutorIDs] = useState(location.state.tutorIDs);
  const { term } = location.state;

  const [tutorsData, setTutorsData] = useState([]);
  const [recommendedTutors, setRecommendedTutors] = useState([]);

  const [filterApplied, setFilterApplied] = useState(false);

  useEffect(() => {
    let tutors;
    if (tutorIDs.length) {
      const getTutorsData = async () => {
        let res = await axios.all(tutorIDs.map(tutorID => axios.get("tutors/" + tutorID.trim())));
        tutors = res.map((r) => {
          const { _id, imageURL, description, categoryName, firstName, lastName, hourlyRate, experience, averageRating, city, country } = r.data.data;
          return { _id, description, imageURL, categoryName, firstName, lastName, city, country, hourlyRate, experience, averageRating };
        });
        setTutorsData(tutors);
      };
      getTutorsData();
    }
  }, [tutorIDs]);

  useEffect(() => {
    const getRecommendedTutors = async () => {
      try {
        //first we find those tutors who are reviewed
        const reviewedTutors = [];
        const feedbacks = await axios.all(tutorIDs.map(tutorID => axios.get("feedbacks/" + tutorID.trim())));
        feedbacks.forEach(feedback => {
          if (feedback.data.length)
            reviewedTutors.push(feedback.data);
        });
        console.log(reviewedTutors);
        //now we have to avg rating of each tutor
        // AR = 1*a+2*b+3*c+4*d+5*e/(R) 
        //for this we need to calculate first the number of 1s, 2s, 3s, 4s, 5s rating so the data structure for each tutor is gonna look something like this:
        /*
        {
          tutorID:
          1:
          2:
          3:
          4:
          5:
          totalReviews:
        }
        */
        const tutorsWithAverageRating = reviewedTutors.map(reviewedTutor => {
          let a, b, c, d, e;
          a = b = c = d = e = 0;
          console.log(a, b, c, d, e);

          let R = reviewedTutor.length;
          reviewedTutor.forEach(review => {
            switch (review.rating) {
              case 1:
                a++;
                break;
              case 2:
                b++;
                break;
              case 3:
                c++;
                break;
              case 4:
                d++;
                break;
              case 5:
                e++;
                break;
              default:
                break;
            }
          });
          //now that we have all the variables apply AR = 1*a+2*b+3*c+4*d+5*e/(R) to get average rating
          const AR = (1 * a + 2 * b + 3 * c + 4 * d + 5 * e) / R;
          return {
            tutor: tutorsData.find(tutor => tutor._id === reviewedTutor[0].tutorID),
            AR
          };
        });
        tutorsWithAverageRating.sort((a, b) => parseFloat(b.AR) - parseFloat(a.AR));
        setRecommendedTutors(tutorsWithAverageRating);
      } catch (err) {
        console.log(err);
      }
    };
    if (tutorsData.length)
      getRecommendedTutors();
  }, [tutorsData, tutorIDs]);

  return (
    <Box>
      {
        !tutorIDs.length ?
          <>
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
              <BottomDrawer tutorIDs={tutorIDs} setTutorIDs={setTutorIDs} setFilterApplied={setFilterApplied} />
              <Box fontSize={25} className="text-capitalize pt-4 pb-3 px-4">
                <span className="font-weight-bold">{tutorIDs.length} {filterApplied ? "nearby" : ""} {term} tutor{tutorIDs.length > 1 ? "s" : ""}</span> found
              </Box>
              <div className="row mb-5">
                {
                  tutorsData.map((tutor) => (
                    <div key={tutor._id} className="col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3"><TutorProfileCard tutorInfo={tutor} currentUser={userInfo._id ? userInfo : false} /></div>
                  ))
                }
              </div>
              {
                recommendedTutors.length ?
                  <>
                    <Box fontSize={22} mt={8} className="text-capitalize pt-4 px-4">
                      <span className="font-weight-bold">Top {filterApplied ? "nearby" : ""} {term} tutor{recommendedTutors.length > 1 ? "s" : ""}</span> Recommended for you
                    </Box>
                    <Box mb={6} mt={2}>
                      <Carousel recommendedTutors={recommendedTutors} />
                    </Box>
                  </>
                  :
                  null
              }
            </>
      }
    </Box>
  );
}

export default ResultsLayout;
