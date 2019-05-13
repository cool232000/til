# 생성자 함수에 의한 객체 생성

객체 리터럴은 중괄호{} 내에 0개 이상의 프로퍼티를 정의한다. 객체 리터럴은 변수 할당문이 동작하는 시점에 해석되고 객체가 생성된다. 프로퍼티를 정의하지 않으면 빈 객체가 생성된다.

```javascript
var empty = {};
console.log(typeof empty); // object
```

객체 리터럴 표기법은 객체 생성 방법 중에서 가장 일반적이고 간단한 방법이다. 이번에는 생성자 함수로 객체를 생성하는 방법을 알아보자.



## Object 생성자 함수

생성자(constructor) 함수란 new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수를 말한다. 생성자 함수 역시 객체를 생성하지만 이때 생성된 객체는 '객체'가 아니라 '인스턴스'라고 부른다. 인스턴스는 객체가 메모리에 저장되어 실제로 존재하는 것에 초점을 맞춘 용어이다. 생성자 함수나 클래스가 생성한 객체를 다른 객체와 구분하기 위해 인스턴스라고 부른다.

Object 생성자 함수를 사용할 때는 new 연산자를 함께 사용한다. Object 생성자 함수를 호출하면 함수는 빈 객체를 생성해 반환한다(객체 리터럴에 프로퍼티를 정의하지 않으면 빈 객체가 생성되는 것처럼). 빈 객체가 생성되면 프로퍼티 또는 메서드를 추가해 객체를 완성할 수 있다.

```javascript
const person = new Object();

person.name = 'Lee';
person.sayHello = function () {
  console.log('Hi! My name is ' + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
```

또한 자바스크립트는 Object 생성자 함수 이외에도 String, Number, Boolean, Function, Array, Date, RegExp 등의 빌트인 생성자 함수를 제공한다.

```javascript
// String 생성자 함수
const strObj = new String('Lee');
console.log(typeof strObj); // object
console.log(strObj); // String {"Lee"}
// 0: "L" 1: "e" 2: "e"
// length: 3
// __proto__: String
// [[primitiveValue]]: "Lee"

// Number 생성자 함수
const numObj = new Number(123);
console.log(typeof numObj); // object
console.log(numObj); // Number {123}
// __proto__: Number
// [[primitiveValue]]: 123

// Boolean 생성자 함수
const boolObj = new Boolean(true);
console.log(typeof boolObj); // object
console.log(boolObj); // Boolean {true}
// __proto__: Boolean
// [[primitiveValue]]: true

// Function 생성자 함수
const func = new Function('x', 'return X * x');
console.log(typeof func); // function
console.dir(func); // ƒ anonymous(x )
//arguments: null
// caller: null
// legnth: 1
// name: "anonymous"
// prototype: {constructor: ƒ}
// __proto__: ƒ ()
// [[Scopes]]: Scopes[2]

// Array 생성자 함수
const arr = new Array(1, 2, 3);
console.log(typeof arr); // object
console.log(arr); // (3) [1, 2, 3]
// 0: 1 1: 2 2: 3
// length: 3
// __proto__: Array(0)

// RegExp 생성자
const regExp = new RegExp(/ab+c/i);
console.log(typeof regExp); // object
console.log(regExp); // /ab+c/i

// Date 생성자 함수
const date = new Date();
console.log(typeof date); // object
console.log(date); // Sat May 11 2019 14:34:32 GMT+0900 (한국 표준시)
```

빈 객체를 생성할 때 반드시 Object 생성자 함수를 사용해야 하는 것은 아니다. 단순히 객체를 생성하기에는 객체 리터럴을 사용하는 것이 더 간편하다. Object 생성자 함수 방식은 특정 상황에서 유용하게 사용할 수 있을 것이다.



## 객체 리터럴에 의한 객체 생성 방식의 문제점

객체 리터럴에 의한 객체 생성 방식은 직관적이고 간편하지만 이 방법은 한 번에 단 하나의 객체만을 생성한다. 따라서 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 매번 같은 프로퍼티를 기술해야 한다. 중복 기술해야 한다는 점이다.

