/*
나이를 숫자로 입력받고 10년 단위로 구분된 연령대를 문자열로 반환하는 함수 구현하기
1. age는 0 이상 120 이하의 정수
2. age가 10세 미만인 경우 '10대 미만'을 리턴
3. age가 90세 이상일 경우 '90대 이상'을 리턴
*/

const printAgeGroup = age => {
  const strAge = age + '';
  if (age < 10) {
    return '10대 미만';
  }
  if (age >= 90) {
    return '90대 이상';
  }
  return `${strAge[0]}0대`;
};

console.log(printAgeGroup(23)); // 20대
console.log(printAgeGroup(13)); // 10대
console.log(printAgeGroup(100)); // 90대 이상
console.log(printAgeGroup(8)); // 10대 미만
