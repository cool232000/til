# Class

프로토타입 기반 객체지향 언어인 자바스크립트는 다른 언어와는 달리 클래스가 필요 없이 프로토타입 체인과 클로저 등으로 객체지향 언어의 상속, 캡슐화 등의 개념을 구현할 수 있다. 그러나 ES6부터는 ES5에서 생성자 함수와 프로토타입, 클로저를 이용해 상속, 캡슐화 등을 구현하던 것을 좀 더 엄격하게 사용할 수 있는 클래스를 지원한다.



## 클래스 정의

ES5에서는 생성자 함수와 프로토타입, 클로저를 사용해 객체지향 프로그래밍을 구현한다.

```javascript
var Person = (function () {
  function Person(name) {
    this._name = name;
  }
  Person.prototype.sayHi = function () {
    console.log('Hi! ' + this._name); // Hi! Lee
  };
  return Person;
}());

var me = new Person('Lee');
me.sayHi();

console.log(me instanceof Person); // true
```

ES6에서는 class 키워드를 사용해 클래스를 정의한다.

```javascript
class Person {
  constructor(name) {
    this._name = name;
  }
  sayHi() {
    console.log(`Hi! ${this._name}`); // Hi! Lee
  }
}

const me = new Person('Lee');
me.sayHi();

console.log(me instanceof Person); // true
```

클래스는 클래스 선언문 이전에 참조할 수 없지만 호이스팅이 일어나지 않는 것은 아니다. 클래스의 호이스팅은 let과 const 키워드로 선언한 변수처럼 호이스팅된다. 따라서 클래스 선언문 이전에 TDZ에 빠지기 때문에 선언문 이전에 참조할 수 없고 호이스팅이 일어나지 않은 것처럼 동작한다.

```javascript
const Foo = '';
{
  console.log(Foo);
  // ReferenceError: Cannot access 'Foo' before initialization
  class Foo {}
}
```

표현식으로도 클래스를 정의하는 것이 가능하다. 클래스는 함수처럼 이름을 가질 수도 있고 가지지 않을 수도 있다. 만약 클래스가 할당된 변수를 사용해 클래스를 생성하는 것이 아니라, 클래스의 이름으로 클래스를 생성하면 에러가 발생한다.

함수가 함수 내부에서만 함수명을 참조할 수 있는 것처럼, 클래스 역시 클래스 내부에서만 클래스명을 참조할 수 있다. 때문에 외부에서 함수를 참조하려면 함수명과 동일한 이름을 가진 변수를 암묵적으로 생성하는 것처럼 클래스 역시 외부에서 접근하려면 클래스를 할당한 변수를 이용해 접근해야 한다.

```javascript
const Foo = class MyClass {};

const foo = new Foo();
console.log(foo); // MyClass {}

new MyClass(); // ReferenceError: MyClass is not defined
```



## constructor

클래스는 생성자 함수처럼 new 연산자와 함께 클래스 이름을 호출하면 인스턴스를 생성한다.

```javascript
class Foo {}
const foo = new Foo();
```

그러나 new 연산자가 호출한 Foo는 클래스명이 아니라 constructor(생성자)이다.

```javascript
console.log(Object.getPrototypeOf(foo).constructor === Foo); // true
```

constructor는 인스턴스를 생성하고 클래스 필드(클래스 내부의 캡슐화된 변수; 데이터 멤버 또는 멤버 변수)를 초기화하기 위한 특수한 메소드이다.

```javascript
class Person {
  constructor(name) {
    this._name = name; // _name은 클래스 필드이다
  }
}

const me = new Person('Lee');
console.log(me); // Person {_name: "Lee"}
```

constructor는 클래스 내에 한 개만 존재할 수 있다. 만약 클래스가 2개 이상의 constructor를 포함하면 문법 에러가 발생한다. 인스턴스를 생성할 때 new 연산자와 함께 호출하는 것이 constructor이며 constructor의 파라미터에 전달한 값은 클래스 필드에 할당된다.

constructor에 프로퍼티를 여러 개 추가하는 것은 가능하다.

constructor는 생략할 수 있다. 그러나 constructor를 생략하면 constructor가 생성되지 않는 것이 아니라 빈 객체를 생성한다. 따라서 인스턴스에 프로퍼티를 추가하려면 인스턴스를 생성한 후 프로퍼티를 동적으로 추가해야 한다.

