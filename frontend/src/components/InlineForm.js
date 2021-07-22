import React from 'react';
const InlineForm = ({ placeholderText, labelText, buttonText }) => {
  return (
    <form className="form-inline">
      <div className="form-group">
        <label>{labelText ? labelText : ''}</label>
        <input type="text" className="form-control" placeholder={placeholderText ? placeholderText : ''} />
      </div>
      <button type="submit" className="btn btn-primary">{buttonText ? buttonText : 'Submit'}</button>
    </form>
  );
};

export default InlineForm;