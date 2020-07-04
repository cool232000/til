// 합집합 구하기

const sum = (a, b) => {
  let sumArray = [...a];
  const nonRedundant = b.filter(num => !a.includes(num));
  sumArray = sumArray.concat(nonRedundant).sort((a, b) => a - b);
  return sumArray;
};

console.log(sum([1, 2, 3], [2, 3, 4])); // [1, 2, 3, 4]
console.log(sum([1, 4, 7], [2])); // [1, 2, 4, 7]
