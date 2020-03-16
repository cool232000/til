// https://programmers.co.kr/learn/courses/30/lessons/12932

function solution(n) {
  const string = (`${n}`).split('').reverse().map((str) => +str);
  const answer = string;
  return answer;
}

console.log(solution(12345)); // [5, 4, 3, 2, 1]
