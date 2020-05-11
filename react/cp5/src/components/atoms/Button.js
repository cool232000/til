import React from 'react';
import './Button.css';

const Button = ({ handleButtonClick }) => {
  return (
    <button type="button" className="btn" onClick={handleButtonClick}>
      LogIn
    </button>
  );
};

export default Button;
