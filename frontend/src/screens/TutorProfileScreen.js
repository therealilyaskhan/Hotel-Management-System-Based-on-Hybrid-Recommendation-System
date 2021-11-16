import axios from 'axios';
import React, { useEffect, useState } from 'react';
import moment from 'moment';

import LoadingBox from '../components/LoadingBox';

function TutorProfileScreen() {
  const tutorInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false;

  const [tutorLocation, setTutorLocation] = useState(localStorage.getItem('userLocation') ? JSON.parse(localStorage.getItem('userLocation')) : false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        if (!tutorLocation) {
          const res = await axios.get("locations/" + tutorInfo._id);
          localStorage.setItem('userLocation', JSON.stringify(res.data.data));
          setTutorLocation(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getLocation();
  }, []);

  const imageUpdateHandler = async (event) => {
    try {
      const image = event.target.files[0];
      const files = new FormData();
      files.append('image', image);
      const res = await axios.put(`tutors/${tutorInfo._id}/image`, files, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const data = res.data.data;
      if (data) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        window.location.reload();
      }

    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="page-content page-container minus-240" id="page-content">
      <div className="padding">
        <div className="row container d-flex justify-content-center mx-auto">
          <div className="col-xl-12 col-md-12">
            {
              tutorInfo ?
                <div className="card user-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25 mx-auto w-50"> <img src={"http://localhost:5000/" + tutorInfo.imageURL} className="img-radius w-100" alt="User-Profile-Image" /> </div>
                        <div>
                          <label htmlFor="files" className="btn btn-primary btn-sm" role="button">Update Profile Image</label>
                          <input id="files" name="image" style={{ visibility: "hidden" }} type="file" onChange={imageUpdateHandler} />
                        </div>
                        <h6 className="f-w-600 text-uppercase">{tutorInfo.firstName} {tutorInfo.lastName}</h6>
                        <p>Tutor</p> <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h6 className="text-muted f-w-400">{tutorInfo.email}</h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Registered with us</p>
                            <h6 className="text-muted f-w-400">{moment(tutorInfo.createdAt).fromNow()}</h6>
                          </div>
                        </div>
                        <div className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></div>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">First Name</p>
                            <h6 className="text-muted f-w-400">{tutorInfo.firstName}</h6>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Last Name</p>
                            <h6 className="text-muted f-w-400">{tutorInfo.lastName}</h6>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Description: </p>
                            <h6 className="text-muted f-w-400">{tutorInfo.description}</h6>
                          </div>
                        </div>
                        <div className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600"></div>
                        {
                          tutorLocation ?
                            <div className="row">
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Street Address</p>
                                <h6 className="text-muted f-w-400">{tutorLocation.formattedAddress}</h6>
                              </div>
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Zip Code</p>
                                <h6 className="text-muted f-w-400">{tutorLocation.zipcode}</h6>
                              </div>
                            </div> :
                            <div className="row">
                              <div className="col-sm-6">
                                <p className="m-b-10 f-w-600">Location Information: </p>
                                <h6 className="text-muted f-w-400">No Location Info Available to Show (Goto Map to Set your permanent location)</h6>
                              </div>
                            </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                :
                <LoadingBox />
            }
          </div>
        </div>
      </div>
    </div >
  );
}

export default TutorProfileScreen;
