// https://programmers.co.kr/learn/courses/30/lessons/12912

function sumOfInteger(a, b) {
  let answer = 0;
  if (a <= b) {
    for (let i = a; i <= b; i++) {
      answer += i;
    }
  } else {
    for (let j = b; j <= a; j++) {
      answer += j;
    }
  }
  return answer;
}

console.log(sumOfInteger(3, 5));
console.log(sumOfInteger(3, 3));
console.log(sumOfInteger(5, 3));
