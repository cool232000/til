/*
숫자를 한국어로 바꾸기
만약 주어진 숫자가 1000000이라면 이것을 100만으로 바꾸어 문자열을 반환하는 함수를 작성한다
숫자는 0 이상 1조(1000000000000) 미만의 정수이다
백, 십, 일 단위는 무시하고 천 단위에는 콤마를 찍는다
*/

const formatToKoreanNumber = num => {
  const str = num + '';
  let arr = [];
  const array = [...str];
  for (let i = str.length - 4; i > 0; i -= 4) {
    // array.splice(i, 0, 0);
    arr.push(array.splice(i));
  }
  console.log(arr.reverse());
  arr.unshift(array);
  console.log(array);
  console.log(arr);
  console.log(str);
  console.log(arr.map(s => (s.every(string => string === '0') ? [''] : s)));
};

console.log(formatToKoreanNumber(9876543210)); // 98억7,654만3,210
console.log(formatToKoreanNumber(123456789010)); // 1,234억5,678만9,010
console.log(formatToKoreanNumber(123)); // 123
console.log(formatToKoreanNumber(10000)); // 1만
console.log(formatToKoreanNumber(1000000)); // 100만
