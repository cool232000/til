/*
https://programmers.co.kr/learn/courses/30/lessons/12944
24. 평균구하기
인수로 주어진 배열의 평균을 구하는 함수를 완성하라.
*/

const average = array => array.reduce((acc, cur) => acc + cur, 0) / array.length;

console.log(average([5, 3, 4])); // 4
console.log(average([1, 2, 3, 4])); // 2.5
console.log(average([5, 5])); // 5
