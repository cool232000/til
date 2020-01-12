#[You're a square!](https://www.codewars.com/kata/54c27a33fb7da0db0100040e)

###A square of squares

You like building blocks. You especially like building blocks that are squares. And what you even like more, is to arrange them into a square of square building blocks!

However, sometimes, you can't arrange them into a square. Instead, you end up with an ordinary rectangle! Those blasted things! If you just had a way to know, whether you're currently working in vain… Wait! That's it! You just have to check if your number of building blocks is a *perfect square*.



###Task

Given an integral number, determine if it's a [square number](https://en.wikipedia.org/wiki/Square_number):

> In mathematics, a **square number** or **perfect square** is an integer that is the square of an integer; in other words, it is the product of some integer with itself.

The tests will *always* use some integral number, so don't worry about that in dynamic typed languages.



### Examples

```scala
isSquare(-1) returns  false
isSquare(0) returns   true
isSquare(3) returns   false
isSquare(4) returns   true
isSquare(25) returns  true  
isSquare(26) returns  false
```



1. n이 음수일 경우 거듭제곱근을 반환할 수 없으므로 false를 리턴
2. n이 양수일 경우 Math.sqrt()를 1로 나누어서 나머지가 남았으면 false (거듭제곱근이 구해지지 않았다는 뜻이므로)
3. 1로 나누어서 나머지가 남지 않았으면 true



```javascript
let isSquare = function(n){
  if (n < 0) { return false}
  else 
  return Math.sqrt(n) % 1 ? false : true; 
}
```