```javascript
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle2.getDiameter()); // 20
```

객체는 프로퍼티를 통해 객체 고유의 상태(state)를 표현하고 메서드를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 동작(behavior)을 표현한다. 즉, 프로퍼티는 객체마다 프로퍼티 값이 다를 수는 있지만 메서드는 내용이 동일한 경우가 일반적이다.

위 코드를 보면 객체 circle1과 circle2는 프로퍼티구조가 동일하다. 객체 고유의 상태인 radius 프로퍼티 값만 다를 뿐, getDiameter 메서드는 완전히 동일하다.

객체 리터럴에 의한 객체 생성 방식은 이런 부분에서 비효율적이다. 프로퍼티 구조가 동일하고 특정 값만 다른 경우, 이것을 객체 리터럴에 의한 객체 생성 방식을 택한다면 매번 같은 프로퍼티와 메서드를 기술해야 하기 때문이다. 수십, 수백 개의 객체를 생성해야 할 때 객체 리터럴에 의한 객체 생성 방식은 불필요한 비용을 치러야 하기 때문에 비효율적이다.



## 생성자 함수에 의한 객체 생성 방식의 장점

생성자 함수를 이용해 객체를 생성하면 마치 객체를 생성하기 위한 템플릿을 사용하는 것처럼 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다. 변경되는 특정 속성만 추가하면 원하는 값을 반환하도록 하는 방법이다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

생성자 함수는 객체(인스턴스)를 생성하는 함수이다. 그러나 클래스 기반 객체지향 언어의 생성자와는 달리 형식이 정해져있지 않고 **일반 함수와 동일한 방법으로 생성자 함수를 정의하고 new 연산자와 함께 호출**한다.

따라서 new 연산자와 함께 호출하지 않으면 생성자 함수가 아니라 일반 함수로 동작하게 된다.

```javascript
// new 연산자 없이 호출하면 TypeError를 반환한다.
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = Circle(5);
const circle2 = Circle(10);

console.log(circle1.getDiameter());
console.log(circle2.getDiameter());
// TypeError: Cannot read property 'getDiameter' of undefined

const circle3 = Circle(15);
console.log(circle3); // undefined
console.log(radius); // 15
```



## 내부 메서드 [[Call]]과 [[Constructor]]

함수 선언문 또는 함수 표현식으로 정의한 함수는 일반적인 함수로서의 동작은 물론 생성자 함수로서 호출할 수도 있다. 또한 함수는 객체이므로 일반 객체와 동일하게 동작한다. 일반 객체와 동일하게 동작한다는 말은 함수 객체 역시 일반 객체의 내부 슬롯과 내부 메서드를 가지고 있다는 것이다.

```javascript
function foo() {}

foo.prop = 10;

foo.method = function () {
  console.log(this.prop);
};

foo.method(); // 10
```

함수 객체는 함수로서 동작하기 위해 일반 객체의 내부 슬롯과 내부 메서드 외에 추가적으로 갖고 있는 내부 슬롯과 내부 메서드가 있다.

내부 메서드 [[Call]]이 구현된 객체를 callable이라 하고, 내부 메서드 [[Constructor]]가 구현되어 있는 객체는 constructor라 한다. constructor의 경우 [[Constructor]]가 구현되어 있지 않은 객체는 non-constructor라고 부른다.

callable은 호출할 수 있는 객체 즉, 함수를 뜻한다.

constructor는 생성자 함수로서 호출할 수 있는 객체를 의미한다. 따라서 constructor는 new 연산자(or super 연산자)와 함께 호출한다.

즉, 일반 함수가 호출되면 [[Call]]이 호출되고 new 연산자(or super 연산자)와 함께 생성자 함수로 호출되면 [[Constructor]]가 호출된다. 호출할 수 없는 객체는 함수 객체가 아니므로 함수 객체는 반드시 callable이어야 한다. 따라서 모든 함수 객체는 [[Call]]이 구현되어 있다. 그러나 [[Constructor]]의 경우 모든 함수 객체가 구현하지 않는다. 따라서 모든 함수 객체는 callable이면서, constructor이거나 non-constructor이다.



