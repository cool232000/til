function solution(s) {
  let answer = true;
  const str = s.toUpperCase();
  const pLength = [...str].filter((string) => string === 'P').length;
  const yLength = [...str].filter((string) => string === 'Y').length;
  answer = pLength === yLength ? answer : false;
  return answer;
}

console.log(solution('pPoooyY')); // true
console.log(solution('Pyy')); // false
console.log(solution('pip')); // false

