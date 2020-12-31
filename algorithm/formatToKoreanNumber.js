/*
숫자를 한국어로 바꾸기
만약 주어진 숫자가 1000000이라면 이것을 100만으로 바꾸어 문자열을 반환하는 함수를 작성한다
숫자는 0 이상 1조(1000000000000) 미만의 정수이다
백, 십, 일 단위는 무시하고 천 단위에는 콤마를 찍는다
금액 사이는 한 칸 띄우고 0이 아닌 숫자가 나올 때까지 0은 표기하지 않도록 한다
*/

const formatToKoreanNumber = num => {
  const monetaryUnit = ['', '만 ', '억 '];
  const numberToStr = num + '';
  let koreanArray = [];
  const spliceArray = [...numberToStr];

  // num을 4개씩 분할해서 빈 배열에 삽입
  for (let i = numberToStr.length - 4; i > 0; i -= 4) {
    koreanArray.push(spliceArray.splice(i));
  }
  koreanArray.push(spliceArray);

  koreanArray = koreanArray.map(zeroArray =>
    zeroArray.every(zero => zero === '0') ? [''] : zeroArray,
  );
  koreanArray.map(comma =>
    comma.map((c, idx) => (comma.length === 4 && idx === 1 ? comma.splice(idx, 0, ',') : comma)),
  );
  koreanArray.map((unitArray, idx) => unitArray.push(monetaryUnit[idx]));
  koreanArray = koreanArray.reverse().flat().join('');
  return koreanArray;
};

console.log(formatToKoreanNumber(9876543210)); // 98억 7,654만 3,210
console.log(formatToKoreanNumber(123456789010)); // 1,234억 5,678만 9,010
console.log(formatToKoreanNumber(12340123)); // 1,234억만 123
console.log(formatToKoreanNumber(123)); // 123
console.log(formatToKoreanNumber(10000)); // 1만
console.log(formatToKoreanNumber(1000000)); // 100만
