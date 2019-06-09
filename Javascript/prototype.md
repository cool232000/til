# 프로토타입

> 자바스크립트는 명령형(Imperative), 함수형(Functional), 프로토타입 기반(Prototype-based) 객체 지향 프로그래밍(OOP, Object Oriented Programming)을 지원하는 멀티 패러다임 프로그래밍 언어이다.

자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 모든 것이 객체이다. 자바스크립트에서 객체가 아닌 것은 원시 타입 값 뿐이다.

일반적으로 객체 지향이라 함은 클래스 기반 객체 지향을 말한다. 템플릿을 만들어놓고 객체를 뽑아내는 형식이다.

객체 지향형은 기본적으로 모든 것을 객체로 본다. 객체가 독립적으로 존재하면 의미가 없고 상속 등의 서로 상호작용(데이터를 주고 받는 등)을 해야 한다.

자바스크립트는 객체를 동적으로 생성, 변경, 삭제할 수 있고 객체를 만든 후에도 프로퍼티를 추가, 삭제, 생성할 수 있다. 자바스크립트는 객체 지향형이면서도 유연하다. 따라서 퍼포먼스가 떨어진다.

```javascript
클래스(Class)
ES6에서 클래스라는 객체 생성 방법이 추가되었다. 객체 생성을 어떻게 할 것이냐는 것은 어떤 프레임워크를 쓰느냐에 따라 다르다. 앵귤러는 백퍼센트 클래스이고, 리액트는 간단한 것은 생성자 함수를 사용하고 복잡한 것은 클래스를 사용한다.
클래스가 새로운 방식이냐? 아니다. 겉으로 보기에는 클래스 기반 언어처럼 동작하는 형태로 보이지만 실제로 클래스는 function 이다. 따라서 클래스를 문법적 설탕(Syntactic suger)라고 부르기도 한다. 그러나 단순히 문법적 설탕이라고 보기 어려운 것은 클래스가 다른 함수보다 문법이 엄격하다는 점 때문이다.
```



## 객체지향 프로그래밍

객체지향 프로그래밍(Object Oriented Programming, OOP)은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍(Imperative programming)의 절차지향적 관점에서 벗어나 프로그램을 여러 개의 독립적 단위 즉, 객체들의 집합으로 표현하려는 프로그래밍 패러다임을 말한다.

사람이 어떤 사물이나 개념을 이해할 때 속성(attribute, property)으로 이해하는 것처럼 프로그래밍 역시 다양한 속성 중에서 프로그램에 필요한 속성만을 간추려 표현할 수 있다. 이것을 추상화라고 한다.

```javascript
// 이름과 주소를 속성으로 갖는 객체
const person = {
  name: 'Lee',
  address: 'Seoul'
};

console.log(person); // {name: "Lee", address: "Seoul"}
```

객체지향 프로그래밍은 객체의 상태를 나타내는 데이터와 상태 데이터(메서드; 바뀌는 값)를 조작할 수 있는 동작을 하나의 논리적인 단위로 묶어서 생각한다. 이때 `상태 데이터와 동작을 하나의 논리적인 단위로 묶은 복합적인 자료 구조`를 `객체`라 한다. 객체의 상태 데이터를 프로퍼티, 동작을 메서드라고 부른다.

```javascript
const circle = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  },
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },
  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
};

console.log(circle); // {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}
console.log(circle.getDiameter()); // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea()); // 78.53981633974483
```

각각의 객체는 고유의 기능을 갖는 독립적인 부품이면서도 고유한 기능을 수행하면서 다른 객체와 관계성을 가질 수 있다. 또, 다른 객체와 메시지를 주고 받거나 데이터를 처리하기도 하고, 다른 객체의 상태 데이터나 동작을 상속받아 사용하기도 한다.



## 상속과 프로토타입

`상속(inheritance)`은 객체지향 프로그래밍의 핵심 개념으로 `상위 객체의 프로퍼티 또는 메서드를 하위 객체가 상속받아 그대로 사용할 수 있는 것`이다.

```javascript
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    return Math.PI * Math.pow(this.radius, 2);
  };
}

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // false (각각 소유)
console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

생성자 함수는 동일한 프로퍼티 구조를 갖는 객체를 여러 개 생성할 때 유용하다.

그러나 위 코드를 보면, Circle 생성자 함수가 생성하는 모든 객체(인스턴스)는 radius 프로퍼티와 getArea 메서드를 갖는다. radius 프로퍼티 값은 각각 다르지만 getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용한다. 그러나 위 코드에서는 Circle 생성자 함수가 인스턴스를 생성할 때마다 getArea 메서드가 중복 생성되고 모든 인스턴스가 각각 소유(중복 소유)한다.

일반 함수를 사용하지 않고 생성자 함수를 사용했던 것처럼, 모든 인스턴스가 동일한 메서드를 중복 소유하는 것은 메모리를 불필요하게 차지하는 결과를 낳고, 매번 메서드를 새로 생성하며 퍼포먼스가 나빠지게 된다.

이런 경우에 `자바스크립트의 프로토타입(prototype) 기반으로 상속을 구현`하면 된다. 따라서 자바스크립트는 프로토타입 기반 객체 지향 언어이다.

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// 프로토타입에 getArea 메서드를 추가해 모든 인스턴스가 Circle.prototype으로부터 getArea 메서드를 상속받도록 한다. 모든 인스턴스는 getArea 메서드를 공유한다.
Circle.prototype.getArea = function () {
  return Math.PI * Math.pow(this.radius, 2);
};

const circle1 = new Circle(1);
const circle2 = new Circle(2);

console.log(circle1.getArea === circle2.getArea); // true (공유)
console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```



