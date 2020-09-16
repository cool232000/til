/*
교환 가능한 배열을 제외한 배열의 갯수
[[1, 2], [2, 1], [3, 3], [4, 5], [5, 6], [7, 8]]
라고 생긴 이중 배열이 주어졌을 때
[1, 2]에서의 1은 [2, 1]에서의 1과 [1, 1]이라는 하나의 배열을 만들 수 있다
[3, 3] 처럼 같은 숫자로 만들어진 배열은 교환하지 않는다
[4, 5]와 [5, 6]은 [5, 5]라는 배열만 만들 수 있다
이중 배열의 갯수 중에서 동일한 숫자로 구성된 배열의 갯수를 제외한 나머지 갯수를 구하는 문제
*/

const interchangeable = matrix => {
  const array = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const criteria = matrix[i];
      const coordinate = matrix.filter(line => line !== matrix[i]);
      for (let k = 0; k < coordinate.length; k++) {
        if (j === 0) {
          if (criteria[j] === criteria[j + 1]) {
            array.push([criteria[j], criteria[j]]);
            criteria.shift(criteria[j]);
          }
          if (criteria[j] === coordinate[k][j + 1]) {
            array.push([criteria[j], criteria[j]]);
            criteria[j] = 0;
          }
        } else if (criteria[j] === coordinate[k][j - 1]) {
          array.push([criteria[j], criteria[j]]);
          criteria[j] = 0;
        }
      }
    }
  }
  return matrix.length - array.length;
};

console.log(
  interchangeable([
    [1, 2],
    [2, 1],
    [3, 3],
    [4, 5],
    [5, 6],
    [7, 8],
  ]),
);

console.log(
  interchangeable([
    [1, 2],
    [3, 4],
    [5, 6],
  ]),
);

console.log(
  interchangeable([
    [1, 2],
    [2, 3],
    [3, 1],
  ]),
);
