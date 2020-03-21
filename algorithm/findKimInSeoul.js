// https://programmers.co.kr/learn/courses/30/lessons/12919

function solution(seoul) {
  const idx = seoul.indexOf('Kim');
  return `김서방은 ${idx}에 있다`;
}

console.log(solution(['Lee', 'Choi', 'Kim'])); // 김서방은 2에 있다
