// https://programmers.co.kr/learn/courses/30/lessons/12931

const digitPlus = num => {
  const str = num + '';
  return [...str].reduce((acc, cur) => +acc + +cur, 0);
};

console.log(digitPlus(123)); // 6
console.log(digitPlus(987)); // 24