## 프로토타입 객체

프로토타입 객체란 객체 지향 프로그래밍의 근간을 이루는 객체간 상속을 구현하기 위해 사용된다. 프로토타입은 객체의 상위 역할을 하는 객체로서 다른 객체에 공유 프로퍼티와 메서드를 제공한다. 상속받은 하위 객체는 상위 객체의 프로퍼티를 자유롭게 사용할 수 있다.

`모든 객체는 [[prototype]]이라는 내부 슬롯을 갖는다.` 따라서 모든 객체는 하나의 프로토타입을 가지며, 프로토타입은 객체의 생성 방식에 의해 결정된다. 내부 슬롯은 보호되어 있기 때문에 접속하면 안 되고 접속해야 할 필요가 있는 것을 부분적으로 허가해놓았다. 접근자 프로퍼티를 쓰면 내부 슬롯에 접근할 수 있다.

객체 리터럴에 의해 생성된 객체의 프로토타입은 Object.prototype이고, 생성자 함수를 통해 생성된 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩된다.

모든 객체는 하나의 프로토타입을 갖고, 프로토타입은 null이거나 객체이다. 또, 모든 프로토타입은 생성자 함수와 연결되어 있다. 객체와 프로토타입과 생성자 함수는 서로 연결되어 있다.

1. 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입인 [[prototype]] 내부 슬롯이 가리키는 객체에 접근할 수 있다.
2. 프로토타입은 constructor 프로퍼티를 통해 생성자 함수에 접근한다.
3. 생성자 함수는 prototype 프로퍼티를 통해 프로토타입에 접근한다.



### 객체의 `__proto__` 접근자 프로퍼티

모든 객체는 `__proto__` 접근자 프로퍼티를 통해 자신의 프로토타입인 [[prototype]] 내부 슬롯에 접근할 수 있다. 모든 객체는 상속에 의해 접근자 프로퍼티를 사용할 수 있다.

```javascript
const person = { name: 'Lee' };
```

