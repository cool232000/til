const makeRectangle = array => {
  const answer = [];
  const coordinateZero = [];
  const coordinateOne = [];

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length; j++) {
      if (i === 0) {
        coordinateZero.push(array[j][i]);
      } else {
        coordinateOne.push(array[j][i]);
      }
    }
  }

  const copyZero = coordinateZero.filter((zero, idx) => coordinateZero.indexOf(zero) === idx);
  const copyOne = coordinateOne.filter((one, idx) => coordinateOne.indexOf(one) === idx);

  copyZero.forEach(zeroNum => {
    let count = 0;
    coordinateZero.map(dupleNum => dupleNum === zeroNum && count++);
    if (count <= 1) answer.push(zeroNum);
  });

  copyOne.forEach(oneNum => {
    let count = 0;
    coordinateOne.map(dupleNum => dupleNum === oneNum && count++);
    if (count <= 1) answer.push(oneNum);
  });

  return answer;
};

console.log(
  makeRectangle([
    [1, 4],
    [3, 4],
    [3, 10],
  ]),
); // [1, 10]
console.log(
  makeRectangle([
    [1, 1],
    [2, 2],
    [1, 2],
  ]),
); // [2, 1]
