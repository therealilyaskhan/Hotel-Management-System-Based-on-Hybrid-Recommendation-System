import MultipleValueTextInput from 'react-multivalue-text-input';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import axios from 'axios';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
  label: {
    marginTop: -22,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 400,
    color: '#011627'
  }
}));

const HotelMoreInfoScreen = (props) => {
  const { firstName, _id, categoryID } = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const categories = [
    { value: "science", label: "Science", id: 1 },
    { value: "design", label: "Design", id: 2 },
    { value: "development", label: "Development", id: 3 },
    { value: "religious", label: "Religious", id: 4 },
    { value: "marketing", label: "Marketing", id: 5 },
    { value: "personal", label: "Personal Development", id: 6 },
    { value: "business", label: "Business", id: 7 },
    { value: "music", label: "Music", id: 8 },
    { value: "photography", label: "Photography", id: 9 },
    { value: "arts", label: "Arts", id: 10 },
    { value: "language", label: "Language", id: 11 },
    { value: "elementary", label: "Elementary Education", id: 12 },
    { value: "maths", label: "Mathematics", id: 13 },
    { value: "ecommerce", label: "E-commerce", id: 14 },
  ];
  const [category, setCategory] = useState('science');

  useEffect(() => {
    if (!_id) {
      props.history.push('/hotels/signup');
    } else if (categoryID) {
      props.history.push('/hotels/dashboard/profile');
    }
  }, [props.history, _id]);

  const handleChange = (event) => {
    setCategory(event.target.value || '');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const onCourseAdded = (course, allCourses) => {
    setCourses(allCourses);
  };

  const onCourseDeleted = (course, allCourses) => {
    setCourses(allCourses);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let categoryID;
    categories.forEach((c) => {
      if (c.value === category)
        categoryID = c.id;
    });

    if (category && categoryID && courses.length) {
      //posting courses information to courses and teachings api first
      courses.forEach(async (courseName) => {

        try {
          setLoading(true);
          //posting to courses
          await axios.post("/courses", { title: courseName });
          //posting to teaches api now to associate courses with hotels
          await axios.post('/teaches', {
            hotelID: _id,
            course: courseName
          });
        } catch (err) {
          setLoading(false);
          setError(err.message);
        }

      });

      //updating hotel with category name and categoryID info
      const hotelInfo = {
        categoryName: category,
        categoryID: categoryID
      };

      try {
        setLoading(true);
        const res = await axios.put(`hotels/${_id}`, hotelInfo);
        const data = res.data.data;
        if (data) {
          localStorage.setItem('userInfo', JSON.stringify(data));
          props.history.push('/hotels/dashboard/profile');
          setLoading(false);
        }

      } catch (err) {
        setLoading(false);
        setError(err.message);
      }
    }
  };

  return (
    <div className="h-75">
      <Box className="extra-info-text bg-info h-25 d-flex align-items-center justify-content-center mb-5">Hi, {firstName}! We would need some extra info from you to finalize your hotel registration process.</Box>
      <Box className="text-center my-5"><a className="btn btn-primary btn-lg" onClick={handleClickOpen}>Click Here & Fill in the Information</a></Box>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose} fullWidth >
        <DialogTitle>Fill the details please!</DialogTitle>
        {loading && <LoadingBox msg={`Uploading your data! Please wait...`} />}
        {error && <MessageBox msg={error} variant='danger'></MessageBox>}
        <DialogContent>
          <Box component="form">
            <FormControl variant='standard' fullWidth margin='normal' required>
              <InputLabel shrink className={classes.label} variant="standard" htmlFor="demo-dialog-native">Which category your skills fall in ?</InputLabel>
              <Select
                native
                value={category}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                {
                  categories.map((c) => {
                    return (
                      <option value={c.value} key={c.id} data-id={c.id}>{c.label}</option>
                    );
                  })
                }
              </Select>
            </FormControl>
            <FormControl className="mt-2" fullWidth margin='normal' required variant='standard'>
              <MultipleValueTextInput
                className={courses.length > 2 ? "multiple-value-text-input" : ""}
                disabled={courses.length > 2 ? true : false}
                onItemAdded={onCourseAdded}
                onItemDeleted={onCourseDeleted}
                label="Which courses would you like to teach on our platform ?"
                name="item-input"
                placeholder={courses.length > 2 ? "No more than 3 courses" : "Enter whatever courses you want; separate them with COMMA or ENTER."}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
};

export default withRouter(HotelMoreInfoScreen);