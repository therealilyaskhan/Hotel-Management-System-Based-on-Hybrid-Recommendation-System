import * as React from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CircularProgress from "@material-ui/core/CircularProgress";
import Countdown from 'react-countdown';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': { borderBottom: 'unset' }
  },
}));


function Row(props) {
  const { root, type } = useStyles(props);
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [tutorInfo, setTutorInfo] = React.useState(false);
  const [studentInfo, setStudentInfo] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [millisecondsLeft, setMillisecondsLeft] = React.useState(0);

  const fetchUsersInfo = async (tutorID, studentID) => {
    setOpen(!open);
    try {
      setLoading(true);
      const tutorRes = await axios.get("tutors/" + tutorID);
      const studentRes = await axios.get("students/" + studentID);
      setTutorInfo(tutorRes.data.data);
      setStudentInfo(studentRes.data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <TableRow className={root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => fetchUsersInfo(row.tutorID, row.studentID)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.startDate}
        </TableCell>
        <TableCell align="center">{row.venue.formattedAddress}</TableCell>
        <TableCell align="center">{type === "Active" ? "Ongoing" : row.status}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box>
              <Typography variant="h6" gutterBottom component="div">
                Details:
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Tutor</TableCell>
                    <TableCell>Hourly Charges</TableCell>
                    <TableCell>Time Left</TableCell>
                  </TableRow>
                </TableHead>
                {
                  loading ?
                    <Box className="d-flex p-2 justify-content-center align-items-center">
                      <CircularProgress size={20} />
                    </Box>
                    :
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {studentInfo.firstName} {studentInfo.lastName}
                        </TableCell>
                        <TableCell>{tutorInfo.firstName} {tutorInfo.lastName}</TableCell>
                        <TableCell>
                          {"$" + tutorInfo.hourlyRate.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Countdown date={Date.now() + moment(row.startDate, "MMMM Do YYYY, h:mm:ss A").diff(moment())} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                }
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ meetings, type, mb }) {
  return (
    <TableContainer className={mb ? "mb-5" : ""} component={Paper}>
      <Typography variant="h6" className="d-flex align-items-center justify-content-center py-3 table-title shadow-sm" fontSize={22}><span className="text-capitalize">{type} </span>&nbsp; Meetings</Typography>
      <Table aria-label="collapsible table">
        {
          meetings?.length ?
            <>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Meeting Time</TableCell>
                  <TableCell align="center">Meeting Place</TableCell>
                  <TableCell align="center">Meeting Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {meetings.map((meeting) => (
                  <Row key={meeting._id} row={meeting} type={type} />
                ))}
              </TableBody>
            </> :
            <Box className="d-flex justify-content-center align-items-center p-3">No {type} meetings found! {type == "Past" ? "You have not attended any meetings yet." : ""}</Box>
        }
      </Table>
    </TableContainer>
  );
}
