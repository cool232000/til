# [Sum of positive](https://www.codewars.com/kata/5715eaedb436cf5606000381)

Example `[1,-4,7,12]` => `1 + 7 + 12 = 20`



1. 배열에서 음수를 제외한다.
2. 양수만 남은 배열을 반복문으로 돌면서 하나씩 변수에 더해준다.



```javascript
function positiveSum(arr) {
  let sum = 0;
  arr = arr.filter(arr => arr >= 0);
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}
```

