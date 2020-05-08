import React from 'react';

const Input = ({ input }) => {
  const onChange = ({ target }) => {
    if (target.matches('.id')) {
      console.log('사용자 아이디 입력 중...');
    } else {
      console.log('사용자 패스워드 입력 중...');
    }
  };
  return (
    <>
      <label htmlFor={input}>
        <span className="a11y-hidden">{input}</span>
        <input className={input} placeholder={input} onChange={onChange} />
      </label>
    </>
  );
};

export default Input;
