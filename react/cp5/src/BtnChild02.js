import React, { Component } from 'react';

const ButtonChild02 = ({ title, color }) => {
  const ButtonStyle = {
    border: 'none',
    width: 100,
    height: 30,
    background: color,
  };
  return <button style={ButtonStyle}>{title}</button>;
};

export default ButtonChild02;
