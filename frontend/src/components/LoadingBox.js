import React from 'react';
const LoadingBox = (props) => {
  return (
    <div>
      <i className="fa fa-spinner fa-spin"></i> {props.msg || 'Loading...'}
    </div>
  );
};

export default LoadingBox;