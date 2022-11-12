import { Box, Typography } from '@material-ui/core';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Content from '../components/Content';

function MeetingRoom({ meeting }) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const joinMeetingHandler = async () => {
    if (meeting?.length) {
      //get customer and hotel info
      try {
        setLoading(true);
        const meetingInfo = meeting[0];
        const { hotelID, customerID } = meetingInfo;
        const hotelRes = await axios.get("hotels/" + hotelID);
        const customerRes = await axios.get("customers/" + customerID);
        const hotelInfo = hotelRes.data.data;
        const customerInfo = customerRes.data.data;
        setLoading(false);
        history.push({
          pathname: '/room',
          state: {
            hotelInfo,
            customerInfo,
            meetingInfo
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" minHeight={405} className={meeting ? "bg-black" : ""}>
      <Content>
        {
          meeting ?
            <Box className="d-flex justify-content-center align-items-center flex-column">
              <Typography className="mb-3" variant='h3' align='center' sx={{ py: 4 }}>
                <span className="text-capitalize text-info font-weight-bold">Welcome!</span>
              </Typography>
              <Typography variant="subtitle1" className="text-white" align='center'>
                You have {meeting.length} ongoing meeting in your virtual meeting room right now.
              </Typography>
              <Typography variant="subtitle1" className="text-white" align='center'>
                Please click the button below and join the meeting <span className="text-info font-weight-bold">NOW!</span>
              </Typography>
              <Box my={4}>
                <button onClick={joinMeetingHandler} className="btn btn-info btn-block mt-3">JOIN NOW</button>
              </Box>
            </Box> :
            <Box fontSize={25} minHeight={350} className="d-flex align-items-center justify-content-center">Silence here. No active meeting found!</Box>
        }
      </Content>
    </Box>
  );
}

export default MeetingRoom;
