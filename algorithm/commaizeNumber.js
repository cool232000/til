/*
숫자에 천(1,000) 단위로 콤마(,) 찍기
입력된 숫자에 천 단위로 콤마를 찍은 문자열을 반환한다
*/

// toLocaleString 메소드 사용하기
const commaizeNumberMethod = num => num.toLocaleString();

console.log(commaizeNumberMethod(1)); // 1
console.log(commaizeNumberMethod(1234)); // 1,234
console.log(commaizeNumberMethod(1234567)); // 1,234,567
console.log(commaizeNumberMethod(123456789)); // 123,456,789
console.log(commaizeNumberMethod(1234567890)); // 1,234,567,890

// 동일하게 동작하는 함수 만들기

const commaizeNumber = num => {
  const str = num + '';
  if (str.length < 4) return str;
  const commaizeArray = [...str];
  for (let i = str.length - 3; i > 0; i -= 3) {
    commaizeArray.splice(i, 0, ',');
  }
  const commaizeString = commaizeArray.join('');
  return commaizeString;
};

console.log(commaizeNumber(1)); // 1
console.log(commaizeNumber(12)); // 12
console.log(commaizeNumber(123)); // 123
console.log(commaizeNumber(1234)); // 1,234
console.log(commaizeNumber(12345)); // 12,345
console.log(commaizeNumber(123456)); // 123,456
console.log(commaizeNumber(1234567)); // 1,234,567
console.log(commaizeNumber(12345678)); // 12,345,678
console.log(commaizeNumber(123456789)); // 123,456,789
console.log(commaizeNumber(1234567890)); // 1,234,567,890
