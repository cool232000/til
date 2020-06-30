/*
28. 일주일 날짜 구하기
오늘을 기준으로 YYYY-MM-DD 형식의 문자열을 요소로 갖는 배열로 일주일 간의 날짜를 구하는 함수를 완성하라. 단, 함수가 반환하는 배열은 일요일부터 시작해서 토요일까지 구성한다.
*/

const getCurrentWeek = () => {
  const week = [];
  const zero = num => (num < 10 ? `0${num}` : num);
  const today = new Date();
  const flag = today.getDay();
  const sunday = new Date(today - flag * 24 * 60 * 60 * 1000);
  for (let i = 0; i < 7; i++) {
    const days = new Date(Date.parse(sunday) + i * 24 * 60 * 60 * 1000);
    const year = days.getFullYear();
    const month = days.getMonth() + 1;
    const date = days.getDate();
    week.push(`${year}-${zero(month)}-${zero(date)}`);
  }
  return week;
};

console.log(getCurrentWeek());
/*
오늘이 2020-04-21인 경우,
[
  '2020-04-19',
  '2020-04-20',
  '2020-04-21',
  '2020-04-22',
  '2020-04-23',
  '2020-04-24',
  '2020-04-25'
]
*/
