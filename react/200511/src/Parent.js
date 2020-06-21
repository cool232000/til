import React, { useState, useRef } from 'react';
import Child from './Child';
import './App.css';

const Parent = () => {
  const [lotto, setLotto] = useState([0, 0, 0, 0, 0, 0]);
  const parentLotto = lotto;
  const inputRef = useRef();
  const makeLotto = () => {
    let drawLotto = [];
    for (let i = 0; i < 6; i++) {
      const num = Math.floor(Math.random() * 45) + 1;
      const duplicate = drawLotto.every((n) => n !== num);
      if (duplicate) {
        drawLotto.push(num);
      } else {
        i--;
      }
      drawLotto.sort((a, b) => a - b);
    }
    setLotto(drawLotto);
  };
  const changeInput = (e) => {
    console.log(e.target.value);
    console.log(inputRef);
  };
  return (
    <div className="App">
      <p>부모 컴포넌트</p>
      <button onClick={makeLotto}>추첨!</button>
      <input type="text" ref={inputRef} onChange={changeInput} />
      <h1>{parentLotto.map((lotto) => `${lotto} `)}</h1>
      <Child lotto={parentLotto}>
        <h1>자식의 자식</h1>
        <h2>자식의 자식의 자식</h2>
      </Child>
    </div>
  );
};

export default Parent;
