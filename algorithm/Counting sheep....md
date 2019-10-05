#[Counting sheep...](https://www.codewars.com/kata/54edbc7200b811e956000556)

```
For example,

[true,  true,  true,  false,
  true,  true,  true,  true ,
  true,  false, true,  false,
  true,  false, false, true ,
  true,  true,  true,  true ,
  false, false, true,  true]
```



인수로 들어오는 배열만큼 반복문을 돌면서 true 값을 가진 경우에만 숫자를 1씩 카운트 한다.



```javascript
function countSheeps(arrayOfSheep) {
  let counter = 0;
  for (i = 0; i < arrayOfSheep.length; i++) {
    if (arrayOfSheep[i] === true) {
      counter++;
    }
  }
  return counter;
}
```

