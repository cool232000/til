# count bigger than ten

```javascript
function countBiggerThanTen(numbers) {
  /* do something */
}

const count = countBiggerThanTen([1, 2, 3, 5, 10, 20, 30, 40, 50, 60]);
console.log(count); // 5
```

배열에서 10보다 큰 수에 대해서만 1을 카운트해서 원하는 값(5)을 얻는 문제이다.



1. forEach로 구현하기

```javascript
function countBiggerThanTen(numbers) {
  let count = 0;
  numbers.forEach(num => {
    if (num > 10) count += 1;
  });
  return count;
};

const count = countBiggerThanTen([1, 2, 3, 5, 10, 20, 30, 40, 50, 60]);
console.log(count); // 5
```



2. reduce로 구현하기

```javascript
function countBiggerThanTen(numbers) {
  return numbers.reduce((acc, cur) => {
    if (cur > 10) return acc += 1;
    else return acc;
  }, 0);
};

const count = countBiggerThanTen([1, 2, 3, 5, 10, 20, 30, 40, 50, 60]);
console.log(count); // 5
```



3. filter로 구현하기

```javascript
function countBiggerThanTen(numbers) {
  return numbers.filter(num => num > 10).length;
};

const count = countBiggerThanTen([1, 2, 3, 5, 10, 20, 30, 40, 50, 60]);
console.log(count); // 5
```

