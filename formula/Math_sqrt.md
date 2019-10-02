# 제곱인 수 찾기

```
isSquare(-1) returns  false
isSquare(0) returns   true
isSquare(3) returns   false
isSquare(4) returns   true
isSquare(25) returns  true  
isSquare(26) returns  false
```



Math.sqrt() 함수는 숫자의 제곱근을 반환한다.

매개변수는 숫자로 들어온다. 주어진 숫자에 루트(**√** )를 씌우고, 만약 음수이면 NaN을 반환한다.

sqrt()는 Math의 정적 메소드이므로 Math 객체의 메소드가 아니라 항상 Math.sqrt()로 사용한다.



```javascript
let isSquare = function(n){
  if (n < 0) { return false }
  else 
  return Math.sqrt(n) % 1 ? false :true; 
}
```



n이 음수일 경우에 따로 조건을 주지 않고 `Math.sqrt(n) % 1 === 0` 으로 리턴값을 주는 게 더 간단하다. 음수는 어차피 NaN을 반환하기 때문에 falsy 값이다.