import { makeStyles } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";
import Rating from '@material-ui/lab/Rating';
import { useEffect, useState } from 'react';
import SummaryCard from '../components/Card/SummaryCard';
import Content from '../components/Content';

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

export default function TutorDashboardScreen({ _id }) {
  const { categoryName, totalEarnings, totalMeetings, hourlyRate, experience, averageRating } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (loading) {
      return (
        <Content>
          <CircularProgress />
        </Content>
      );
    }
  }, [loading]);

  return (
    <Content>
      <div className={classes.summaryCards}>
        <SummaryCard title={"Tutor Of"} value={categoryName} />
        <SummaryCard title={"Total Earnings"} value={"$" + totalEarnings.toFixed(2)} />
        <SummaryCard title={"Hourly Rate"} value={"$" + hourlyRate} />
        <SummaryCard title={"Total Meetings"} value={totalMeetings} />
        <SummaryCard title={"Experience"} value={experience + " years"} />
        <SummaryCard title={"Average Rating"} value={<Rating name="read-only" value={averageRating} readOnly />} />
      </div>
      <div className="mb-4"></div>

    </Content>
  );
}