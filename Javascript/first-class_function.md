# 함수와 일급 객체

일급 객체(first-class object)는 아래와 같은 조건을 만족한다.

- 무명의 리터럴로 생성할 수 있다.
- 변수나 자료 구조(객체, 배열 등)에 저장할 수 있다.
- 함수의 매개변수에게 전달할 수 있다.
- 함수의 반환값으로 사용할 수 있다.

```javascript
// 함수는 런타임에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 함수 객체를 객체에 저장할 수 있다. 변수명과 함수명이 같을 경우 축약 표현을 사용할 수 있다.
const predicates = { increase, decrease };

// 함수의 매개변수에 전달할 수 있고 반환값으로 사용할 수 있다.
function makeCounter(predicate) {
  let num = 0;
  
  return function () {
    num = predicate(num);
    return num;
  };
}

// makeCounter의 매개변수에 함수 객체를 전달(함수에 대한 참조): 함수가 함수를 부른다. 이것이 함수형 프로그래밍이다.
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

자바스크립트의 함수는 일급 객체의 조건을 모두 만족한다.

함수는 무명의 리터럴로 생성될 수 있으므로 코드의 어디에서든지 정의할 수 있고 런타임에 함수를 생성한다.

함수가 일급 객체라는 것은 함수를 값처럼 자유롭게 사용할 수 있다는 의미이다. 따라서 자바스크립트의 함수는 일급 객체이므로 값처럼 인자로 전달할 수 있으며 반환할 수 있다.

호출할 수 없는 일반 객체와는 달리 함수 객체는 호출할 수 있고, 함수 고유의 프로퍼티를 소유한다. 따라서 함수는 객체이면서 함수 특유의 차이점을 갖는다.



## 함수 객체의 프로퍼티

함수가 객체이기 때문에 프로퍼티를 가질 수 있다.

```javascript
function square(number) {
  return number * number;
}

console.dir(square);
```

![함수 객체의 프로퍼티](https://imgur.com/5lkVauJ.jpg)

함수 객체에는 일반 객체에 없는 arguments, caller, length, name, prototype 프로퍼티가 존재한다. 이 프로퍼티들의 프로퍼티 어트리뷰트를 Object.getOwnPropertyDescriptor 메서드로 확인해보자.

```javascript
function square(number) {
  return number * number;
}

// arguments, caller, length, name, prototype은 square 함수 객체의 데이터 프로퍼티이다.

Object.getOwnPropertyDescriptor(square, 'arguments');
// {value: null, writable: false, enumerable: false, configurable: false}
Object.getOwnPropertyDescriptor(square, 'caller');
// {value: null, writable: false, enumerable: false, configurable: false}
Object.getOwnPropertyDescriptor(square, 'length');
// {value: 1, writable: false, enumerable: false, configurable: true}
Object.getOwnPropertyDescriptor(square, 'name');
// {value: "square", writable: false, enumerable: false, configurable: true}
Object.getOwnPropertyDescriptor(square, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}


// __proto__는 squre 함수 객체의 데이터 프로퍼티가 아니다.
// __proto__는 Object.prototype 객체의 접근자 프로퍼티이다.
// square 함수 객체는 Object.prototype 객체로부터 __proto__ 접근자 프로퍼티를 상속받았다.

Object.getOwnPropertyDescriptor(square, '__proto__');
// undefined

Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```



### arguments 프로퍼티

함수 객체의 arguments 프로퍼티 값은 arguments 객체이다.  arguments 객체는 함수 호출시 전달된 인수(argument)들의 정보를 담고 있는 순회 가능한 유사 배열 객체이며 함수 내부에서 지역 변수처럼 사용된다.

```javascript
function multiply(x, y) {
  console.log(arguments);
  return x * y;
}

console.log(multiply()); // NaN
console.log(multiply(1)); // NaN
console.log(multiply(1, 2)); // 2
console.log(multiply(1, 2, 3)); // 2
```

함수를 정의할 때 선언된 매개변수는 함수 몸체 내부에서 변수와 동일하게 취급된다. 예컨대 함수가 호출되면 변수처럼 함수 몸체 내에서 암묵적으로 매개변수가 선언되고, undefined로 초기화된 이후 인수가 할당된다.

선언된 매개변수의 개수보다 인수를 적게 전달했을 경우 인수가 전달되지 않은 매개변수는 undefined를 유지한다. 따라서 `undefined * undefined`로 NaN 혹은 `1 * undefined`로 NaN을 반환한다. 그러나 매개변수의 개수보다 인수를 많이 전달한 경우 초과된 인수는 무시된다. 그러나 초과된 인수가 버려지는 것은 아니다. arguments 객체의 프로퍼티로 보관된다.

```javascript
function multiply(x, y) {
  const iterator = arguments[Symbol.iterator]();
  
  // 이터레이터의 next 메서드를 호출해 이터러블 객체 arguments를 순회
  console.log(iterator.next()); // {value: 1, done: false}
  console.log(iterator.next()); // {value: 2, done: false}
  console.log(iterator.next()); // {value: 3, done: false}
  console.log(iterator.next()); // {value: undefined, done: true}
  
  return x * y;
}

multiply(1, 2, 3); // 2
```

자바스크립트는 선언된 매개변수의 개수와 함수 호출 시에 전달하는 인수의 개수를 확인하지 않는다. arguments 객체는 런타임 시 호출된 함수의 인자 개수를 확인하고 이에 따라 함수의 동작을 다르게 정의할 필요가 있을 때 유용하다.

즉, arguments 객체는 매개변수 개수를 확정할 수 없는 가변 인자 함수를 구현할 때 유용하다.

```javascript
function sum() {
  let res = 0;
  
  for (let i = 0; i < arguments.length; i++) {
    res += arguments[i];
  }
  return res;
}

