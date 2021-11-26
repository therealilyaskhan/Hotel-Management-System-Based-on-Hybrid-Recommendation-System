import { makeStyles } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from '@material-ui/lab/Rating';
import { useEffect, useState } from 'react';
import SummaryCard from '../components/Card/SummaryCard';
import Content from '../components/Content';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    position: "relative",
    height: "100px",
  },
  header: {
    display: "flex",
    position: "absolute",
    width: "calc(100%)",
    top: "-70px",
    alignItems: "flex-end",
    "& > *": {
      margin: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
    },
  },
  spacer: {
    flexGrow: "1",
  },
  avatar: {
    border: `3px solid white`,
    width: theme.spacing(13),
    height: theme.spacing(13),
    boxShadow: theme.shadows[3],
  },
  actionGroup: {
    display: "flex",
    width: "330px",
    justifyContent: "space-between",
    marginRight: 0,
  },
  summaryCards: {
    display: "flex",
    flexWrap: "wrap",
  },
  summaryCard: {
    margin: theme.spacing(1),
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  tripCard: {
    margin: theme.spacing(1),
    padding: theme.spacing(2),
  },
}));

export default function TutorDashboardScreen() {
  const { categoryName, totalEarnings, totalMeetings, hourlyRate, experience, averageRating, _id } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;
  const history = useHistory();
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [meetings, setMeetings] = useState([]);
  const [pendingMeetings, setPendingMeetings] = useState([]);
  const [activeMeetings, setActiveMeetings] = useState([]);
  const [attendedMeetings, setAttendedMeetings] = useState([]);

  const updateMeetingStatus = async (meetingID) => {

    //updating meeting status to attended
    const meetingStatus = {
      status: "attended"
    };

    try {
      await axios.put(`meetings/${meetingID}`, meetingStatus);
    } catch (err) {
      console.log(err.message);
    }

  };

  useEffect(() => {
    if (loading) {
      return (
        <Content>
          <CircularProgress />
        </Content>
      );
    }
  }, [loading]);

  useEffect(() => {
    if (_id) {
      const getAllMeetings = async () => {
        try {
          const res = await axios.get("meetings?userID=" + _id);
          const allMeetings = res.data;
          const pendingOnes = [];
          const activeOnes = [];
          const attendedOnes = [];
          allMeetings.forEach((meeting) => {
            //first check if meeting status is simply attended (no need to update the status as the meeting is a past meeting)
            if (meeting.status === 'attended') {
              attendedOnes.push(meeting);
            }
            //then check if a meeting is past meeting but status is still pending in the database, then push that meeting into attended ones and also update in the DB:
            else if (meeting.status === 'pending' && moment(meeting.endDate, "MMMM Do YYYY, h:mm:ss A").diff(moment()) < 5000) {
              attendedOnes.push(meeting);
              updateMeetingStatus(meeting._id);
            }
            //now check if meeting is a pending one but is an active one (no need to update the DB simply push it into active meetings array and mark it as active on frontend)
            else if (meeting.status === 'pending' && moment(meeting.startDate, "MMMM Do YYYY, h:mm:ss A").diff(moment()) < 5000 && moment(meeting.endDate, "MMMM Do YYYY, h:mm:ss A").diff(moment()) >= 5000) {
              activeOnes.push(meeting);
            }
            //then check if meeting is pending check if the start time is farther than now
            else if (meeting.status === 'pending' && moment(meeting.startDate, "MMMM Do YYYY, h:mm:ss A").diff(moment()) >= 5000) {
              pendingOnes.push(meeting);
            }
          });
          setMeetings(allMeetings);
          setPendingMeetings(pendingOnes);
          setActiveMeetings(activeOnes);
          setAttendedMeetings(attendedOnes);
        } catch (err) {
          console.log(err);
        }
      };
      getAllMeetings();
    } else {
      history.push('/signin');
    }
  }, [_id]);

  return (
    <Content>
      <div className={classes.summaryCards}>
        <SummaryCard title={"Tutor Of"} value={categoryName} />
        <SummaryCard title={"Total Earnings"} value={"$" + totalEarnings.toFixed(2)} />
        <SummaryCard title={"Hourly Rate"} value={"$" + hourlyRate} />
        <SummaryCard title={"Experience"} value={experience + " years"} />
        <SummaryCard title={"Active Meetings"} value={activeMeetings.length} />
        <SummaryCard title={"Upcoming Meetings"} value={pendingMeetings.length} />
        <SummaryCard title={"Attended Meetings"} value={attendedMeetings.length} />
        <SummaryCard title={"Total Meetings"} value={meetings.length} />
        <SummaryCard title={"Average Rating"} value={<Rating name="read-only" value={averageRating} readOnly />} />
      </div>
      <div className="mb-4"></div>

    </Content>
  );
}