![__proto__ 접근자 프로퍼티](https://imgur.com/UChGL8V.jpg)

`__proto__`는 접근자 프로퍼티를 통해 person 객체의 [[prototype]] 내부 슬롯이 가리키는 객체인 Object.prototype에 접근한다. 내부 슬롯은 프로퍼티가 아니기 때문에 직접 접근할 수 있는 방법은 없다. 다만 `__proto__` 접근자 프로퍼티를 통해 간접적으로 [[prototype]] 내부 슬롯의 값인 프로토타입에 접근할 수 있다.

접근자 프로퍼티는 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티이다. Object.prototype의 프로퍼티인 `__proto__` 접근자 프로퍼티는 getter/setter 함수라고 부르는 함수를 통해 프로토타입을 취득하거나 할당한다.

`__proto__`접근자 프로퍼티를 통해 프로토타입에 접근하면 내부적으로 `__proto__` 접근자 프로퍼티의 getter 함수인 `get__proto__`가 호출되고, 새로운 프로토타입을 할당하면 `__proto__` 접근자 프로퍼티의 setter 함수인 `set__proto__`가 호출된다.

```javascript
const obj = {};
const parent = { x: 1 };

// getter 함수인 get__proto__ 호출해 객체의 프로토타입 취득
obj.__proto__;
// setter 함수인 set__proto__ 호출해 객체의 프로토타입 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
```



그러나 코드 내에서 `__proto__`를 직접 사용하는 것은 좋은 방법이 아니다. 대신 프로토타입의 참조를 취득할 경우에는 `Object.getPrototypeOf` 메서드를, 프로토타입을 교체하는 경우에는 `Object.setPrototypeOf` 메서드를 사용하는 것이 좋다.

```javascript
const obj = {};
const parent = { x: 1 };

Object.getPrototypeOf(obj);
Object.setPrototypeOf(obj, parent);

console.log(obj.x); // 1
```

`Object.getPrototypeOf` 메서드는 `getObject.prototype.__proto__`와 일치하고,

`Object.setPrototypeOf` 메서드는 `setObject.prototype.__proto__`와 일치한다.



`__proto__` 접근자 프로퍼티는 객체가 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티이다. 모든 객체는 상속을 통해 `Object.prototype.__proto__` 접근자 프로퍼티를 사용할 수 있다.

```javascript
// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티이다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 자유롭게 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여있다. 자바스크립트는 객체의 프로퍼티나 메서드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `__proto__` 접근자 프로퍼티가 가리키는 링크를 따라 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 프로토타입 체인의 종점인 최상위 객체는 Object.prototype이며 이 객체는 모든 객체에게 상속된다.



`__proto__` 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유는 무엇일까?

```javascript
const parent = {};
const child = {};

child.__proto__ = parent; // {} >> 프로토타입을 갈아끼우는 것: 갈아끼울 수 있다.
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

만약 parent 객체를 child 객체의 프로토타입으로 지정한 후, child 객체를 parent 객체의 프로토타입으로 지정하는 위 코드가 정상적으로 처리되면 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어진다. 따라서 `__proto__` 접근자 프로퍼티는 에러를 발생한다.

따라서 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다. 만약 순환 참조 프로토타입 체인이 만들어지면 종점이 존재하지 않기 때문에 무한 루프에 빠진다.



### 함수 객체의 prototype 프로퍼티

함수 객체는 `__proto__` 접근자 프로퍼티 이외에 prototype 프로퍼티도 소유한다. 함수 객체의 prototype 프로퍼티는 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다.

`prototype 프로퍼티는 함수 객체만이 소유하는 프로퍼티이다. 일반 객체에는 prototype 프로퍼티가 없다.` 

```javascript
console.log((function () {}).hasOwnProperty('prototype')); // true

console.log({}.hasOwnProperty('prototype')); //false
```

prototype 프로퍼티는 함수가 객체를 생성하는 생성자 함수로서 사용될 때 생성자 함수가 생성할 인스턴스의 프로토타입을 가리킨다(Person 생성자 함수라면 Person.prototype). prototype은 생성자 함수로 호출되는 인스턴스에서만 유효하다.

따라서 생성자 함수로서 호출할 수 없는 함수인 Arrow, Method 함수는 non-constructor로 프로토타입이 생성되지 않으며 prototype 프로퍼티도 소유하지 않는다.

```javascript
// Arrow 함수 (화살표)
const Person = name => {
  this.name = name;
};

console.log(Person.prototype); // undefined
console.log(Person.hasOwnProperty('prototype')); // false

// Method 함수 (축약 표현)
const obj = {
  foo() {}
};

console.log(obj.foo.prototype); // undefined
console.log(obj.foo.hasOwnProperty('prototype')); // flase
```



모든 객체가 가지고 있는 `__proto__` 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 동일한 프로토타입을 가리키지만 프로퍼티의 주체가 다르다.

| 구분                        | 소유      | 값                | 사용 주체   | 사용 목적                                                    |
| --------------------------- | --------- | ----------------- | :---------- | ------------------------------------------------------------ |
| `__proto__` 접근자 프로퍼티 | 모든 객체 | 프로토타입 참조   | 모든 객체   | 모든 객체가 상속을 위해 자신의 프로토타입에 접근하기 위해 사용 |
| prototype 프로퍼티          | 함수 객체 | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 인스턴스의 프로토타입을 할당하기 위해 사용 |

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

console.log(Person.prototype === me.__proto__); // true
```

위 코드에서 생성자 함수 인스턴스의 `Person.prototype`과 객체 me의 `me.__proto__`는 동일하다.



### 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 프로토타입은 constructor 프로퍼티를 갖는다. 이 constructor 프로퍼티는 Prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킨다.

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

console.log(me.constructor === Person); // true
```

위 코드에서 Person 생성자 함수는 me 객체를 생성했다. 이때 me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결된다.  me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있다. 따라서 me 객체는 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있다.



## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다. 생성자 함수는 연결된 인스턴스를 생성한 생성자 함수이다.

```javascript
const obj = new Object();

const add = new Function('a', 'b', 'return a + b');

function Person(name) {
  this.name = name;
}

const me = new Person('Lee');
```

그러나 명시적으로 new 연산자와 함께 생성자 함수를 호출해 인스턴스를 생성하지 않는 객체 생성 방식도 있다.

```javascript
const obj = {};

const add = function (a, b) { return a + b; };

const arr = [1, 2, 3];

const regexr = /is/ig;
```

리터럴 표기법에 의해 생성된 객체도 프로토타입이 존재한다. 그러나 리터럴 표기법에 의해 생성된 객체의 경우 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수 없다.

```javascript
const obj = {};

console.log(obj.constructor === Object); // true
```

위 코드에서 obj는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴에 의해 생성된 객체이다. 그러나 객체 obj는 Object 생성자 함수와 constructor 프로퍼티로 연결되어 있다. Object 생성자 함수가 실제로는 객체를 만들지 않았지만 생성한 것처럼 보인다. 서로 연결되어 있고 실제로 생성한 것처럼 동작한다.

Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다. 또한 인수가 전달되지 않았을 때 추상 연산을 호출하여 빈 객체를 생성한다. 인수가 전달되었다면 인수를 객체로 변환한다.

```javascript
let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}

obj = new Object(123);
console.log(obj); // Number {123}

obj = new Object('123');
console.log(obj); // String {"123"}
```

Object 생성자 함수와 객체 리터럴은 추상 연산을 호출해 빈 객체를 생성하는 것까지는 동일하지만 new.target 확인이나 프로퍼티를 추가하는 처리 등의 세부 내용이 다르다. 따라서 객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.



함수 객체의 경우 Function 생성자 함수 방식으로 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않는다. 이것은 함수 선언문과 함수 표현식을 평가해 함수 객체를 생성한 것은 Function 생성자 함수가 아니라는 뜻이다.

```javascript
function foo() {}

console.log(foo.constructor === Function); // true
```

그러나 위 코드에서 보다시피 리터럴 표기법에 의해 생성된 함수 객체도 상속을 위해서 프로토타입이 필요하다. 따라서 가성의 생성자 함수를 갖게 된다. 프로토타입은 생성자 함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다. 결국 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.

물론 리터럴 표기법에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체가 아니다. 그러나 객체 리터럴에 의해 생성한 객체와 Object 생성자 함수에 의해 생성한 객체는 생성 과정에서의 차이는 있지만 결국 객체로서 동일한 특성을 갖는다. 함수 리터럴에 의해 생성한 함수와 Function 생성자 함수에 의해 생성한 함수는 생성 과정과 스코프, 클로저 등의 차이는 있지만 결국 함수로서 동일한 특성을 갖는다.

즉 프로토타입의 constructor 프로퍼티로 연결된 생성자 함수를 리터럴 표기법으로 생성한 생성자 함수와 동일하다고 봐도 무방하다.

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| ------------------ | ----------- | ------------------ |
| 객체 리터럴        | Object      | Object.prototype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.prototype   |



## 프로토타입의 생성 시점

모든 객체는 생성자 함수와 연결되어 있다. 생성자 함수는 사용자가 직접 정의한 사용자 정의 생성자 함수와 자바스크립트가 기본적으로 제공하는 빌트인 생성자 함수로 구분할 수 있다. 프로토타입은 생성자 함수가 생성되는 시점에 생성된다.



### 사용자 정의 생성자 함수와 프로토타입 생성 시점

내부 메서드 [[Constructor]]가 구현되어 있는 함수 객체는 new 연산자와 함께 생성자 함수로서 호출할 수 있다. 생성자 함수로 호출할 수 있는 함수인 constructor는 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성한다.

```javascript
console.log(Person.prototype); // {constructor: ƒ}

function Person(name) {
  this.name = name;
}

const Person = name => {
  this.name = name;
};

console.log(Person.prototype); // undefined
```

함수 선언문은 런타임 이전에 평가되어 함수 객체가 된다. 이때 프로토타입도 함께 생성되어 생성자 함수의 prototype 프로퍼티에 바인딩 된다.

생성된 프로토타입은 constructor 프로퍼티만 갖는 객체이다. 프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 프로토타입도 자신의 프로토타입을 갖는다. 생성된 프로토타입의 프로토타입은 Object.prototype이다.

`사용자 정의 생성자 함수는 자신이 평가되어 함수 객체로 생성되는 시점에 프로토타입도 더불어 생성되고, 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.`



### 빌트인 생성자 함수와 프로토타입 생성 시점

빌트인 생성자 함수에는 Object, String, Number, Function, Array, RegExp, Date, Promise가 있다. 빌트인 생성자 함수 역시 일반 함수처럼 빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성된다. 따라서 빌트인 생성자 함수는 전역 객체가 생성되는 시점에 생성되므로 누구보다 먼저 생성된다. 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩 된다.

엄밀하게 말하면, 전역 객체는 다른 빌트인 객체를 포함하는 객체이므로 다른 빌트인 객체가 생성되기 전에 먼저 생성되어야 한다. 전역 객체가 생성되고 나면 빌트인 객체가 생성되며, 프로퍼티로 추가된다.

때문에 객체가 생성되기 이전에 생성자 함수와 프로토타입은 이미 객체화되어 존재한다. 이후 생성자 함수 또는 리터럴 표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[prototype]] 내부 슬롯에 할당된다. 이렇게 생성된 객체는 프로토타입을 상속받게 되는 것이다.