console.log(sum()); // 0
console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
```

arguments 객체는 배열의 형태로 인자 정보를 담고 있지만 실제 배열이 아닌 유사배열 객체이다. 유사배열 객체란 length 프로퍼티를 가진 객체로 for 문으로 순회할 수 있는 객체를 말한다. ES6에서 도입된 이터레이션 프로토콜을 준수하면 순회 가능한 자료 구조인 이터러블이 된다. 이로 인해 ES5의 arguments 객체는 유사배열 객체이지만, ES6의 arguments 객체는 유사배열 객체이자 이터러블이다.

유사배열 객체는 배열이 아니다. 따라서 배열 메서드를 사용할 경우 에러가 발생한다. 배열 메서드를 사용하려면 Function.prototype.call, Function.prototype.apply를 사용해 간접 호출해야 한다.

```javascript
function sum() {
  if (!arguments.length) return 0;
  
  const array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  });
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

Function.prototype.call, Function.prototype.apply를 사용하는 번거로움을 해결하기 위해 ES6에서는 Rest 파라미터를 도입했다.

```javascript
function sum( ... args) {
  // 삼항조건연산자: args.length가 0이 아니면 args.reduce(pre, cur)을 더한다.
  return !args.length ? 0 : args.reduce((pre, cur) => pre + cur);
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```



### caller 프로퍼티

함수 객체의 caller 프로퍼티는 함수 자신을 호출한 함수를 가리킨다.

아래 코드에서 `console.log(foo(bar));` 는 foo 함수 내에서 bar 함수를 호출했다. 따라서 caller 값은 foo 함수이다. 그러나 `console.log(bar());`의 경우 호출한 함수가 없기 때문에 null 값이 반환된다. 그러나 브라우저 환경과 Node.js의 환경이 다르다.

```javascript
function foo(func) {
  return func();
}

function bar() {
  return 'caller : ' + bar.caller;
}

console.log(foo(bar)); // caller: function foo(func) { retrun func(); }
console.log(bar()); // caller: null

// node 환경
console.log(foo(bar)); //caller : function foo(func) { return func(); }
console.log(bar()); // caller : function (exports, require, module, __filename, __dirname) { function foo(func) { return func(); }

```



### length 프로퍼티

함수 객체의 length 프로퍼티는 함수 정의시 선언한 매개변수의 개수를 가리킨다.

그러나 arguments 객체의 length 프로퍼티와 함수 객체의 length 프로퍼티의 값은 다를 수 있으므로 주의해야 한다. arguments 객체의 length 프로퍼티는 인자의 개수를 가리키고, 함수 객체의 length 프로퍼티는 매개변수의 개수를 가리킨다. arguments 객체는 유사배열이고, 함수 객체는 유사배열도, 배열도 아니기 때문이다.

```javascript
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2

```



### name 프로퍼티

함수 객체의 name 프로퍼티는 함수명을 나타낸다. name 프로퍼티는 ES5와 ES6에서 동작이 다르다.

익명 함수 표현식의 경우 ES5에서는 name 프로퍼티는 빈 문자열을 값으로 갖는다. 하지만 ES6에서는 함수 객체를 가리키는 변수명을 값으로 갖는다.

주의해야 할 것은 함수명과 함수 객체를 가리키는 변수명은 의미가 다르다. 함수를 호출할 때는 함수명이 아닌 함수 객체를 가리키는 변수명으로 호출해야 한다.

```javascript
// 기명 함수 표현식; 함수명은 함수 내부에서만 유효한 식별자이므로 재귀함수를 쓸 때 함수명을 사용한다.
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식; ES5와 ES6의 동작이 다르다.
var anonymousFunc = function() {};
console.log(anonymousFunc.name); // anonymousFunc

function bar() {}
console.log(bar.name); // bar

```



### `__proto__` 접근자 프로퍼티

모든 객체는 `[[Prototype]]`이라는 내부 슬롯을 갖는다. `[[Prototype]]` 내부 슬롯은 객체 지향 프로그래밍의 상속을 구현하는 프로토타입 객체를 가리킨다.

`__proto__`프로퍼티는 `[[Prototype]]`이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 접근자 프로퍼티이다. 내부 슬롯에 직접 접근할 수는 없고 간접 접근 방법을 제공하는 경우에 한해 접근할 수 있다. `[[Prototype]]` 내부 슬롯 역시 직접 접근할 수 없고 `__proto__` 접근자 프로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있다.

```javascript
const obj = { a: 1};

console.log(obj.__proto__ === Object.prototype); // true

console.log(obj.hasOwnProperty('a')); // true
console.log(obj.hasOwnProperty('__proto__')); // false

```





### prototype 프로퍼티

prototype 프로퍼티는 함수 객체만이 소유하는 프로퍼티이다. prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로 사용될 때, 생성자 함수가 생성할 인스턴스의 프로토타입 객체를 가리킨다.

```javascript
// 함수 객체
console.log(Object.getOwnPropertyDescriptor(function() {}, 'prototype'));
// {value: {…}, writable: true, enumerable: false, configurable: false}

// 일반 객체
console.log(Object.getOwnPropertyDescriptor({}, 'prototype'));
//undefined

```

