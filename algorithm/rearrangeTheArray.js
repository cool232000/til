/*
조건에 맞게 배열을 재배치하기
주어진 ball 배열을 order 배열의 순서대로 재배치하되, order 배열의 숫자가 ball 배열의 맨 앞이거나 맨 뒤여야만 새로운 배열에 추가할 수 있다
즉, ball 배열이 [1, 2, 3, 4, 5, 6]이고 order 배열이 [6, 2, 5, 1, 4, 3] 라면,
1. order 배열의 0번째 인덱스인 6부터 ball 배열의 맨 앞이거나 맨 뒤에 있는 숫자인지 확인한다
2. 6은 ball 배열의 맨 뒤에 위치한 숫자이므로 새로운 배열에 추가한다
3. 다음 인덱스의 숫자인 2는 ball 배열의 맨 앞이거나 맨 뒤에 있는 숫자가 아니므로 다음 인덱스인 5로 순서를 넘긴다
4. 인덱스의 순서가 넘어갈 때마다 지나친 숫자(여기서의 2)가 맨 앞이나 맨 뒤에 위치하게 된다면 그 숫자를 먼저 배열에 추가한다
5. 따라서 예제의 order 대로 재배치한 배열은 [6, 5, 1, 2, 4, 3] 이다
*/

const rearrangeTheArray = (ball, order) => {
  const answer = [];
  const change = [...ball];
  const temp = [];
  let count = 0;
  const replayFunc = () => {
    for (let j = 0; j < temp.length; j++) {
      if (temp[j] === change[0]) {
        answer.push(temp[j]);
        change.shift();
        count++;
      } else if (temp[j] === change[change.length - 1]) {
        answer.push(temp[j]);
        change.pop();
        count++;
      }
    }
  };
  for (let i = 0; i < order.length; i++) {
    if (temp.length) {
      replayFunc();
    }
    if (temp.length !== count) {
      replayFunc();
    }
    if (order[i] === change[0]) {
      answer.push(order[i]);
      change.shift();
    } else if (order[i] === change[change.length - 1]) {
      answer.push(order[i]);
      change.pop();
    } else {
      temp.push(order[i]);
    }
  }
  return answer;
};

console.log(rearrangeTheArray([1, 2, 3, 4, 5, 6], [6, 2, 5, 1, 4, 3])); // [6, 5, 1, 2, 4, 3]
console.log(rearrangeTheArray([11, 2, 9, 13, 24], [9, 2, 13, 24, 11])); // [24, 13, 9, 2, 11]