## constructor와 non-constructor

자바스크립트 엔진이 사용하는 추상연산(abstract operation)은 함수 정의가 평가될 때 호출된다. 함수 정의 방식에 따라 FunctionCreate의 첫번째 매개변수 kind에 함수의 종류를 나타내는 문자열이 전달된다.

| 구분                                     | 함수의 종류를 나타내는 문자열 |
| ---------------------------------------- | ----------------------------- |
| 일반 함수 정의(함수 선언문, 함수 표현식) | Normal                        |
| 화살표 함수 정의                         | Arrow                         |
| 메서드 정의                              | Method                        |

일반적으로 프로퍼티의 값으로 사용된 함수는 메서드라고 부르지만 ECMAScript 사양에서의 "메서드 정의"는 ES6의 메서드 축약 표현만을 의미한다. 즉, 함수의 정의 방식에 따라 함수의 종류를 구분하는 것이다.

ECMAScript는 일반 함수만을 constructor로 분류한다. 함수의 종류가 Arrow나 Method일 경우 non-constructor로 본다. 즉, 일반 함수로 정의된 함수만이 생성자 함수를 호출할 수 있다.

일반 함수로 정의된 함수는 일반 함수로 호출되면 내부 메서드 [[Call]]을, new 연산자(or super 연산자)와 함께 호출되면 생성자 함수이기 때문에 내부 메서드 [[Constructor]]를 호출한다.

non-constructor인 함수 객체(Arrow, Method)는 내부 메서드 [[Constructor]]가 구현되어 있지 않기 때문에 non-constructor인 함수 객체를 new 연산자로 호출하면 에러가 발생한다.

일반 함수는 생성자 함수로 호출될 것을 기대하고 정의하지 않은 함수라 할지라도 new 연산자를 붙여 호출하면 생성자 함수처럼 동작하게 된다. 따라서 생성자 함수를 호출하려면 첫문자를 대문자로 기술하는 파스칼 케이스를 이용해 일반 함수와 구분해야 가독성이 높아지고 유지 보수가 편리하다.



## 생성자 함수의 동작 방식

생성자 함수는 프로퍼티 구조가 동일한 인스턴스를 생성하기 위한 템플릿으로 동작하는 함수이다. 즉, 생성자 함수는 인스턴스를 생성하고 생성된 인스턴스의 프로퍼티 값을 초기화해야 한다. 전자는 필수, 후자는 옵션이다.

```javascript
function Circle(radius) {
  // 1. 암묵적으로 빈 객체가 생성되고 this에 바인딩(식별자와 값을 연결하는 것)된다.
  // 2. 생성된 빈 객체를 가리키는 this를 사용해 프로퍼티 혹은 메서드를 추가하고, 인수로 전달받은 초기값을 할당하여 초기화하거나 고정값을 할당한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  // 3. 생성자 함수의 내부 처리가 끝나면 암묵적으로 this가 반환된다. 만약 this가 아닌 다른 객체를 명시적으로 리턴하면 this는 무시되고 return 문에 명시한 객체가 반환된다. 그러나 명시적으로 원시 타입의 값을 반환하면 원시 타입은 무시되고 this가 반환된다.
}

// 인스턴스 생성
const circle1 = new Circle(5);
```

생성자 함수는

1. 암묵적으로 빈 객체가 생성되고 this(생성자 함수가 리턴할 객체)에 바인딩 된 후
2. 생성된 빈 객체를 가리키는 this를 사용해 프로퍼티 혹은 메서드를 추가하고, 인수로 전달받은 초기값을 할당해 초기화하거나 고정값을 할당한다.
3. 주의할 점은 생성자 함수의 내부 처리가 끝나면 암묵적으로 this가 반환된다는 것이다. 만약 명시적으로 다른 객체를 return 하면 this는 무시되고 return 문에 명시한 객체가 반환된다. 그러나 예외적으로 원시 타입의 값을 return 문에 명시하면 이 원시 타입 값은 무시되고 this가 반환된다.

따라서 생성자 함수 내부에서 명시적으로 this가 아닌 다른 값을 반환하는 것은 생성자 함수의 기본 동작을 훼손하게 된다. 따라서 생성자 함수 내부에는 return 문을 생략한다.



