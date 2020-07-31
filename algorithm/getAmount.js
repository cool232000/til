/*
다양한 포맷으로 들어오는 금액 데이터 문자열에서 정확히 '금액'만 골라내어 숫자 타입으로 반환하는 함수 구현하기
1. 금액은 0 이상의 정수로만 주어진다고 가정한다 (소숫점을 포함하지 않음)
2. 입력으로 이루어지는 텍스트는 아래 문자를 포함한다
  2.1 숫자(0-9)
  2.2 달러($), 한국 원(₩)을 나타내는 특수문자
  2.3 콤마(,)
  2.4 알파벳 대문자(A-Z)
  2.5 한글
*/

const getAmount = text => {
  const num = text.replace(/[^0-9]/g, '') * 1;
  return num;
};

console.log(getAmount('1000')); // 1000
console.log(getAmount('$1,250')); // 1250
console.log(getAmount('5021USD')); // 5021
console.log(getAmount('3000KRW')); // 3000
console.log(getAmount('₩70200')); // 70200
console.log(getAmount('10950원')); // 10950
console.log(getAmount('32,000원')); // 32000
