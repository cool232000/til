// https://programmers.co.kr/learn/courses/30/lessons/12954

const solution = (x, n) => {
  const answer = [];
  for (let i = 1; i <= n; i++) {
    answer.push(x * i);
  }
  return answer;
};

console.log(solution(2, 5)); // [2, 4, 6, 8, 10]
console.log(solution(4, 3)); // [4, 8, 12]
console.log(solution(-4, 2)); // [-4, 8]
