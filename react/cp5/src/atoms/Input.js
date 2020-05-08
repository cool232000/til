import React from 'react';

const Input = ({ input, handlechange }) => {
  return (
    <>
      <label htmlFor={input}>
        <span className="a11y-hidden">{input}</span>
        <input
          className={input}
          placeholder={input}
          onChange={() => handlechange(input)}
        />
      </label>
    </>
  );
};

export default Input;
