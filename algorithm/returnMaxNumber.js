// Math.max
function max(...params) {
  return Math.max.apply(null, params);
}

const result = max(1, 2, 3, 4, 10, 5, 6, 7);
console.log(result); // 10

// sort
function sortMax(...params) {
  let sortNum = params.sort((a, b) => a - b);
  return sortNum[sortNum.length-1];
}

const sortResult = sortMax(1, 2, 3, 4, 10, 5, 6, 7);
console.log(sortResult); // 10

// reduce
function reduceMax(...params) {
  return params.reduce((acc, cur) => acc < cur ? cur : acc, params[0])
}

const reduceResult = reduceMax(1, 2, 3, 4, 10, 5, 6, 7);
console.log(reduceResult); // 10
