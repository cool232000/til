// 12. 중복 요소 제거
// 인수로 전달된 배열의 요소 중에서 중복된 요소를 제외하고 유니크한 요소만을 반환하는 함수를 작성하라.
// for 문은 사용하지 않도록 하자.

// set 객체
function uniqSet(array) {
  const arr = [...new Set(array)];
  return arr;
}

console.log(uniqSet([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]


// filter
function uniqFilter(array) {
  return array.filter((item, idx) => array.indexOf(item) === idx);
}

console.log(uniqFilter([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]


// reduce
function uniqReduce(array) {
  return array.reduce((acc, cur, i, arr) => arr.indexOf(cur) === i ? acc.concat(cur) : acc, []);
}

console.log(uniqReduce([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
