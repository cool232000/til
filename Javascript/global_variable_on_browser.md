# 브라우저의 전역 변수

## 식별자 네이밍 규칙

```javascript
let person = {
  'last-name': 'Lee',
  1: 10
};
```

위와 같은 객체에서 프로퍼티에 접근하는 방법은 두 가지이다. **마침표 표기법(Dot notation)** 이나 **대괄호 표기법(Bracket notation)** 을 활용하는 것이다. 접근 방법을 구분하는 기준은 `프로퍼티 키가 식별자 네이밍 규칙을 따르는가` 이다.



* 프로퍼티 키가 식별자 네이밍 규칙을 따를 경우
  
  * 마침표 표기법과 대괄호 표기법 모두 사용 가능
* 프로퍼티 키가 식별자 네이밍 규칙을 따르지 않을 경우
  
  * 대괄호 표기법으로만 프로퍼티에 접근 가능
  
    

즉, 마침표 표기법으로 접근할 수 있는 프로퍼티는 식별자 네이밍 규칙을 따른 프로퍼티에 한한다.



## 식별자 네이밍 규칙을 지키지 않으면

위의 객체는 식별자 네이밍 규칙을 따르지 않은 프로퍼티를 가졌으므로 대괄호 표기법으로만 접근할 수 있다. 때문에 여러가지 방법(마침표 표기법, 프로퍼티를 작은 따옴표로 감싼 마침표 표기법, 대괄호 표기법, 대괄호 표기법 내부에 작은 따옴표가 포함되지 않은 방법 등)으로 해당 프로퍼티에 접근해보면 다양한 방식으로 에러를 반환한다.



```javascript
console.log(person.'last-name'); // SyntaxError: Unexpected string

// 브라우저 환경
console.log(person.last-name); // NaN
// Node.js 환경
console.log(person.last-name); // ReferenceError: name is not defined

console.log(person[last-name]); // ReferenceError: last is not defined

console.log(person['last-name']); // Lee
```



`console.log(person.'last-name');`은 person 뒤에 찍힌 마침표로 인해 자바스크립트 엔진이 다음에 오는 것이 프로퍼티라고 간주하고 접근하는데, 처음으로 만나는 문자열이 작은 따옴표이다. 식별자 네이밍 규칙에 따르면 작은 따옴표는 프로퍼티의 키로 이름 지어질 수 없기 때문에 문법에러를 리턴한다.

`console.log(person.last-name);`은 브라우저 환경과 Node.js 환경에서 각각 다르게 동작한다. 브라우저 환경에서는 `NaN`을, Node.js 환경에선 레퍼런스 에러를 반환한다. 브라우저 환경과 Node.js 환경에서 반환하는 내용이 다른 이유는 무엇일까?



## 브라우저 환경과 Node.js 환경은 다르다

대부분의 경우 자바스크립트를 사용하는 브라우저 환경과 Node.js를 사용하는 Node.js 환경은 ECMA script를 공유해 비슷한 결과를 내보낸다. 그런데 몇 가지의 경우 브라우저 환경과 Node.js 환경에서 차이가 있다.

먼저 자바스크립트 엔진이 `person.last-name`을 해석하는 방법을 이해해보자. 먼저 person 다음에 찍힌 마침표로 인해 자바스크립트 엔진은 다음에 오는 프로퍼티에 접근하게 된다. 이때 자바스크립트 엔진이 먼저 만나게 되는 것은 last라는 키이다. 그러나 person이라는 객체 내부에는 last 라는 키를 가진 프로퍼티가 존재하지 않는다. 때문에 첫번째 접근 상황에서 last는 `undefined` 라는 결과를 반환한다. 그리고 다음에 접근하게 되는 `-`는 연산자가 되고, 연산자 다음에 오는 name은 식별자라고 판단한다. name의 위치나 호출되는 방식이 프로퍼티를 호출하는 것과 다르기 때문에 자바스크립트 엔진이 name을 프로퍼티로 인식하지 않는다.



여기에서 브라우저 환경과 Node.js 환경의 차이가 발생한다. 즉, name이라는 식별자를 브라우저 환경은 알고 있고, Node.js 환경은 알지 못한다.

```javascript
// 브라우저 환경
console.log(name); // ''

// Node.js 환경
console.log(name); // ReferenceError: name is not defined
```

이런 차이는 name이라는 식별자가 무엇에 대한 식별자인지에 따라 나타난다. 브라우저 환경의 name이라는 식별자는 현재는 많이 사용하지 않는, HTML에서 iframe으로 들어가는 창의 이름을 표현하는 것으로 빈문자열('')로 존재하는 전역변수이다.

전역변수는 실행컨텍스트 상 `window`에 프로퍼티로 저장되므로 name 식별자는 `window.name` 이라고 콘솔에 찍어도 같은 빈문자열이 찍히게 된다. 즉 브라우저 환경에서 `last-name`을 브라우저가 해석한 방법에 따르면 `undefined - ''` 이라는 계산식이 되기 때문에 undefined과 빈문자열을 숫자로 해석해 `NaN`을 반환한다.

name이라는 식별자를 모르는 Node.js 환경에서는 등록된 name 식별자가 없으므로 레퍼런스에러를 반환하게 된다. 브라우저에서 iframe 창의 이름으로 사용하는 `name`이라는 식별자를 Node.js 환경에서는 사용할 일이 없으므로 전역 변수를 가지고 있을 이유도 없다.

