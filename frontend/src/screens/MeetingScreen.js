import { Box, makeStyles } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from 'react-router';
import { useEffect, useState } from 'react';

import Content from '../components/Content';
import axios from 'axios';
import CollapsibleTable from '../components/CollapsibleTable';
import moment from 'moment';

export default function MeetingScreen() {
  const { _id } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const history = useHistory();

  const [loading, setLoading] = useState(true);
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
          setLoading(false);
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
    <div>
      <Content>
        {
          loading ?
            <Box className="d-flex justify-content-center align-items-center" minHeight={320}>
              <CircularProgress />
            </Box>
            :
            <>
              <CollapsibleTable mb={true} type="Active" meetings={activeMeetings} />
              <CollapsibleTable mb={true} type="Upcoming" meetings={pendingMeetings} />
              <CollapsibleTable mb={false} type="Past" meetings={attendedMeetings} />
            </>
        }
      </Content>
    </div>
  );
}