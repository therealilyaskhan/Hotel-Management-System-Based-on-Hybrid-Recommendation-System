import React from 'react';
const Video = ({ title }) => {
  return (
    <div className="bg-video">
      <video className="bg-video__content" autoPlay muted loop>
        <source src={`/img/${title}.mp4`} type="video/mp4" />
        <source src={`/img/${title}.webm`} type="video/webm" />
      </video>
    </div>
  );
};

export default Video;