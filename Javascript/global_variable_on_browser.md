# 브라우저의 전역 변수

```javascript
let person = {
  'last-name': 'Lee',
  1: 10
};
```

위와 같은 객체에서 프로퍼티에 접근하는 방법은 두 가지이다. **마침표 표기법(Dot notation)**이나 **대괄호 표기법(Bracket notation)**을 활용하는 것이다.

프로퍼티 키가 식별자 네이밍 규칙을 따른다면 마침표 표기법과 대괄호 표기법을 모두 사용할 수 있다. 그러나 프로퍼티 키가 식별자 네이밍 규칙을 따르지 않는다면 반드시 대괄호 표기법으로만 프로퍼티에 접근할 수 있다. 즉, 마침표 표기법으로 접근할 수 있는 프로퍼티는 식별자 네이밍 규칙을 따른 프로퍼티에 한한다.

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

이는 브라우저 환경과 Node.js 환경의 차이 때문에 발생하는 문제이다. 먼저 자바스크립트 엔진이 `person.last-name`을 해석하는 방법을 이해해보자. 먼저 person 다음에 찍힌 마침표로 인해 자바스크립트 엔진은 다음에 오는 프로퍼티에 접근하게 된다. 이때 자바스크립트 엔진이 먼저 만나게 되는 것은 last라는 키이다. 그러나 person이라는 객체 내부에는 last 라는 키를 가진 프로퍼티가 존재하지 않는다. 때문에 첫번째 접근 상황에서 last는 `undefined` 라는 결과를 반환한다. 그리고 다음에 접근하게 되는 `-`는 연산자가 되고, 연산자 다음에 오는 name은 식별자라고 판단한다. name의 위치나 호출되는 방식이 프로퍼티를 호출하는 것과 다르기 때문에 자바스크립트 엔진이 name을 프로퍼티로 인식하지 않는다.

여기에서 브라우저 환경과 Node.js 환경의 차이가 발생한다. 즉, name이라는 식별자를 브라우저 환경은 알고 있고, Node.js 환경은 알지 못한다.

```javascript
// 브라우저 환경
console.log(name); // ''

// Node.js 환경
console.log(name); // ReferenceError: name is not defined
```

name이라는 식별자는 브라우저 환경에서 전역 변수이면서 빈문자열을 기본값으로 갖는다. name은 브라우저의 이름을 가리키는 용도로써 전역변수로 등록되어 있다. 때문에 브라우저 환경에서 name은 빈문자열이 되므로 `undefined - ''` 이라는 계산식이 되기 때문에 undefined과 빈문자열을 숫자로 해석해 `NaN`을 반환한다. name이라는 식별자를 모르는 Node.js 환경에서는 등록된 name 식별자가 없으므로 레퍼런스에러를 반환하게 된다.
