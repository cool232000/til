import React from 'react';
import './Form.css';

const Form = ({ children }) => {
  return <form className="form-container">{children}</form>;
};

export default Form;
