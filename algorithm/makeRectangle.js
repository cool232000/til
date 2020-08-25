/*
문제 설명
직사각형을 만드는 데 필요한 4개의 점 중 3개의 좌표가 주어질 때, 나머지 한 점의 좌표를 구하려고 합니다. 점 3개의 좌표가 들어있는 배열 v가 매개변수로 주어질 때, 직사각형을 만드는 데 필요한 나머지 한 점의 좌표를 return 하도록 solution 함수를 완성해주세요. 단, 직사각형의 각 변은 x축, y축에 평행하며, 반드시 직사각형을 만들 수 있는 경우만 입력으로 주어집니다.

제한사항
v는 세 점의 좌표가 들어있는 2차원 배열입니다.
v의 각 원소는 점의 좌표를 나타내며, 좌표는 [x축 좌표, y축 좌표] 순으로 주어집니다.
좌표값은 1 이상 10억 이하의 자연수입니다.
직사각형을 만드는 데 필요한 나머지 한 점의 좌표를 [x축 좌표, y축 좌표] 순으로 담아 return 해주세요.

입출력 예
v
[[1, 4], [3, 4], [3, 10]]
result
[1, 10]

v
[[1, 1], [2, 2], [1, 2]]
result
[2, 1]

입출력 예 설명
입출력 예 #1
세 점이 [1, 4], [3, 4], [3, 10] 위치에 있을 때, [1, 10]에 점이 위치하면 직사각형이 됩니다.
입출력 예 #2
세 점이 [1, 1], [2, 2], [1, 2] 위치에 있을 때, [2, 1]에 점이 위치하면 직사각형이 됩니다.
*/

const makeRectangle = v => {
  const answer = [];
  const coordinateX = [];
  const coordinateY = [];

  for (let i = 0; i < v.length - 1; i++) {
    for (let j = 0; j < v.length; j++) {
      if (i === 0) {
        coordinateX.push(v[j][i]);
      } else {
        coordinateY.push(v[j][i]);
      }
    }
  }

  const copyX = coordinateX.filter((x, idx) => coordinateX.indexOf(x) === idx);
  const copyY = coordinateY.filter((y, idx) => coordinateY.indexOf(y) === idx);

  const answerArray = (array, coordinate) => {
    array.forEach(num => {
      let count = 0;
      if (coordinate === 'x') {
        coordinateX.map(dupleNum => dupleNum === num && count++);
        if (count <= 1) answer.push(num);
      } else {
        coordinateY.map(dupleNum => dupleNum === num && count++);
        if (count <= 1) answer.push(num);
      }
    });
  };

  answerArray(copyX, 'x');
  answerArray(copyY, 'y');

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

// 비트 연산자 활용
// lint에서는 비트 연산자를 사용하지 않을 것을 권함
const makeRectangleBitwise = v => {
  const answer = new Array(2);
  answer[0] = v[0][0] ^ v[1][0] ^ v[2][0];
  answer[1] = v[0][1] ^ v[1][1] ^ v[2][1];
  return answer;
};

console.log(
  makeRectangleBitwise([
    [1, 4],
    [3, 4],
    [3, 10],
  ]),
); // [1, 10]

console.log(
  makeRectangleBitwise([
    [1, 1],
    [2, 2],
    [1, 2],
  ]),
); // [2, 1]
