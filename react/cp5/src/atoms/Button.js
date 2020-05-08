import React from 'react';
import './Button.css';

const Button = () => {
  const onClick = (e) => {
    e.preventDefault();
    alert('로그인 시도!');
  };
  return (
    <button type="submit" className="btn" onClick={onClick}>
      LogIn
    </button>
  );
};

export default Button;
