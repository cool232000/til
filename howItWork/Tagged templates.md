# Tagged templates

tagged templates는 template literals의 발전된 형태이다. tagged templates를 사용하면 템플릿 리터럴을 함수로 파싱할 수 있다. 기본적인 동작은 다음과 같다.

* 태그 함수의 첫 번째 인수는 문자열 값의 배열을 포함한다. 즉, 단순 문자열을 배열 형태로 전달받는다.
* 나머지 인수는 표현식과 관련되어 있다. 정의된 표현식의 값이 매개변수로 전달되게 된다.

```javascript
let person = 'Mike';
let age = 28;

function myTag(strings, personExp, ageExp) {
  // 전달되는 매개변수의 형태
  // strings -> [ that, is a ]
  // personExp -> ${ person }
  // ageExp -> ${ age }

  let str0 = strings[0]; // "that "
  let str1 = strings[1]; // " is a "

  // 템플릿 리터럴 ${age}의 값은 28이고, 28은 ageExp라는 매개변수로 들어와 아래의 조건문을 통과한다
  let ageStr;
  if (ageExp > 99){
    ageStr = 'centenarian';
  } else {
    ageStr = 'youngster';
  }

  // 매개변수로 들어온 personExp는 함수 내부에서 아무런 동작도 추가로 하지 않기 때문에 Mike가 그대로 출력된다
  return str0 + personExp + str1 + ageStr;
}

let output = myTag`that ${ person } is a ${ age }`;

console.log(output);
// that Mike is a youngster
```

