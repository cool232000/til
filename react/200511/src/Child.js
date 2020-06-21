import React from 'react';

const Child = ({ lotto, children }) => {
  console.log(children);

  return (
    <>
      <p>자식 컴포넌트</p>
      {lotto.map((num, idx) => (
        <span key={idx}>{num} </span>
      ))}
      {children}
    </>
  );
};

export default Child;
