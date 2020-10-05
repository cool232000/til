// https://programmers.co.kr/learn/courses/30/lessons/12910

function solution(arr, divisor) {
  const sortArr = arr.sort((a, b) => a - b);
  return sortArr.every(array => array % divisor)
    ? [-1]
    : sortArr.filter(array => array % divisor === 0);
}

console.log(solution([5, 9, 7, 10], 5)); // [ 5, 10 ]
console.log(solution([2, 36, 1, 3], 1)); // [ 1, 2, 3, 36 ]
console.log(solution([3, 2, 6], 10)); // [ -1 ]
