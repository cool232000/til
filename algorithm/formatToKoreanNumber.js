/*
숫자를 한국어로 바꾸기
1. 0 이상 1조(1000000000000) 미만의 정수
2. 천 단위에 콤마를 찍는다
3. 만, 억 단위에 해당 단위를 삽입한다
4. 금액 사이는 한 칸을 띄운다
5. 주어진 숫자가 1000000이라면 100만으로 표기
6. 주어진 숫자가 1000001이라면 100만 1원으로 표기
7. 원은 마지막에 추가
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

const isZeroControl = koreanArray => {
  koreanArray.map(zeroControl =>
    zeroControl.map(
      (zero, idx) =>
        (zeroControl[idx] = (idx === 0 || zeroControl[idx - 1] === '') && zero === '0' ? '' : zero),
    ),
  );
};

const isInsetComma = koreanArray => {
  koreanArray.map(insertComma =>
    insertComma.map((num, idx) =>
      insertComma.length === 4 && insertComma[idx - 1] !== '' && idx === 1
        ? insertComma.splice(idx, 0, ',')
        : num,
    ),
  );
};

const isInsertUnit = (koreanArray, monetaryUnit) =>
  koreanArray.map((unitArray, idx) => unitArray.push(monetaryUnit[idx]));

const reArrange = koreanArray => {
  return koreanArray
    .reverse()
    .flat()
    .filter(blank => blank !== '');
};

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
