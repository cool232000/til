import React from 'react';

const Input = ({ input, handlechange, handleKeyPress }) => {
  return (
    <>
      <label htmlFor={input}>
        <span className="a11y-hidden">{input}</span>
        <input
          className={input}
          placeholder={input}
          onChange={() => handlechange(input)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
      </label>
    </>
  );
};

export default Input;