```javascript
class Foo { }

const foo = new Foo();
console.log(foo); // Foo {}

foo.num = 1;
console.log(foo); // Foo {num: 1}
```

constructor는 인스턴스 생성과 동시에 클래스 필드의 생성과 초기화를 실행한다. 따라서 클래스 필드를 초기화해야 한다면 constructor를 생략해서는 안 된다.

```javascript
class Foo {
  constructor(num) {
    this.num = num;
  }
}

const foo = new Foo(1);
// constructor를 생략했을 경우 인스턴스 생성 후 할당해야 한다
// const foo = new Foo();
// foo.num = 1;

console.log(foo); // Foo {num: 1}
```



## 클래스 필드

클래스 바디에는 메소드만 선언할 수 있다. 클래스 바디에 클래스 필드를 선언하면 문법 에러가 발생한다.

```javascript
class Foo {
  name = ''; // SyntaxError

	constructor() {}
}
```

최신 브라우저에서는 위 예제가 정상적으로 동작한다. TC39 프로세스의 stage3 단계에, 클래스 바디에서 직접 인스턴스 필드를 선언하고 private 인스턴스 필드를 선언할 수 있는 프로포절의 [Field declarations](https://github.com/tc39/proposal-class-fields#field-declarations)를 최신 브라우저가 구현하고 있기 때문이다.

상술한 제안이 stage4로 승급되기 전까지는 클래스 필드의 선언과 초기화는 반드시 constructor 내부에서 실시한다.

```javascript
class Foo {
  constructor(name = '') {
    this.name = name;
  }
}

const foo = new Foo('Lee');
console.log(foo); // Foo {name: "Lee"}
console.log(foo.name); // Lee
```

constructor 내부에서 선언한 클래스 필드는 클래스가 생성할 인스턴스를 가리키는 this에 바인딩된다. 클래스 필드는 클래스가 생성할 인스턴스의 프로퍼티가 되며, 클래스의 인스턴스를 통해 클래스 외부에서 참조할 수 있다.



## getter, setter

### getter

getter는 클래스 필드에 **접근**할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 때 사용한다. getter는 무언가를 취득할 때 사용하므로 반드시 무언가를 반환해야 한다. 따라서 return이 빠지면 안 된다.

getter는 `get` 키워드를 사용해 정의하며, 메소드 이름은 클래스 필드의 이름처럼 참조하는 형식으로 사용한다. 참조 시엔 메소드가 호출된다.

```javascript
class Foo {
  constructor(arr = []) {
    this._arr = arr;
  }
  
  get firstElem() {
    return this._arr.length ? this._arr[0] : null;
  }
}

const foo = new Foo([1, 2]);
console.log(foo.firstElem); // 1
```

### setter

setter는 클래스 필드에 값을 **할당**할 때마다 클래스 필드의 값을 조작하는 행위가 필요할 때 사용한다. setter는 호출하는 것이 아니라 프로퍼티처럼 값을 할당하는 형식으로 사용하며 할당 시에 메소드가 호출된다. return은 하지 않는다.

setter는 `set` 키워드를 사용해 정의하며 메소드 이름은 클래스 필드의 이름처럼 사용된다.

```javascript
class Foo {
  constructor(arr = []) {
    this._arr = arr;
  }
  
  get firstElem() {
    return this._arr.length ? this._arr[0] : null;
  }
  
  set firstElem(elem) {
    this._arr = [elem, ...this._arr];
  }
}

const foo = new Foo([1, 2]);

foo.firstElem = 100;

console.log(foo.firstElem); // 100
```



## 정적 메소드

클래스의 정적(static) 메소드를 정의할 때 static 키워드를 사용한다. 정적 메소드는 클래스의 인스턴스가 아닌 클래스 이름으로 호출한다. 클래스의 인스턴스를 생성하지 않아도 호출할 수 있다.

```javascript
class Foo {
  constructor(prop) {
    this.prop = prop;
  }
  
  static staticMethod() {
    return 'staticMethod';
  }
  
  prototypeMethod() {
    return this.prop;
  }
}

console.log(Foo.staticMethod()); // staticMethod

const foo = new Foo(123);

console.log(foo.staticMethod()); // Uncaught TypeError: foo.staticMethod is not a function
```

클래스의 정적 메소드는 인스턴스로 호출할 수 없다. 따라서 정적 메소드는 this를 사용할 수 없다. 일반 메소드 내부에서 this는 클래스의 인스턴스를 가리키며, 메소드 내부에서 this를 사용한다는 것은 클래스의 인스턴스의 생성을 전제로 하는 것이다.

정적 메소드는 클래스 이름으로 호출하기 때문에 클래스의 인스턴스를 생성하지 않아도 사용할 수 있다. 다만 this를 사용할 수 없다. 바꿔 말하면 메소드 내부에서 this를 사용할 필요가 없는 메소드는 정적 메소드로 만들 수 있다. 정적 메소드는 Math 객체의 메소드처럼 애플리케이션 전역에서 사용할 유틸리티 함수를 생성할 때 주로 사용한다.

위 예제를 ES5 버전으로 표현하면 생성자 함수를 이용할 수 있다.

```javascript
var Foo = (function () {
  function Foo(prop) {
    this.prop = prop;
  }
  
  Foo.staticMethod = function () {
    return 'staticMethod';
  };
  
  Foo.prototype.prototypeMethod = function () {
    return this.prop;
  };
  
  return Foo;
}());

var foo = new Foo(123);

console.log(foo.prototypeMethod()); // 123
console.log(Foo.staticMethod()); // staticMethod
console.log(foo.staticMethod()); // Uncaught TypeError: foo.staticMethod is not a function
```

함수 객체는 일반 객체와는 달리 prototype 프로퍼티를 갖는다. prototype 프로퍼티는 함수 객체가 생성자로 사용될 때, 이 함수를 통해 생성된 객체의 부모 역할을 하는 프로토타입 객체를 가리킨다. 위 예제에서 Foo는 생성자 함수로 사용되므로 생성자 함수 Foo의 prototype 프로퍼티가 가리키는 프로토타입 객체는 생성자 함수 Foo를 통해 생성되는 인스턴스 foo의 프로토타입 체인상 부모이다.

정적 메소드인 staticMethod는 생성자 함수 Foo의 메소드이다.

```javascript
console.log(Foo.staticMethod()); // staticMethod
```

일반 메소드인 prototypeMethod는 프로토타입 객체 Foo.prototype의 메소드이다.

```javascript
console.log(foo.prototypeMethod()); // 123

```

생성자 함수 Foo가 생성하는 인스턴스는 foo이고, 이 인스턴스 foo는 Foo.prototype과 프로토타입 체인상 연결되어 있다. 따라서 인스턴스 foo는 Foo 생성자 함수의 메소드인 staticMethod를 호출할 수 없다.



## 클래스 상속

### extends 키워드

**extends 키워드는 부모 클래스를 상속받는 자식 클래스를 정의할 때 사용한다.**

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  
  getDiameter() {
    return 2 * this.radius;
  }
  
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
  
  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Cylinder extends Circle {
  constructor(radius, height) {
    super(radius);
    this.height = height;
  }
  
  getArea() {
    return (this.height * super.getPerimeter()) + (2 * super.getArea());
  }
  
  getVolume() {
    return super.getArea() * this.height;
  }
}

const cylinder = new Cylinder(2, 10);

console.log(cylinder.getDiameter()); // 4
console.log(cylinder.getPerimeter()); // 12.566370614359172
console.log(cylinder.getArea()); // 150.79644737231007
console.log(cylinder.getVolume()); // 125.66370614359172

console.log(cylinder instanceof Cylinder); // true
console.log(cylinder instanceof Circle); // true

```

cylinder 인스턴스는 프로토타입 체인에 의해 부모 클래스 Circle의 메소드를 사용할 수 있다. cylinder 인스턴스의 부모는 Cylinder.prototype이고, Cylinder.prototype의 부모는 Circle.prototype이다.

```javascript
console.log(cylinder.__proto__ === Cylinder.prototype); // true
console.log(Cylinder.prototype.__proto__ === Circle.prototype); // true
console.log(Circle.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true

```

cylinder 인스턴스에 특정 프로퍼티나 메소드가 없을 경우 프로토타입 체인([[Prototype]] 내부 슬롯이 가리키는 링크)을 따라 부모 역할을 하는 Cylinder.prototype의 프로퍼티와 메소드를 차례대로 검색한다. getArea 메소드는 Cylinder.prototype에도 있고 Circle.prototype에도 있지만, 프로토타입 체인상 Cylinder.prototype의 getArea()가 먼저 검색된다. 따라서 Circle.prototype의 getArea 메소드는 쉐도잉되고, 먼저 검색된 Cylinder.prototype의 getArea 메소드가 사용된다.



### super 키워드

**super 키워드는 부모 클래스를 참조할 때나 부모 클래스를 호출할 때 사용한다.** 아래 예제에서 super 키워드는 메소드로 사용될 때와 객체로 사용될 때 다르게 동작한다.

```javascript
class Circle {
  constructor(radius) {
    this.radius = radius;
  }
  
  getDiameter() {
    return 2 * this.radius;
  }
  
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
  
  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
}

class Cylinder extends Circle {
  constructor(radius, height) {
    // suepr 메소드는 부모 클래스의 constructor를 호출하면서 인수를 전달한다.
    super(radius);
    this.height = height;
  }
  
  getArea() {
    // super 키워드는 부모 클래스를 참조한다.
    return (this.height * super.getPerimeter()) + (2 * super.getArea());
  }
  
  getVolume() {
    return super.getArea() * this.height;
  }
}

const cylinder = new Cylinder(2, 10);

console.log(cylinder.getDiameter()); // 4
console.log(cylinder.getPerimeter()); // 12.566370614359172
console.log(cylinder.getArea()); // 150.79644737231007
console.log(cylinder.getVolume()); // 125.66370614359172

console.log(cylinder instanceof Cylinder); // true
console.log(cylinder instanceof Circle); // true

```

super 메소드는 자식 클래스의 constructor 내부에서 부모 클래스의 constructor를 호출한다. 부모 클래스의 인스턴스를 생성하는 것이다. 자식 클래스의 constructor에서 super()를 호출하지 않으면 this에 대한 참조 에러가 발생한다. super 메소드로 부모의 constructor를 호출하지 않으면 this를 참조할 수 없다. 즉, super는 생성자 함수의 new 연산자처럼 동작한다.

super 키워드는 부모 클래스를 참조한다. super.getArea() 라고 하면 부모 클래스의 getArea 메소드를 참조하는 것이다.



### static 메소드와 prototype 메소드의 상속

extends 키워드를 이용해 부모 클래스를 상속받는 자식 클래스를 정의하면 prototype 뿐 아니라 부모 클래스의 정적 메소드도 상속된다.

```javascript
class Parent {}

class Child extends Parent {}

console.log(Child.__proto__ === Parent); // true
console.log(Child.prototype.__proto__ === Parent.prototype); // true

```

```javascript
class Parent {
  static staticMethod() {
    return 'staticMethod';
  }
}

class Child extends Parent {}

console.log(Parent.staticMethod()); // staticMethod
console.log(Child.staticMethod()); // staticMethod

```

따라서 자식 클래스의 정적 메소드 내부에서도 super 키워드를 사용해 부모 클래스의 정적 메소드를 호출할 수 있다. 자식 클래스는 프로토타입 체인에 의해 부모 클래스의 정적 메소드를 참조할 수 있기 때문이다.

그러나 상술했다시피 자식 클래스의 인스턴스 내부에서는 super 키워드를 사용해 부모 클래스의 정적 메소드를 호출할 수 없고, 부모 클래스의 프로토타입의 메소드를 호출할 수 있을 뿐이다. 자식 클래스의 인스턴스는 부모 클래스의 프로토타입과 프로토타입 체인으로 연결되어 있기 때문이다.

```javascript
class Parent {
  static staticMethod() {
    return 'Hello';
  }
}

class Child extends Parent {
  static staticMethod() {
    return `${super.staticMethod()} world`;
  }
  
  prototypeMethod() {
    return `${super.staticMethod()} world`;
  }
}

console.log(Parent.staticMethod()); // Hello
console.log(Child.staticMethod()); // Hello world
console.log(new Child().staticMethod());
// Uncaught TypeError: (intermediate value).staticMethod is not a function

```