## 객체 생성 방식과 프로토타입의 결정

객체는 객체 리터럴, Object 생성자 함수, 생성자 함수, Object.create 메서드, 클래스(ES6)와 같이 다양한 방식으로 생성된다. 세부적인 객체 생성 방식에는 차이가 있지만 추상 연산 ObjectCreate에 의해 생성된다는 공통점이 있다.

추상 연산 ObjectCreate는 필수적으로 자신이 생성할 객체의 프로토타입을 인수로 전달받는다. 즉, 추상 연산 ObjectCreate는

1. 객체를 생성한 후
2. 인수로 전달받은 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부 슬롯에 할당하고
3. 생성한 객체를 반환

한다. 따라서 프로토타입은 추상 연산 ObjectCreate에 전달되는 인수(proto)에 의해 결정된다. 또한 인수는 객체가 생성되는 시점에 객체 생성 방식에 의해 결정된다. 결국 객체가 생성되는 시점에 생성된 인수가 추상 연산에 전달되어 프로토타입을 결정하는 것이다.



### 객체 리터럴에 의해 생성된 객체의 프로토타입

자바스크립트 엔진은 객체 리터럴을 평가하여 객체를 생성하는 '런타임'에 추상 연산 ObjectCreate를 호출한다. 이때 추상 연산 ObjectCreate에 전달되는 포로토타입은 Objecte.prototype이다. 즉, 객체 리터럴에 의해 생성되는 객체의 프로토타입은 Objecte.prototype이라고 볼 수 있다.

