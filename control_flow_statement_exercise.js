// 1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라
const x = 15;

if (x > 10 && x < 20) {
  console.log(x);
}


// 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
for (let i = 0; i < 10; i += 2) {
  console.log(i);
}


// 3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.
// to.String은 배열처럼 출력 안 됨
let str = '';
for (let i = 0; i < 10; i += 2) {
  str += i;
}
console.log(str);


// 4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
// reverse는 배열의 순서를 거꾸로 뒤집을 때 사용
for (let i = 10; i > 0; i -= 1) {
  if(i % 2)
  console.log(i);
  }


// 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
// num += 1은 증감식^^!
let num = 0;
while (num < 10) {
  if(num % 2 === 0) {
    console.log(num);
  }
  num += 1;
}


// 6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
let num = 10;
while (num > 0) {
  if(num % 2 === 1){
    console.log(num);
  }
  num -= 1;
}


// 7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오. // 45
let sum = 0;
for (let i = 0; i < 10; i += 1) {
  sum += i;
}
console.log(sum);


// 8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오. // 73
// 조건: i % 2 === 1 && i % 3 === 1
let sum = 0;
for (let i = 1; i < 20; i += 1) {
  if((i % 2) && (i % 3)) {
  sum += i;
  }
}
console.log(sum);


// 9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오. // 117
// 조건: i % 2 === 0 || i % 3 === 0
let sum = 0;
for (let i = 1; i < 20; i += 1) {
  if((i % 2 === 0) || (i % 3 === 0)) {
  sum += i;
  }
}
console.log(sum);


// 10. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.
for (let i = 1; i < 7; i += 1) {
  for (let j = 1; j < 7; j += 1) {
    if (i + j === 6)
    console.log(i, j)
  }
}