## new 연산자

일반 함수에 new 연산자를 함께 호출하면 해당 함수는 생성자 함수로 동작한다.

```javascript
function add(x, y) {
  return x + y;
}
let inst = new add();
console.log(inst); // add {}

function createUser(name, role) {
  return { name, role };
}
inst = new createUser('Lee', 'admin');
console.log(inst); // {name: "Lee", role: "admin"}
```

new 연산자 없이 생성자 함수를 호출하면 일반 함수로 호출된다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter(); // TypeError: Cannot read property 'getDiameter' of undefined
```

new 연산자와 함께 생성자 함수를 호출하면 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다. 그러나 해당 함수를 일반 함수로 호출하면 함수 내부의 this는 전역 객체 window를 가리킨다. 따라서 위 코드에서 radius 프로퍼티와 getDiameter 메서드는 전역 객체의 프로퍼티와 메서드가 된다.

일반 함수와 생성자 함수에 형식적 차이가 존재하지 않기 때문에 생성자 함수는 일반적으로 첫문자를 대문자로 기술하는 파스칼 케이스로 명명해 일반 함수와 구분하자.



## new.target

new 연산자 없이 생성자 함수를 호출하는 것을 방지하기 위해 파스칼 케이스 컨벤션을 사용해도 실수가 발생할 수 있기 때문에 ES6에서는 new.target을 지원한다.

new.target은 함수 내부에서 지역 변수와 같이 사용되며 메타 프로퍼티(meta property)라고 부른다. new.target은 함수 내부에서 사용했을 때 함수가 new 연산자와 함께 호출되었는지 여부를 확인할 수 있다. 함수가 new 연산자와 함께 호출되면 함수 내부의 new.target은 함수 자신을 가리킨다. new 연산자 없이 호출된 함수 내부의 new.target은 undefined를 반환한다.

```javascript
function Circle(radius) {
  // new와 함께 호출했으면 문자열
  // new와 함께 호출하지 않았으면 undefined
  // new와 함께 실행되지 않으면(!new.target; true로 평가) if 문을 실행해 위로 올라간다(재귀).
  if (!new.target) {
    return new Circle(radius);
  }
  // new가 없을 경우 재귀 함수를 통해 위로 올라갔다 오기 때문에 if 조건은 false가 된다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

만약 위 코드에서

`  if (!new.target) {
    return new Circle(radius);
  }`  

을 생략한다면 TypeError가 발생한다.



new.target은 ES6에서 도입된 최신 문법으로 IE에서는 지원하지 않는다. 따라서 new.target을 사용할 수 없는 상황이라면 스코프 세이프 생성자(Scope-Safe Constructor) 패턴을 사용할 수 있다.

```javascript
function Circle(radius) {
  if (!(this instanceof Circle)) {
    return new Circle(radius);
  }
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

new 연산자와 함께 생성자 함수에 의해 생성된 객체(인스턴스)는 프로토타입에 의해 생성자 함수와 연결된다. 이를 이용해 new 연산자 함수와 함께 호출되었는지 확인할 수 있다.

대부분의 빌트인 생성자 함수(Object, String, Number, Boolean, Function, Array, Date, RegExp, Promise 등)는 new 연산자와 함께 호출되었는지를 확인한 후 적절한 값을 반환한다.

예를 들어 `Object` 또는 `Function` 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 동작한다.

```javascript
let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}

let f = new Function('x', 'return x ** x');
console.log(f); // ƒ anonymous(x) {return x ** x}

f = Function('x', 'return x ** x');
console.log(f); // ƒ anonymous(x) {return x ** x}
```

그러나 `String` 생성자 함수는 new 연산자와 함께 호출했을 때 String 객체를 생성해 반환하지만 new 연산자 없이 호출하면 문자열 리터럴을 반환한다. 문자열로 타입을 변환(형변환 해서 원시값 리턴)하는 것이다.

```javascript
let s = new String('abc');
console.log(s); // String {"abc"}

s = String('abc');
console.log(s); // abc
```

