# 문자열을 수식계산으로 변환하기

```javascript
basicOp('+', 4, 7)         // Output: 11
basicOp('-', 15, 18)       // Output: -3
basicOp('*', 5, 5)         // Output: 25
basicOp('/', 49, 7)        // Output: 7
```



eval()은 주어진 코드를 평가해 얻은 값을 리턴한다. 값이 없다면 undefined를 반환한다.

매개변수는 string으로, 표현식, 명령문 또는 연속되는 다수의 명령문을 나타내는 문자열이 들어온다. 표현식은 객체의 변수나 속성을 포함할 수 있다.



eval()은 전역 객체의 함수 속성이다.

문자열로 연산식을 구성해 eval()로 계산할 수 있다. x라는 변수가 포함된 연산식을 문자열로 즉, "3 * x + 2"로 나타내고 eval()을 호출해 계산할 수 있다.



[eval을 절대 사용하지 말 것!]: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/eval#eval%EC%9D%84_%EC%A0%88%EB%8C%80_%EC%82%AC%EC%9A%A9%ED%95%98%EC%A7%80_%EB%A7%90_%EA%B2%83!

