const calculate = ({ type, operands }) => {
  if (type === 'add') {
    return operands.reduce((acc, cur) => acc + cur, 0);
  }
  return operands.reduce((acc, cur) => acc * cur, 1);
};

console.log(calculate({ type: 'add', operands: [1, 2] })); // 3
console.log(calculate({ type: 'multiply', operands: [1, 2, 3] })); // 6
console.log(calculate({ type: 'add', operands: [2, 3, 4] })); // 9
console.log(calculate({ type: 'multiply', operands: [9, 2, 3] })); // 54
console.log(calculate({ type: 'add', operands: [100, 120, 2] })); // 222
console.log(calculate({ type: 'add', operands: [0, 2] })); // 2
