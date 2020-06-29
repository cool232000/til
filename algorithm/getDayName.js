/*
27. 요일 구하기
2016년 1월 1일은 금요일이다. 2016년 a월 b일은 무슨 요일일까? 두 수 a, b를 입력받아 a월 b일이 무슨 요일인지 출력하는 getDayName 함수를 완성하라.
요일의 이름은 일요일부터 토요일까지 각각 SUN, MON, TUE, WED, THU, FRI, SAT를 출력한다. 예를 들어 a=5, b=24가 입력된다면 5월 24일은 화요일이므로 TUE를 반환한다.
*/

const getDayName = (a, b) => {
  const year = 2016;
  const baseDate = new Date(`${a} ${b}, ${year}`);
  const answerDay = new Intl.DateTimeFormat('en-US', { weekday: 'short' })
    .format(baseDate)
    .toUpperCase();
  return answerDay;
};

console.log(getDayName(1, 6)); // TUE
console.log(getDayName(5, 24)); // TUE
console.log(getDayName(8, 16)); // TUE
console.log(getDayName(9, 17)); // TUE
