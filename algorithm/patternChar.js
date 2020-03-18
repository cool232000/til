// https://programmers.co.kr/learn/courses/30/lessons/12922

function solution(n) {
  let answer = '';
  for (let i = 0; i < n; i++) {
    answer += i % 2 ? '박' : '수';
  } return answer;
}

solution(3);
solution(4);
