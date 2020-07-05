// 두 개의 수 중 더 큰 수를 찾는 함수 a 를 만들고
// 함수 a를 사용해 세 개 의 수 중 가장 큰 수를 찾는 함수 b 만들기

const bigger = (a, b) => (a > b ? a : b);

const biggest = (a, b, c) => bigger(bigger(a, b), bigger(b, c));

console.log(bigger(1, 2)); // 2
console.log(bigger(4, 3)); // 4
console.log(biggest(1, 2, 3)); // 3
console.log(biggest(4, 6, 5)); // 6
