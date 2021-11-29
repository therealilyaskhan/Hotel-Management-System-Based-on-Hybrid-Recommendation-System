import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';


function TutorProfileCard({ tutorInfo, currentUser }) {
  const history = useHistory();
  const [averageRating, setAverageRating] = useState(0);
  const { _id } = tutorInfo;

  const tutorProfile = {
    pathname: "/tutors/profile",
    tutorInfo
  };

  useEffect(() => {
    if (_id) {
      const getAverageRating = async () => {
        try {
          const feedbacks = await axios.get("feedbacks/" + _id);
          if (feedbacks.data.length)
            setAverageRating(feedbacks.data.reduce((n, { rating }) => n + rating, 0) / feedbacks.data.length);
        } catch (err) {
          console.log(err);
        }
      };
      getAverageRating();
    }
  }, [_id]);

  const createNewInbox = async () => {

    if (tutorInfo?._id && currentUser) {
      const members = {
        ownerID: currentUser?._id,
        opponentID: tutorInfo?._id
      };

      try {
        const res = await axios.post('inboxes', members);
        const inboxCreated = res.data.success;
        if (inboxCreated) {
          history.push('/messenger');
        }

      } catch (err) {
        console.log(err.message);
      }
    } else if (!currentUser) {
      history.push('/signin');
    }

  };

  const scheduleNewMeeting = async () => {

    if (tutorInfo?._id && currentUser) {
      //take user to schedule screen and pass there the tutor id and current user id as state
      history.push({
        pathname: '/schedule',
        state: {
          tutorInfo,
          studentInfo: currentUser
        }
      });
    } else if (!currentUser) {
      history.push('/signin');
    }

  };
  return (
    <div className="tutor__profile-container">
      <div className="tutor__img-container">
        <img src={"http://localhost:5000/" + tutorInfo?.imageURL} />
      </div>
      <Box mb={0.2}>
        <Rating name="read-only" precision={0.5} value={averageRating} readOnly />
      </Box>
      <Link to={tutorProfile} className="tutor__info tutor__full-name">{tutorInfo?.firstName} {tutorInfo?.lastName}</Link>
      <p className="tutor__info tutor__role">
        <i className="fas fa-star"></i>
        {tutorInfo?.categoryName} Tutor
      </p>
      <p className="tutor__info tutor__place">
        <i className="fas fa-map-marker-alt"></i>
        {tutorInfo?.city} {tutorInfo?.country}
      </p>

      <div className="tutor__rate-info">
        ${tutorInfo?.hourlyRate}<span>&nbsp;/hour</span>
      </div>

      <button className="tutor__action" onClick={scheduleNewMeeting}>Schedule</button>
      <button className="tutor__action inbox" onClick={createNewInbox}>Message</button>
    </div>
  );
}

export default TutorProfileCard;
