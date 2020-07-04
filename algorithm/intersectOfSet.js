// 교집합 구하기

const intersect = (a, b) => a.filter(num => b.includes(num));

console.log(intersect([1, 2, 3], [2, 3, 4])); // [2, 3]
console.log(intersect([1, 4, 7], [2])); // []
