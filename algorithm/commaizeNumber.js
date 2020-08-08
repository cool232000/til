/*
숫자에 천(1,000) 단위로 콤마(,) 찍기
입력된 숫자에 천 단위로 콤마를 찍은 문자열을 반환한다
*/

// toLocaleString 메소드 사용하기
const commaizeNumberMethod = num => {
  return num.toLocaleString();
};

console.log(commaizeNumberMethod(1));
console.log(commaizeNumberMethod(1234));
console.log(commaizeNumberMethod(1234567));
console.log(commaizeNumberMethod(123456789));
console.log(commaizeNumberMethod(1234567890));
