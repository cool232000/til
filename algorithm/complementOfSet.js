// 차집합 구하기

const complement = (a, b) => a.filter(num => !b.includes(num));

console.log(complement([1, 2, 3], [2, 3, 4])); // [1]
console.log(complement([1, 4, 7], [2])); // [1, 4, 7]
