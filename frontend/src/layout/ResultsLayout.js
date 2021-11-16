import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CircularProgress } from '@material-ui/core';

function ResultsLayout(props) {
  const location = useLocation();

  const tutorIDs = location.tutorIDs;
  const [tutorsData, setTutorsData] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <Box>
      {
        !tutorIDs?.length ?
          'no tutors found against your searched term... Please click here to try again!' :
          !tutorsData ?
            <CircularProgress />
            :
            'here is your tutors data'
      }
    </Box>
  );
}

export default ResultsLayout;