객체 리터럴이 평가되면 추상 연산 ObjectCreate에 의해 Object 생성자 함수, Object.prototype, 생성된 객체 사이에 연결이 만들어진다.

평가된 객체는 Object.prototype을 프로토타입으로 갖게 되면서 Object.prototype을 상속받는다. 물론 평가된 객체가 constructor 프로퍼티와 hasOwnProperty 메서드 등을 소유하지 않지만 자신의 프로토타입인 Object.prototype의 constructor 프로퍼티와 hasOwnProperty 메서드를 자신의 자신처럼 사용할 수 있다. Object.prototype을 상속받았기 때문이다.

```javascript
const obj = { x: 1 };

console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```



### Object 생성자 함수에 의해 생성된 객체의 프로토타입

명시적으로 호출한 Object 생성자 함수는 빈 객체를 생성한다. Object 생성자 함수를 호출하면 객체 리터럴과 마찬가지로 추상 연산 ObjectCreate를 호출한다. 이때 추상 연산 ObjectCreate에 전달되는 포로토타입은 Objecte.prototype이다. 즉, 객체 리터럴에 의해 생성된 객체와 동일한 구조를 갖는다.

Object 생성자 함수가 평가되면 추상 연산 ObjectCreate에 의해 Object 생성자 함수, Object.prototype, 생성된 객체 사이에 연결이 만들어진다.

```javascript
const obj = new Object();
obj.x = 1;

console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true
```



### 생성자 함수에 의해 생성된 객체의 프로토타입

new 연산자와 함께 생성자 함수를 호출해 인스턴스를 생성하면 다른 객체 방식과 마찬가지로 추상 연산 ObjectCreate를 호출한다. 이때 추상연산 ObjectCreate에 전달되는 프로토타입은 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체이다.

빌트인 객체인 Object 생성자 함수와 더불어 생성된 프로토타입 Object.prototype은 다양한 빌트인 메서드(hasOwnProperty, propertyIsEnumerable 등)를 갖고 있다. 하지만 사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입의 프로퍼티는 constructor 뿐이다.

따라서 생성자 함수에 의해 생성된 객체의 프로토타입은 프로퍼티를 추가해 하위 객체가 상속받을 수 있도록 구현할 수 있다. 프로토타입은 객체이기 때문에 일반 객체와 마찬가지로 프로퍼티를 추가/삭제할 수 있다.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('kim');

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is kim
```

Person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메서드를 상속받아 자신의 메서드처럼 사용할 수 있다.



## 프로토타입 체인

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

console.log(me.hasOwnProperty('name')); // true
```

Person 생성자 함수에 의해 생성된 me 객체는 Object.prototype의 메서드인 hasOwnProperty를 호출할 수 있다. me 객체는 Person.prototype 뿐만 아니라 Object.prototype을 상속받았다는 의미이다.

```javascript
console.log(Object.getPrototypeOf(me) === Person.prototype); // true

console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
```

Person.prototype의 프로토타입은 Object.prototype이다. 프로토타입의 프로토타입은 언제나 Object.prototype이다.

즉, **Object.prototype > Person.prototype > me 객체**이다.

자바스크립트는 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 `__proto__` 접근자 프로퍼티가 가리키는 링크를 따라 부모 역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 이것을 `프로토타입 체인`이라고 한다. 프로토타입 체인은 자바스크립트가 객체 지향 프로그래밍의 상속을 구현하는 메커니즘이다.



`me.hasOwnProperty('name')`과 같은 메서드(혹은 프로퍼티)를 호출하면 자바스크립트 엔진은 다음과 같이 검색한다.

