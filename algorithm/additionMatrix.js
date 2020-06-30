/*
https://programmers.co.kr/learn/courses/30/lessons/12950
행렬의 덧셈은 행과 열의 크기가 같은 두 행렬의 같은 행, 같은 열의 값을 서로 더한 결과가 됩니다. 2개의 행렬 arr1과 arr2를 입력받아, 행렬 덧셈의 결과를 반환하는 함수, additionMatrix 완성해주세요.
*/

// Array.from을 활용한 방법
const additionMatrix = (arr1, arr2) => {
  const answer = Array.from(Array(arr1.length), () => Array().fill());
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr1[i].length; j++) {
      answer[i].push(arr1[i][j] + arr2[i][j]);
    }
  }
  return answer;
};

console.log(
  additionMatrix(
    [
      [1, 2],
      [2, 3],
    ],
    [
      [3, 4],
      [5, 6],
    ],
  ),
); // [[4,6],[7,9]]
console.log(additionMatrix([[1, 2]], [[3, 4]])); // [[4],[6]]
console.log(
  additionMatrix(
    [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    [
      [3, 4],
      [5, 6],
      [6, 7],
    ],
  ),
); // [[4,6],[7,9], [9, 11]]

// Array.map을 활용한 방법
const additionMatrixMap = (arr1, arr2) =>
  arr1.map((first, idx) => first.map((second, i) => second + arr2[idx][i]));

console.log(
  additionMatrixMap(
    [
      [1, 2],
      [2, 3],
    ],
    [
      [3, 4],
      [5, 6],
    ],
  ),
); // [[4,6],[7,9]]
console.log(additionMatrixMap([[1, 2]], [[3, 4]])); // [[4],[6]]
console.log(
  additionMatrixMap(
    [
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    [
      [3, 4],
      [5, 6],
      [6, 7],
    ],
  ),
); // [[4,6],[7,9], [9, 11]]
