import React from 'react';
const Footer = () => {
  return (
    <footer className="footer py-4">
      <div className="container">
        <div className="row">
          <div className="col py-4 text-center">
            <h3 className="text-white font-weight-light">
              TutorPerHour
          </h3>
            <p className="d-block text-white-50">copyright &copy; Muhammad Ilyas & Khizer Rehman <span className="d-block text-white mt-1">{new Date().toISOString().slice(0, 10)}</span> </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;