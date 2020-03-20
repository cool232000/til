// set 객체 사용하기
function uniqSet(array) {
  const arr = [...new Set(array)];
  return arr;
}

console.log(uniqSet([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]


// filter 메소드 사용하기
function uniqFilter(array) {
  return array.filter((item, idx) => array.indexOf(item) === idx);
}

console.log(uniqFilter([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