1. hasOwnProperty 메서드를 호출한 me 객체에서 hasOwnProperty 메서드를 검색한다. me 객체에는 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라 Person.prototype으로 이동해 hasOwnProperty 메서드를 검색한다.
2. Person.prototype에도 hasOwnProperty 메서드가 없으므로 프로토타입 체인을 따라 Object.prototype으로 이동해 hasOwnProperty 메서드를 검색한다.
3. Object.prototype에는 hasOwnProperty 메서드가 존재하기 때문에 자바스크립트 엔진은 Object.prototype.hasOwnProperty 메서드를 호출한다. 이때 Object.prototype.hasOwnProperty 메서드의 this에는 me 객체가 바인딩된다.

```javascript
Object.prototype.hasOwnProperty.call(me, 'name');
```

4. 프로토타입 체인의 종점인 Object.prototype에서도 프로퍼티를 검색할 수 없다면 undefined를 반환한다. 에러가 발생하지 않는다.

```javascript
console.log(me.foo); // undefined
```

즉, 프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 결국 모든 객체는 Object.prototype을 상속받는다. 때문에 Object.prototype을 프로토타입 체인의 종점(End of prototype chain)이라 한다.

Object.prototype이 프로토타입 체인의 종점에 위치하기 때문에 Object.prototype의 프로토타입, [[Prototype]] 내부 슬롯의 값은 null이다. null 값이 나오면 종점까지 올라갔다는 뜻이므로 거슬러 올라가는 것을 멈춘다.



자바스크립트 엔진은 프로토타입 체인을 따라 프로퍼티/메서드를 검색한다. 프로토타입은 계층적인 구조로 이루어져 객체 간에 상속 관계를 가진다. 따라서 `프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘`이라고 볼 수 있다.

반면, '스코프' 파트에서 주지했다시피 식별자는 프로토타입 체인이 아닌 스코프 체인에서 검색한다. 즉, 자바스크립트 엔진은 식별자를 검색할 때 스코프의 계층적 구조(함수의 중첩 관계로 이루어짐)에서 식별자를 검색한다. 따라서 `스코프 체인은 식별자 검색을 위한 메커니즘`이라고 볼 수 있다.

```javascript
me.hasOwnProperty('name');
```

me는 식별자이므로, 위 코드는 먼저 스코프 체인에서 식별자 me를 검색하게 된다. 식별자 me는 전역 변수이므로 전역 스코프에서 검색된다. 자바스크립트 엔진은 식별자 me를 검색한 다음, me 객체의 프로토타입 체인에서 hasOwnProperty 메서드를 검색한다.

스코프 체인과 프로토타입 체인은 각각 동작하는 별도의 메커니즘이 아니다. 자바스크립트 엔진 내에서 유기적으로 협력해 식별자와 프로퍼티를 찾아낸다.



## 캡슐화

```javascript
const Person = (function () {
  
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }
  
  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };
  
  // 생성자 함수 반환
  return Person;
}());

const me = new Person('Lee');
```

위 코드처럼 즉시 실행 함수를 사용해 생성자 함수와 프로토타입을 확장하는 코드를 하나의 함수 내에 깔끔하게 모을 수 있다. 그러나 위 코드는 외부에서 내부로 접근해 값을 변경할 수 있다. 값을 아무나 변경하지 못하게 하려면 캡슐화를 사용해야 한다.

캡슐화(encapsulation)란 정보의 일부를 외부로부터 감추어 은닉하는 것을 말한다. 즉, 외부에 공개할 필요가 없는 구현의 일부를 외부에 노출되지 않도록 감추어 적절하지 못한 접근으로부터 정보를 보호하고 객체 간의 상호의존성(결합도)을 낮추는 효과를 얻는다.

자바스크립트는 클래스를 정의하고 그것을 구성하는 멤버에 대해 접근 제한자를 선언해 노출 범위를 한정할 수 있는 Java와는 달리 접근 제한자를 제공하지 않는다. 그러나 캡슐화가 불가능한 것은 아니다.

```javascript
me.name = 'kim';
me.sayHello(); // Hi! My name is kim
```

위 코드의 name 프로퍼티는 외부에 노출되어 있기 때문에 자유롭게 변경할 수 있다.

이 name 프로퍼티를 캡슐화해 외부에 노출되지 않도록 수정할 수 있다.

```javascript
const Person = (function () {
  
  // 자유 변수 (Person 내부에서만 유효한 지역 변수)
  let _name = '';
  
  // 생성자 함수
  function Person(name) { _name = name; }
  
  // 프로토타입 메서드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${_name}`);
  };
  
  // 생성자 함수 반환
  return Person;
}());

const me = new Person('Lee');

