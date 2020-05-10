import React from 'react';
import './Button.css';

const Button = ({ handleButtonClick }) => {
  return (
    <button
      type="submit"
      className="btn"
      onClick={(e) => handleButtonClick(e.preventDefault())}
    >
      LogIn
    </button>
  );
};

export default Button;
