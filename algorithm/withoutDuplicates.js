// https://programmers.co.kr/learn/courses/30/lessons/12906

const notSameNum = arr => arr.filter((num, idx) => num !== arr[idx + 1]);

console.log(notSameNum([1, 1, 3, 3, 0, 1, 1])); // [1, 3, 0, 1]
console.log(notSameNum([4, 4, 4, 3, 3])); // [4, 3]
console.log(notSameNum([1, 1])); // [4, 3]