// name 프로퍼티는 외부에서 접근 및 변경할 수 없는 private 프로퍼티가 되었다.
me.name = 'Kim';
me.sayHello(); // Hi! My name is Lee
```

자유 변수를 추가해 name 프로퍼티를 보호하고, 지역 변수 _name의 값만 접근 및 변경할 수 있게 되었다.

자바스크립트는 클로저로 캡슐화를 한다.



## 오버라이딩과 프로퍼티 쉐도잉

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };
  return Person;
}());

const me = new Person('Lee');
me.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

me.sayHello(); // Hi! My name is Lee
```

위 코드는 생성자 함수로 객체(인스턴스)를 생성한 다음, 인스턴스에 메서드를 추가했다.

프로토타입이 소유한 프로퍼티(메서드 포함)를 프로토타입 프로퍼티, 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라고 부른다.

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰지 않고 인스턴스 프로퍼티가 추가된다. 이때 인스턴스 메서드 sayHello는 프로토타입 메서드 sayHello를 오버라이딩(상위 클래스가 가지고 있는 메서드를 하위 클래스가 재정의)하였고, 프로토타입 메서드 sayHello는 가려진다.

```javascript
// 인스턴스 메서드 삭제
delete me.sayHello;
me.sayHello(); // Hi! My name is Lee
// 프로토타입에 동일한 이름을 가진 메서드가 있으므로 인스턴스 메서드가 삭제된 후에는 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색해 값을 반환한다.

// 프로토타입 메서드 삭제
delete me.sayHello;
me.sayHello(); // Hi! My name is Lee
// 하위 객체에서 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다.
```

인스턴스에서 인스턴스 메서드를 삭제하는 것은 가능하지만 프로토타입 메서드를 삭제하는 것은 불가능하다. 프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 직접 접근해야 핸다.

```javascript
Person.prototype.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```



## 프로토타입의 교체

프로토타입은 다른 임의의 객체로 변경할 수 있다. 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 뜻이다. 이런 특징을 활용해 객체 간의 상속 관계를 동적으로 변경할 수 있다.



### 생성자 함수에 의한 프로토타입 교체

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };
  return Person;
}());

const me = new Person('Lee');
```

프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다. me 객체의 생성자 함수는 Person이 아닌 Object가 검색된다. 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 링크가 끊긴다.

```javascript
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

끊긴 constructor 프로퍼티를 생성자 함수와 다시 링크하려면 프로토타입으로 교체한 객체 리터럴에 constructor 프로퍼티를 추가하면 된다.

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 연결
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };
  return Person;
}());

const me = new Person('Lee');

console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false
```



### 인스턴스에 의한 프로토타입의 교체

프로토타입은 생성자 함수의 prototype 프로퍼티 뿐만 아니라 인스턴스의 `__proto__` 접근자 프로퍼티로 접근할 수 있다. 따라서 인스턴스의 `__proto__` 접근자 프로퍼티(또는 Object.setPrototypeOf 메서드)를 통해 프로토타입을 교체할 수 있다.

생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩하는 것은 미래에 생성할 인스턴스의 프로토타입을 교체하는 것이지만 `__proto__` 접근자 프로퍼티를 통해 프로토타입을 교체하는 것은 이미 생성된 객체의 프로토타입을 교체하는 것이다.

```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};
// me 객체의 프로토타입을 parent 객체로 교환한다.
Object.setPrototypeOf(me, parent);
me.sayHello(); // Hi! My name is Lee
```

생성자 함수에 의한 프로토타입 교체와 마찬가지로 프로토타입으로 교체한 객체는 constructor 프로퍼티가 없다.

```javascript
console.log(me.constructor === Person); // false
console.log(me.constructor === Object); // true
```

따라서 인스턴스에 의한 프로토타입 교체도 constructor 프로퍼티와 생성자 함수 간의 링크를 끊는다.

그러나 생성자 함수에 의한 프로토타입 교체와 인스턴스에 의한 프로토타입 교체는 주요한 차이가 있다. 생성자 함수에 의한 프로토타입 교체를 할 때는 Person 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다. 그러나 인스턴스에 의한 프로토타입 교체를 할 때는 Person 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키지 않는다.

따라서 인스턴스에 의해 프로토타입을 교체할 때는, 교체한 객체 리터럴에 constructor 프로퍼티를 추가하고 생성자 함수의 prototype 프로퍼티를 재설정해 연결을 되살려야 한다.

```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');
// 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 연결
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

//생성자 함수 prototype 프로퍼티와 프로토타입을 연결
Person.prototype = parent;
// me 객체의 프로토타입을 parent 객체로 교체
Object.setPrototypeOf(me, parent);
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수가 잘 연결되었다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입과 연결되었다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```



## instanceof 연산자

`instanceof` 연산자는 이항 연산자로 좌변에 객체를 가리키는 식별자, 우변에 생성자 함수를 가리키는 식별자를 피연산자로 받는다. 만약 우변의 피연산자가 함수가 아닐 경우 TypeError가 발생한다.

```javascript
객체 instanceof 생성자 함수
```

좌변의 객체가 우변의 생성자 함수와 연결된 인스턴스라면 true

그렇지 않으면 false로 평가된다. instanceof 연산자는 상속 관계를 고려한다.

```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
```

위 코드에서 me 함수는 Person 생성자 함수를 통해 생성된 인스턴스이다.

instanceof 연산자는 Object.prototype을 상속받기 때문에 둘 다 true이다.

```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');
const parent = {};

