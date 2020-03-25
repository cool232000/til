https://programmers.co.kr/learn/courses/30/lessons/12935

function removeSmallest(arr) {
  let answer = [];
  answer = arr.filter((array) => array !== Math.min(...arr));
  return answer.length ? answer : [-1];
}
  
removeSmallest([4, 3, 2, 1]); // [4, 3, 2]
removeSmallest([10]); // [ -1 ]
