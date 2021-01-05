/*
숫자를 한국어로 바꾸기
만약 주어진 숫자가 1000000이라면 이것을 100만으로 바꾸어 문자열을 반환하는 함수를 작성한다
숫자는 0 이상 1조(1000000000000) 미만의 정수이다
백, 십, 일 단위는 무시하고 천 단위에는 콤마를 찍는다
금액 사이는 한 칸 띄우고 0이 아닌 숫자가 나올 때까지 0은 표기하지 않도록 한다
*/

/*
문자열로 변환한 numberToStr를 numberToStr의 length에서 4를 뺀 숫자가 0이 될 때까지
4만큼의 간격으로 반복문을 돌려 한 바퀴 돌 때마다 i 만큼 잘린 숫자를 빈 배열에 삽입
-> 가장 뒤쪽에 있는 자릿수를 제외한 자릿수가 뒤집혀서 삽입됨
예) 987654321의 경우 [3, 2, 1, 0], [7, 6, 5, 4] 순으로 들어가고 [9, 8]은 spliceArray 남아있음
이후 네자리를 충족하지 못한 나머지 배열을 추가
*/
const numToNuArray = num => {
  const numberToStr = num + '';
  let nuArray = [];
  const spliceArray = [...numberToStr];
  for (let i = numberToStr.length - 4; i > 0; i -= 4) {
    nuArray.push(spliceArray.splice(i));
  }

  nuArray.push(spliceArray);

  return nuArray;
};

/*
  koreanArray에서 인덱스가 0이거나 바로 앞 인덱스의 값이 빈 문자열이면서
  현재 인덱스 값이 '0'인 경우, 현재 인덱스 값을 빈 문자열로 바꾸고 아닌 경우 값을 그대로 리턴
  0번 인덱스부터 0일 때와 바로 앞자리가 0인 경우를 걸러낼 수 있다
  */
const isZeroControl = koreanArray => {
  koreanArray.map(zeroControl =>
    zeroControl.map(
      (zero, idx) =>
        (zeroControl[idx] = (idx === 0 || zeroControl[idx - 1] === '') && zero === '0' ? '' : zero),
    ),
  );
};

/*
  4개의 length를 갖는 배열의 첫번째 자릿수 뒤에 쉼표 찍기
  조건: length가 4이고 현재 인덱스의 앞자릿 수가 빈 문자열이 아니면서 현재 인덱스가 1인 경우 현재 인덱스 앞에 콤마 찍기
  */
const isInsetComma = koreanArray => {
  koreanArray.map(insertComma =>
    insertComma.map((num, idx) =>
      insertComma.length === 4 && insertComma[idx - 1] !== '' && idx === 1
        ? insertComma.splice(idx, 0, ',')
        : num,
    ),
  );
};

// 돈 단위 추가
const isInsertUnit = (koreanArray, monetaryUnit) =>
  koreanArray.map((unitArray, idx) => unitArray.push(monetaryUnit[idx]));

const reArrange = koreanArray => {
  return koreanArray
    .reverse()
    .flat()
    .filter(blank => blank !== '');
};

// 돈 단위 뒤에 이어지는 숫자가 있다면 빈 칸 삽입
const isInsertBlank = (monetaryUnit, koreanArray) => {
  monetaryUnit.map(unit =>
    koreanArray.map(
      (korean, idx) =>
        (koreanArray[idx] =
          unit === korean && koreanArray[idx + 1] !== undefined ? `${korean} ` : `${korean}`),
    ),
  );
};

const formatToKoreaWon = num => {
  const monetaryUnit = ['', '만', '억'];
  let formatKorean = '';
  let koreanArray = numToNuArray(num);
  isZeroControl(koreanArray);
  isInsetComma(koreanArray);
  isInsertUnit(koreanArray, monetaryUnit);
  koreanArray = reArrange(koreanArray);
  isInsertBlank(monetaryUnit, koreanArray);
  formatKorean = `${koreanArray.join('')}원`;
  return formatKorean;
};

console.log(formatToKoreaWon(9876543210)); // 98억 7,654만 3,210원
console.log(formatToKoreaWon(123456789010)); // 1,234억 5,678만 9,010원
console.log(formatToKoreaWon(1230401)); // 123만 401원
console.log(formatToKoreaWon(12340012)); // 1,234만 12원
console.log(formatToKoreaWon(12340123)); // 1,234만 123원
console.log(formatToKoreaWon(123401234)); // 1억 2340만 1234원
console.log(formatToKoreaWon(123)); // 123원
console.log(formatToKoreaWon(10000)); // 1만원
console.log(formatToKoreaWon(1000000)); // 100만원
