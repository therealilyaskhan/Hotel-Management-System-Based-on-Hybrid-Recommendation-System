import { Container, Paper } from '@material-ui/core';
import StepForm from '../components/stepform/StepForm';
import { useLocation } from 'react-router-dom';

function ScheduleMeetingScreen() {
  const location = useLocation();

  const { tutorInfo, studentInfo } = location.state;

  return (
    <Container className="my-4" component='main' maxWidth="xl">
      <Paper className="px-0 py-3 mt-4" variant='elevation' >
        <StepForm tutorInfo={tutorInfo} studentInfo={studentInfo} />
      </Paper>
    </Container>
  );
}

export default ScheduleMeetingScreen;
