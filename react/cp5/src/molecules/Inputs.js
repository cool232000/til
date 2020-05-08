import React from 'react';
import Input from '../atoms/Input';
import './Inputs.css';

const Inputs = () => {
  const userInput = ['id', 'password'];
  return (
    <>
      {userInput.map((input, idx) => (
        <Input input={input} key={idx} />
      ))}
    </>
  );
};

export default Inputs;
