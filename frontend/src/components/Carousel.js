import { Box } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

export default function Carousel({ recommendedTutors }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    arrows: true,
    slidesToScroll: 2
  };
  console.log(recommendedTutors);
  return (
    <Slider {...settings}>
      {
        recommendedTutors?.map(tutor =>
        (
          <div key={tutor.tutor._id} className="tutor__profile-container recommender">
            <div className="tutor__img-container recommender">
              <img src={"http://localhost:5000/" + tutor.tutor.imageURL} />
            </div>
            <Box mb={0.2}>
              <Rating name="read-only" precision={0.5} value={tutor.AR} readOnly />
            </Box>
            <Link to={{
              pathname: "/tutors/profile",
              tutorInfo: tutor.tutor
            }} className="tutor__info tutor__full-name recommender">{tutor?.tutor.firstName} {tutor?.tutor.lastName}</Link>
            <p className="tutor__info tutor__place recommender">
              <i className="fas fa-map-marker-alt"></i>
              {tutor?.tutor.city} {tutor?.tutor.country}
            </p>

          </div>
        )
        )
      }

    </Slider>
  );
}