https://programmers.co.kr/learn/courses/30/lessons/12903

function solution(s) {
  return s.length % 2 ? s[parseInt(s.length / 2, 10)] : ((s[s.length / 2 - 1]) + (s[s.length / 2]));
}

console.log(solution('abcde')); // c
console.log(solution('qwer')); // we