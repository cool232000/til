// https://programmers.co.kr/learn/courses/30/lessons/12944

function solution(arr) {
  const sum = arr.reduce((a, b) => a + b);
  return sum / arr.length;
}
  
console.log(solution([1, 2, 3, 4]));
console.log(solution([5, 5]));
  