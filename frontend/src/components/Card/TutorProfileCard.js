function TutorProfileCard() {
  return (
    <div className="tutor__profile-container">
      <div className="tutor__img-container">
        <img src="./images/img.jpg" alt="profile image" />
      </div>
      <p className="tutor__info tutor__full-name">Marian McGrow</p>
      <p className="tutor__info tutor__role">
        <i className="fas fa-star"></i>
        UX/UI Developer
      </p>
      <p className="tutor__info tutor__place">
        <i className="fas fa-map-marker-alt"></i>
        Milan, Italy
      </p>

      <div className="tutor__posts-info">
        <p><span>336</span> Posts</p>
        <p><span>4300</span> Likes</p>
        <p><span>87</span> Works</p>
      </div>

      <button className="tutor__action">Follow</button>
      <button className="tutor__action inbox">Message</button>
    </div>
  );
}

export default TutorProfileCard;
