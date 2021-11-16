import { makeStyles } from '@material-ui/core';
import CircularProgress from "@material-ui/core/CircularProgress";

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
  minHeight: {
    height: 405
  }
}));

export default function StudentDashboardScreen({ _id }) {
  const { totalExpenditures, totalMeetings } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const classes = useStyles();

  const [loading, setLoading] = useState(false);


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
    <div className={classes.minHeight}>
      <Content>
        <div className={classes.summaryCards}>
          <SummaryCard title={"Total Amount Spent"} value={"$" + totalExpenditures.toFixed(2)} />
          <SummaryCard title={"Total Meetings"} value={totalMeetings} />
        </div>
      </Content>
    </div>
  );
}