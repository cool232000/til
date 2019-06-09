# 전역 객체

전역 객체(Global Object)는 어떤 객체보다도 먼저 생성되며 어떤 객체에도 속하지 않은 최상위 객체이다. 전역 객체는 클라이언트 사이드 환경(브라우저)에서는 window, 서버 사이드 환경(Node.js)에서는 global 객체를 의미한다.



#### **전역 객체의 특징**

- 전역 객체는 개발자가 의도적으로 생성할 수 없다(브라우저 실행시 자동 생성).
- 전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있다.
- 전역 객체는 모든 빌트인 객체를 프로퍼티로 가진다.
  - Object, String, Number, Boolean, Function, Array, RegExp, Date, Math, Promise
- 자바스크립트의 실행 환경에 따라 추가적으로 프로퍼티와 메소드를 갖는다. 브라우저 환경의 window 객체는 Web API를 프로퍼티로 소유한다.
  - DOM, BOM, Canvas, XMLHttpRequest, Fetch, requestAnimationFrame, SVG, Web Storage, Web Component, Web worker 등
- var 키워드로 선언한 전역 변수와 선언하지 않은 변수에 값을 할당한 암묵적 전역 변수, 전역 함수는 전역 객체의 프로퍼티가 된다.
  - 실행 컨텍스트 관점에서 전역 실행 컨텍스트가 실행 중일 때 선언된, var 키워드로 선언한 전역 변수와 암묵적 전역 변수, 전역 함수는 객체 환경 레코드와 연결된 전역 객체(window)의 프로퍼티로 저장된다. let과 const로 선언된 변수는 전역에서 선언되었다 하더라도 선언적 환경 레코드에 저장되므로 window의 프로퍼티가 아니고 window.변수 등으로 접근할 수 없다.
- 전역 객체는 몇 가지 프로퍼티와 메소드를 가지고 있다. 전역 객체의 프로퍼티와 메소드는 window를 생략한 채 참조/호출할 수 있으므로 전역 변수와 전역 함수처럼 사용할 수 있다.



## 전역 프로퍼티(Global property)

전역 프로퍼티는 전역 객체의 프로퍼티이다.



### 1.1. Infinity

```javascript
console.log(window.Infinity === Infinity); // true
console.log(3/0); // Infinity
console.log(-3/0); // -Infinity
console.log(typeof Infinity); // number
```



### 1.2. NaN

```javascript
console.log(window.NaN); // NaN
console.log(Number('xyz')); // NaN
console.log(1 * 'string'); // NaN
console.log(typeof NaN); // number
```



### 1.3. undefined

```javascript
console.log(window.undefined); // undefined

var foo;
console.log(foo); // undefined
console.log(typeof undefined); // undefined
```



## 전역 함수(Global function)

전역 함수는 애플리케이션 전역에서 호출할 수 있는 함수로서 전역 객체의 메소드이다.



### 2.1. eval

eval 함수는 매개변수에 전달된 코드(표현식 또는 문)을 나타내는 문자열을 평가 또는 실행하고 결과값을 반환한다. 전달된 코드가 여러 개의 문으로 이루어져 있다면 모든 문을 일괄 실행한다.

```javascript
const x = 1;
const y = 2;
console.log(eval('x * y')); // 2
console.log(eval('function foo() {return true; } foo();')); // true
```



### 2.2. isFinite

매개변수에 전달된 값이 정상적인 유한수인지 검사하여 그 결과를 불리언 타입으로 변환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 타입을 변환한 후 검사를 수행한다.

```javascript
console.log(isFinite(Infinity)); // false
console.log(isFinite(NaN)); // false
console.log(isFinite('Hello')); // false
console.log(isFinite('2019/06/07')); // false

console.log(isFinite(0)); // true
console.log(isFinite(2e64)); // true
console.log(isFinite('10')); // true
console.log(isFinite(null)); // true
```



### 2.3. isNaN

매개변수에 전달된 값이 NaN인지 검사하여 그 결과를 불리언 타입으로 반환한다. 매개변수에 전달된 값이 숫자가 아닌 경우, 숫자로 타입을 변환한 후 검사를 수행한다.

```javascript
console.log(isNaN(NaN)); // true
console.log(isNaN(10)); // false

console.log(isNaN('blahblah')); // true
console.log(isNaN('10')); // false
console.log(isNaN('10.12')); // false
console.log(isNaN('')); // false
console.log(isNaN(' ')); // false

console.log(isNaN(true)); // false
console.log(isNaN(false)); // false

console.log(isNaN(undefined)); // true

console.log(isNaN({})); // true

console.log(isNaN(new Date())); // false
console.log(isNaN(new Date().toString())); // true
```



### 2.4. parseFloat

매개변수에 전달된 문자열을 부동소수점 숫자(floating point number)로 변환하여 반환한다.

```javascript
console.log(parseFloat('3.14')); // 3.14
console.log(parseFloat('10.00')); // 10
console.log(parseFloat('34 45 66')); // 34
console.log(parseFloat('40 years')); // 40
console.log(parseFloat('He was 40')); // NaN
console.log(parseFloat(' 60 ')); // 60
```



### 2.5. parseInt

매개변수에 전달된 문자열을 정수형 숫자(Integer)로 해석하여 반환한다. 반환값은 항상 10진수이다.

