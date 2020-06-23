/*
자연수가 들어있는 배열 arr가 매개변수로 주어집니다. 배열 arr 안의 숫자들 중에서 앞에 있는 숫자들부터 뒤에 중복되어 나타나는 숫자들 중 중복 횟수를 계산해서 배열로 return하도록 solution 함수를 작성해주세요. 만약 중복되는 숫자가 없다면 배열에 -1을 채워서 return하세요.

제한사항
배열 arr의 길이는 1 이상 100 이하의 자연수입니다.
배열 arr의 원소는 1 이상 100 이하의 자연수입니다.
*/

const deplicate = arr => {
  const solution = [];
  const array = [...new Set(arr)];
  if (array.length === arr.length) solution.push(-1);
  else {
    array.forEach(elem => {
      let count = 0;
      arr.forEach(num => num === elem && count++);
      if (count > 1) solution.push(count);
    });
  }
  return solution;
};

console.log(deplicate([1, 2, 3, 3, 3, 3, 4, 4])); // [4, 2]
console.log(deplicate([3, 2, 4, 4, 2, 5, 2, 5, 5])); // [3, 2, 3]
console.log(deplicate([3, 5, 7, 9, 1])); // [-1]