Object.setPrototypeOf(me, parent);

console.log(me instanceof Person); // false
console.log(me instanceof Object); // true
```

위 코드에서 me 객체는 Person.prototype과 연결이 끊기고 parent 객체와 연결되었다. 따라서 instanceof 연산자를 사용하면 Person과는 false, Object와는 true가 반환된다.

교체된 parent 객체에는 constructor 프로퍼티가 없기 때문에 프로토타입과 생성자 함수의 링크가 파괴되었다. 그렇다면 교체된 프로토타입의 constructor 프로퍼티가 생성자 함수를 가리키도록 하면 어떨까?

```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');

const parent = {
  constructor: Person
};

Object.setPrototypeOf(me, parent);

console.log(me instanceof Person); // false
console.log(me instanceof Object); // true
```

여전히 `me instanceof Person` 의 값은 false이다. 그렇다면 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키도록 해보자.

```javascript
function Person(name) {
  this.name = name;
}
const me = new Person('Lee');

const parent = {
  constructor: Person
};

Person.prototype = parent;

Object.setPrototypeOf(me, parent);

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
```

이번에는 `me instanceof Person` 의 값이 true이다.

instanceof 연산자는 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라 프로토타입 체인 상에 존재하는 프로토타입에 영향받는다.

`instanceof 연산자는 생성자 함수의 prototype 프로퍼티가 가리키는 객체가 프로토타입 체인 상에 존재하는지 확인한다.` 좌변 피연산자의 프로토타입 체인 상에 우변의 피연산자 즉, 생성자 함수의 prototype 프로퍼티에 바인딩된 객체가 존재하는지 검색하는 것이다.

따라서 me instanceof Person의 경우, me 객체의 프로토타입 체인 상에서 Person.prototype에 바인딩 된 객체가 존재하는지 확인한다.

me instanceof Object 역시 마찬가지다. me 객체의 프로토타입 체인 상에 Object.prototype에 바인딩된 객체가 존재하는지 확인한다.

```javascript
function isInstanceof(instance, constructor) {
  const prototype = Object.getPrototypeOf(instance);
  if (prototype === null) return false;
  
  return prototype === constructor.prototype ? true : isInstanceof(prototype, constructor);
}
console.log(isInstanceof(me, Person)); // true
console.log(isInstanceof(me, Object)); // ture
console.log(isInstanceof(me, Array)); // false
```

생성자 함수에 의해 프로토타입이 교체되어 constructor 프로퍼티와 생성자 함수 간의 링크가 파괴된 경우 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 링크는 파괴되지 않으므로 instanceof는 아무런 영향을 받지 않는다.

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };
  return Person;
}());

const me = new Person('Lee');

console.log(me instanceof Person); // true
console.log(me instanceof Object); // true
```



## Object.create에 의한 직접 상속

```javascript
// 프로토타입이 null 값인 객체 생성
// 생성된 객체는 프로토타입의 종점에 위치하므로 프로토타입 체인이 생성되지 않는다.
// obj -> null
let obj = Object.create(null);
console.log(Object.getPrototypeOf(obj) === null); // true

// obj = {}
// obj -> Object.prototype -> null
obj = Object.create(Object.prototype);
console.log(Object.getPrototypeOf(obj) === Object.prorotype); // false

// obj = { x: 1 };
// obj -> Object.prototype -> null
obj = Object.create(Object.prototype, {
  x: { value: 1}
});
// obj = Object.create(Object.prototype);
// obj.x = 1;

console.log(obj.x); // 1
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

const myProto = { x: 10 };
// 객체를 직접 상속받는다.
// obj -> myProto -> Object.prototype -> null
obj = Object.create(myProto);

console.log(obj.x); // 10
console.log(Object.getPrototypeOf(obj) === myProto); // true

function Person(name) {
  this.name = name;
}

// obj = new Person('Lee')
// obj -> Person.prototype -> Object.prototype -> null
obj = Object.create(Person.prototype);
obj.name = 'Lee';
console.log(obj.name); // Lee
console.log(Object.getPrototypeOf(obj) === Person.prototype); //true
```

Object.create 메서드의 장점은 다음과 같다.

- new 연산자가 없어도 객체를 생성할 수 있다.
- 프로토타입을 지정하면서 객체를 생성할 수 있다. 이때 생성자 함수와 프로토타입 간의 링크가 파괴되지 않는다.
- 객체 리터럴에 의해 생성된 객체도 상속받을 수 있다.