```javascript
console.log(parseInt('10')); // 10
console.log(parseInt('10.123')); // 10
```

주어진 변환 대상 값이 문자열이 아니면 문자열로 변환한 후 정수형 숫자로 해석하여 반환한다.

```javascript
console.log(parseInt(10)); // 10
console.log(parseInt(10.123)); // 10
```

2번째 매개변수에는 진법을 나타내는 기수(2~36)를 지정할 수 있다. 기수를 지정하면 첫번째 매개변수에 전달된 문자열을 해당 기수의 숫자로 해석하여 반환한다. 반환값은 언제나 10진수이다.

```javascript
console.log(parseInt('10')); // 10
console.log(parseInt('10', 2)); // 2
console.log(parseInt('10', 8)); // 8
console.log(parseInt('10', 16)); // 16
```

기수를 지정하여 10진수 숫자를 해당 기수의 문자열로 변환하여 반환하고 싶을 때는 Number.prototype.toString 메소드를 사용한다.

```javascript
const x = 15;
console.log(parseInt(x.toString(2))); // 1111
console.log(parseInt(x.toString(8))); // 17
console.log(parseInt(x.toString(16))); NaN
console.log(parseInt(x.toString())); // 15
```

두번째 매개변수에 진법을 나타내는 기수를 지정하지 않더라도 첫번째 매개변수에 전달된 문자열이 "0x" 또는 "0X"로 시작하는 16진수 리터럴이라면 16진수로 해석하여 10진수 정수로 반환한다. 그리나 2진수 리터럴과 8진수 리터럴은 제대로 해석하지 못한다. 따라서 문자열을 2진수나 8진수로 해석하려면 지수를 반드시 지정해야 한다.

```javascript
console.log(parseInt('0xf')); // 15
console.log(parseInt('f', 16)); // 15

// 2진수 리터럴과 8진수 리터럴은 제대로 해석하지 못한다
console.log(parseInt('0b10'));// 0
console.log(parseInt('0o10')); // 0

// 문자열을 2진수나 8진수로 해석하려면 지수를 반드시 지정해야 한다
console.log(parseInt('10', 2)); // 2
console.log(parseInt('10', 8)); // 8
```

첫번째 매개변수에 전달된 문자열의 첫번째 문자가 해당 지수의 숫자로 변환될 수 없다면 NaN을 반환한다.

```javascript
console.log(parseInt('A0')); // NaN
console.log(parseInt('20', 2)); // NaN
```

첫번째 매개변수에 전달된 문자열의 두번째 문자부터 해당 진수를 나타내는 숫자가 아닌 문자와 마주치면 이 문자와 계속되는 문자들은 전부 무시되며 해석된 정수값을 반환한다.

```JavaScript
console.log(parseInt('1A0')); // 1
console.log(parseInt('102', 2)); // 2
console.log(parseInt('58', 8)); // 5
console.log(parseInt('FG', 16)); // 15
```

첫번째 매개변수에 전달된 문자열에 공백이 있다면 첫번째 문자열만 해석하여 반환하며 전후 공백은 무시된다. 만약 첫번째 문자열을 숫자로 해석할 수 없는 경우, NaN을 반환한다.

```javascript
console.log(parseInt('34 45 66')); // 34
console.log(parseInt('40 years')); // 40
console.log(parseInt('He was 40')); // NaN
console.log(parseInt('60')); // 60
```



### 2.6. encodeURI / decodeURI

인코딩이란 URI의 문자들을 이스케이프 처리하는 것을 의미힌다. 이스케이프 처리란 네트워크를 통해 정보를 공유할 때 어떤 시스템에서도 읽을 수 있는 아스키 문자로 변환하는 것이다.

encodeURI 함수는 매개변수로 전달된 URI를 인코딩하고 decodeURI 함수는 매개변수로 전달된 인코딩된 URI를 전달받아 이스케이프 처리되기 이전으로 디코딩한다.

```javascript
const uri = 'http://example.com?name=이진&job=programmer';

const enc = encodeURI(uri);
console.log(enc); // http://example.com?name=%EC%9D%B4%EC%A7%84&job=programmer

const dec = decodeURI(enc);
console.log(dec); // http://example.com?name=이진&job=programmer
```



### 2.7. encodeURIComponent / decodeURIComponent

encodeURIComponent 함수는 매개변수로 전달된 URI 구성 요소를 인코딩하고 decodeURIComponent 함수는 매개변수로 전달된 URI 구성 요소를 디코딩한다.

```javascript
const uriComp = 'name=이진&job=programmer';

let enc = encodeURIComponent(uriComp);
console.log(enc); // name%3D%EC%9D%B4%EC%A7%84%26job%3Dprogrammer

let dec = decodeURIComponent(uriComp);
console.log(dec); // name=이진&job=programmer

enc = encodeURI(uriComp);
console.log(enc); // name=%EC%9D%B4%EC%A7%84&job=programmer

dec = decodeURI(enc);
console.log(dec); // name=이진&job=programmer

```

encodeURI 함수는 매개변수로 전달된 문자열을 완전한 URI로 간주하기 때문에 쿼리 파라미터 구분자로 사용되는 =, ?, &을 인코딩하지 않는다.
