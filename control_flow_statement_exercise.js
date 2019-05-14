// 1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라
const x = 15;

if (x > 10 && x < 20) {
  console.log(x);
}


// 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
for (let i = 0; i < 10; i += 1) {
  if (i % 2 === 0)
  console.log(i);
}


// 3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.
let str = '';
for (let i = 0; i < 10; i += 1) {
  if (i % 2 === 0)
  str += i;
}
console.log(str);


// 4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
for (let i = 10; i > 0; i -= 1) {
  if (i % 2)
  console.log(i);
  }


// 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.
// num += 1은 증감식^^!
let num = 0;
while (num < 10) {
  if (num % 2 === 0) {
    console.log(num);
  }
  num += 1;
}


// 6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.
let num = 10;
while (num > 0) {
  if (num % 2 === 1) {
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
  if ((i % 2) && (i % 3)) {
  sum += i;
  }
}
console.log(sum);


// 9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오. // 117
// 조건: i % 2 === 0 || i % 3 === 0
let sum = 0;
for (let i = 1; i < 20; i += 1) {
  if ((i % 2 === 0) || (i % 3 === 0)) {
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


// 11. 삼각형 출력하기 - pattern 1
// 다음을 참고하여 *(별)로 높이가 5인(var line = 5) 삼각형을 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
// 높이(line)가 5
// *
// **
// ***
// ****
// *****
let stars = '';
for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j <= i; j += 1) {
    stars += '*';
  }
  stars += '\n';
}
console.log(stars);


// 12. 삼각형 출력하기 - pattern 2
// 다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
// *****
//  ****
//   ***
//    **
//     *
// 순차적으로 내려오고 if 문 사용하기
let stars = '';
for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j < 5; j += 1) {
    if (i > j) {
      stars += ' ';
    }
    else {
      stars += '*';
    }
  }
  stars += '\n';
}
console.log(stars);

// 거꾸로 내려오기
let stars = '';
for (let i = 5; i > 0; i -= 1) {
  for (let j = 5; j > 0; j -= 1) {
    if (i < j) {
      stars += ' ';
    }
    else {
      stars += '*';
    }
  }
  stars += '\n';
}
console.log(stars);



// 13. 삼각형 출력하기 - pattern 3
// 다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
// *****
// ****
// ***
// **
// *
// 거꾸로 내려오기
let stars = '';
for (let i = 5; i > 0; i -= 1) {
  for (let j = i; j > 0; j -= 1) {
    stars += '*';
  }
  stars += '\n';
}
console.log(stars);

// 순차적으로 시작하고 if 문 사용하기
let stars = '';
for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j < 5; j += 1) {
    if (i + j < 5) {
      stars += '*';
    }
    else {
      stars += ' ';
    }
  }
  stars += '\n';
}
console.log(stars);


// 14. 삼각형 출력하기 - pattern 4
// 다음을 참고하여 *(별)로 트리를 문자열로 완성하라. 개행문자(‘\n’)를 사용하여 개행한다. 완성된 문자열의 마지막은 개행문자(‘\n’)로 끝나도 관계없다.
//     *
//    **
//   ***
//  ****
// *****
let stars ='';
for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j < 5; j += 1) {
    if (i + j < 5-1) {
      stars += ' ';
    }
    else {
      stars += '*';
    }
  }
  stars += '\n';
}
console.log(stars);


// 15. 정삼각형 출력하기
//     *
//    ***
//   *****
//  *******
// *********
let stars ='';
for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j < 5; j += 1) {
    if (i + j < 5-1) {
      stars += ' ';
    }
    else {
      stars += '*';
    }
  }
  for (let j = 0; j < i; j += 1) {
    stars += '*';
  }
  stars += '\n';
}
console.log(stars);


// 16. 역정삼각형 출력하기
// *********
//  *******
//   *****
//    ***
//     *
let stars = '';
for (let i = 0; i < 5; i += 1) {
  for (let j = 0; j < 5; j += 1) {
    if (i > j) {
      stars += ' ';
    }
    else {
      stars += '*';
    }
  }
  for (let j = 4; j > i; j -= 1) {
    stars += '*';
  }
  stars += '\n';
}
console.log(stars);
