/*
더치페이 알고리즘
금액을 사람 수 만큼 나누어 n등분한 값을 배열로 반환한다
n등분을 했을 때 나머지가 남는 경우 더치페이를 만든 사람(첫번째 사람)이 부담한다
금액은 반드시 사람 수보다 많다
*/

const dutchPayAmount = (peopleCount, amount) => {
  const answer = [];
  const calc = amount / peopleCount;
  const clearCalc = Math.floor(calc);
  const remainder = (calc % 1) * peopleCount;
  for (let i = 0; i < peopleCount; i++) {
    answer.push(calc % 1 ? (i === 0 ? Math.round(clearCalc + remainder) : clearCalc) : calc);
  }
  return answer;
};

console.log(dutchPayAmount(2, 2)); // [1, 1]
console.log(dutchPayAmount(3, 4)); // [2, 1, 1]
console.log(dutchPayAmount(10, 13500)); // [1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350, 1350]
console.log(dutchPayAmount(4, 11003)); // [2753, 2750, 2750, 2750]
console.log(dutchPayAmount(3, 9850)); // [3284, 3283, 3283]
