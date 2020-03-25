// 14. 중복된 요소
// 인수로 전달된 배열의 요소 중에서 중복된 요소만으로 구성된 배열을 반환하는 함수를 작성하라.
// for 문은 사용하지 않도록 하자.

// filter
function findDuplicatedFilter(array) {
  const uniqArr = array.filter((arr, idx) => array.indexOf(arr) === idx);
  return array.filter((arr, idx) => arr[idx] === uniqArr[idx]);
}

console.log(findDuplicatedFilter([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]


// reduce
function findDuplicatedReduce(array) {
  return array.reduce((acc, cur, i, arr) => arr.indexOf(cur) !== i ? acc.concat(cur) : acc, []);
}

console.log(findDuplicatedReduce([1, 2, 3, 4, 1, 2, 3])); // [ 1, 2, 3 ]
