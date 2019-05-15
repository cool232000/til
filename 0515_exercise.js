// 1. 짝수와 홀수
// evenOrOdd 함수는 정수 num을 매개변수로 받는다. num은 1이상의 정수이며, num이 음수인 경우는 없다. num이 짝수일 경우 'Even'을 반환하고 홀수인 경우 'Odd'를 반환하도록 evenOrOdd 함수를 완성하라.

// 단, if문을 사용한 답과 3항 연산자를 사용하는 답 두가지를 제시하여야 한다.

// if 문

function evenOrOdd(num) {
  if (num % 2 === 0) {
    return 'Even';
  }
  else {
    return 'Odd';
  }
}

console.log(evenOrOdd(2));
console.log(evenOrOdd(3));
console.log(evenOrOdd(1000));

// 삼항조건연산자
function evenOrOdd(num) {
  return num % 2 ? 'Odd' : 'Even';
}

console.log(evenOrOdd(2));
console.log(evenOrOdd(3));
console.log(evenOrOdd(1000));


// 2. 1 ~ 10,000의 숫자 중 8이 등장하는 횟수 구하기 (Google)
// 1부터 10,000까지 8이라는 숫자가 총 몇번 나오는가? 이를 구하는 함수를 완성하라.

// 단, 8이 포함되어 있는 숫자의 갯수를 카운팅 하는 것이 아니라 8이라는 숫자를 모두 카운팅 해야 한다. 예를 들어 8808은 3, 8888은 4로 카운팅 해야 한다.

// (hint) 문자열 중 n번째에 있는 문자 : str.charAt(n) or str[n]

function getCount8 () {
  let str = '';
  let sum = 0;

  for (let i = 0; i < 10001; i++) {
    str += i;
  }
  // console.log(str);
  for (let j = 0; j < str.length; j++) {
    if (str[j] === '8') ++sum;
  }
  return sum;
}


// 2중 for 문
function getCount8 () {
  let sum = 0;
  for (let i = 0; i < 10001; i++) {
    let str = i + '';
    for (let j = 0; j < str.length; j++) {
      if (str[j] === '8') {
        sum += 1;
      }
    }
  }
  return sum;
}

console.log(getCount8()); // 4000

// 1부터 10,000까지의 숫자를 문자열로 바꿔서
// 나열된 문자열에서 8을 카운트

// for문을 0부터 10,001까지 돌림
// 문자열로 다 붙임

// 3. 문자열 다루기
// alphaString46 함수는 문자열 s를 매개변수로 입력받는다. s의 길이가 4 ~ 6이고, 숫자로만 구성되어 있는지 확인하는 alphaString46 함수를 완성하라.

// 예를 들어 s가 'a234'이면 false를 리턴하고 '1234'라면 true를 리턴한다.


function alphaString46(s) {
  if (isNaN(s) === false) {
    if (s.length > 3 && s.length < 7) {
      return true
    }
    return false
  }
  return false
}



function alphaString46(s) {
  return !(isNaN(s)) ? (s.length > 3 && s.length < 7) : false;
}
console.log(alphaString46('1234')); // true
console.log(alphaString46('9014')); // true
console.log(alphaString46('723'));  // false
console.log(alphaString46('a234')); // false
console.log(alphaString46(''));     // false
console.log(alphaString46());       // false
