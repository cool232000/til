import React from 'react';
import './Fieldset.css';

const Fieldset = ({ children }) => {
  return (
    <fieldset>
      <legend>회원가입 폼</legend>
      {children}
    </fieldset>
  );
};

export default Fieldset;
