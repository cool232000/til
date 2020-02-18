# return max number

```javascript
function max(...params) {
  // do somethng
}

const result = max(1, 2, 3, 4, 10, 5, 6, 7);
console.log(result);
```

인자로 전달된 숫자 중 가장 큰 숫자를 반환하는 문제이다.



1. Math.max 를 활용하는 방법

   ```javascript
   function max(...params) {
     return Math.max.apply(null, params);
   }
   
   const result = max(1, 2, 3, 4, 10, 5, 6, 7);
   console.log(result); // 10
   ```

2. sort해서 가장 마지막에 있는 숫자를 반환하는 방법

   ```javascript
   function max(...params) {
     let sortNum = params.sort((a, b) => a - b);
     return sortNum[sortNum.length-1];
   }
   
   const result = max(1, 2, 3, 4, 10, 5, 6, 7);
   console.log(result); // 10
   ```

   

3. reduce를 활용하는 방법

   ```javascript
   function max(...params) {
     return params.reduce((acc, cur) => acc < cur ? cur : acc, params[0])
   }
   
   const result = max(1, 2, 3, 4, 10, 5, 6, 7);
   console.log(result); // 10
   ```

   