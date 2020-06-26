/*
https://programmers.co.kr/learn/courses/30/lessons/12945
17. 피보나치 수
피보나치 수는 0과 1로 시작하며, 다음 피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다. 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946…
2 이상의 n이 입력되었을 때, n번째 피보나치 수를 반환하는 fibonacci 함수를 작성하라. 예를 들어 n = 3이라면 2를 반환한다.
*/

/*
프로그래머스 level 2
2 이상의 n이 입력되었을 때, n번째 피보나치 수를 1234567으로 나눈 나머지를 리턴하는 함수, fibonacci를 완성해 주세요.
*/
const fibonacci = n => {
  let [i, j, f] = [0, 1, 1];
  for (let k = 2; k <= n; k++) {
    f = (i + j) % 1234567;
    i = j;
    j = f;
  }
  return f;
};

console.log(fibonacci(2)); // 1
console.log(fibonacci(3)); // 2
console.log(fibonacci(4)); // 3
console.log(fibonacci(5)); // 5
console.log(fibonacci(6)); // 8

// 재귀함수 사용해서 피보나치 수열 풀기
const recursiveFibonacci = n => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return recursiveFibonacci(n - 2) + recursiveFibonacci(n - 1);
};

console.log(recursiveFibonacci(2)); // 1
console.log(recursiveFibonacci(3)); // 2
console.log(recursiveFibonacci(4)); // 3
console.log(recursiveFibonacci(5)); // 5
console.log(recursiveFibonacci(6)); // 8
