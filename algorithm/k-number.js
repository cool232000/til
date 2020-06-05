// https://programmers.co.kr/learn/courses/30/lessons/42748

const solution = (array, commands) => {
  let answer = [];
  answer = answer.concat(
    ...commands.map(num => array.slice(num[0] - 1, num[1]).sort((a, b) => a - b)[num[2] - 1]),
  );
  return answer;
};

solution(
  [1, 5, 2, 6, 3, 7, 4],
  [
    [2, 5, 3],
    [4, 4, 1],
    [1, 7, 3],
  ],
); // [5, 6, 3]
