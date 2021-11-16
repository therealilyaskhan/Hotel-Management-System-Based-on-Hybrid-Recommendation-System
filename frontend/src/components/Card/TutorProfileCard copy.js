function TutorProfileCard({ tutorInfo, tutorCity, tutorCountry, currentUserID }) {
  return (
    <div className="tutor__profile-container">
      <div className="tutor__img-container">
        <img src={"http://localhost:5000/" + tutorInfo.imageURL} />
      </div>
      <p className="tutor__info tutor__full-name">{tutorInfo.firstName} {tutorInfo.lastName}</p>
      <p className="tutor__info tutor__role">
        <i className="fas fa-star"></i>
        {tutorInfo.categoryName} Tutor
      </p>
      <p className="tutor__info tutor__place">
        <i className="fas fa-map-marker-alt"></i>
        {tutorCity} {tutorCountry}
      </p>

      <div className="tutor__posts-info">
        <p><span>336</span> Posts</p>
        <p><span>4300</span> Likes</p>
        <p><span>87</span> Works</p>
      </div>

      <button className="tutor__action">Schedule</button>
      <button className="tutor__action inbox">Message</button>
    </div>
  );
}

export default TutorProfileCard;
