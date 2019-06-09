# this

객체는 프로퍼티(상태 데이터)와 메소드(동작)을 하나의 논리적인 단위로 묶은 복합적인 자료 구조이다.

동작을 나타내는 메소드는 자신이 속한 객체의 상태를 나타내는 상태 데이터인 프로퍼티를 참조하고 상태를 변경할 수 있어야 한다. 이때 메소드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야 한다.



객체 리터럴 방식으로 생성한 객체의 경우, 메소드 내부에서 메소드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있다.

```javascript
const circle = {
  radius: 5,
  getDiameter() {
    return 2 * circle.radius;
  }
};

console.log(circle.getDiameter()); // 10
```

getDiameter 메소드 내에서 메소드 자신이 속한 객체를 가리키는 식별자 circle을 참조한다.

객체 리터럴은 할당 단계에서 평가되기 때문에, getDiameter 메소드가 호출되는 시점에는 이미 객체 리터럴의 평가가 완료되어 객체가 생성되고, 식별자 circle에 생성된 객체가 할당된 이후이다. 때문에 메소드 내부에서 식별자 circle을 참조하는 것이 가능하다.



그러나 생성자 함수는 객체 리터럴과 다르게 동작한다.

```javascript
function Circle(radius) {
  ???.radius = radius;
}

Circle.prototype.getDiameter = function () {
  return 2 * ???.radius;
};

const circle = new Circle(5);
```

생성자 함수 내부에서는 프로퍼티 또는 메소드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야 한다. 하지만 생성자 함수로 객체를 생성할 경우, 먼저 생성자 함수를 정의한 후 new 연산자와 함께 생성자 함수를 호출하는 단계가 추가적으로 필요하다. 따라서 생성자 함수로 인스턴스를 생성하기 위해서는 생성자 함수가 존재해야 한다.

생성자 함수가 자신이 생성할 인스턴스를 참조하려면, 생성자 함수가 정의되는 시점에 인스턴스가 생성되어야 하는데, 생성자 함수는 인스턴스를 생성하기 이전이므로 생성자 함수가 생성할 인스턴스를 가리키는 식별자를 알 수 없게 된다.



**this는 객체 자신의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수(Self-referencing variable)이다.**

함수를 호출하면 언제나 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 함수 내부에서 arguments 객체를 지역 변수처럼 사용할 수 있듯, this도 지역 변수처럼 사용할 수 있다.

**this가 가리키는 값은 함수 호출 방식에 의해 동적으로 결정된다.**

```javascript
// 객체 리터럴
const circle = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10


// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  return 2 * this.
  radius;
};

const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```



**this는 코드 어디든지 참조 가능하며 this의 바인딩은 함수 호출 방식에 따라 동적으로 결정된다.**

```javascript
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this); // window
  return number * number;
}
square(2);

const person = {
  name: 'Lee',
  getName() {
    // 메소드 내부에서 this는 메소드를 호출한 객체를 가리킨다.
    console.log(this); // {name: "Lee", getName: ƒ}
    return this.name;
  }
};
console.log(person.getName()); // Lee

function Person(name) {
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); // Person {}
  this.name = name;
}

const me = new Person('Lee');
```

this는 객체의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메소드 또는 생성자 함수에서 의미가 있다. 일반 함수에서 this는 의미가 없기 때문에 엄격 모드가 적용된 일반 함수 내부에서는 this에 undefined가 바인딩 된다.



## 함수 호출 방식과 this 바인딩

this에 바인딩될 객체는 함수의 호출 방식 즉, 함수가 어떻게 호출되었는지에 따라 동적으로 결정된다. this 바인딩이 스코프를 의미하는 것은 아니다. 렉시컬 스코프는 함수 정의가 평가되어 함수 객체가 생성되는 시점에 상위 스코프를 결정한다. 그러나 this는 함수 호출 시점에 결정된다.

함수를 호출하는 방식은 아래와 같다.

1. 일반 함수 호출
2. 메소드 호출
3. 생성자 함수 호출
4. Function.prototype.apply/call/bind 메소드에 의한 간접 호출



### 2.1. 일반 함수 호출

**this는 기본적으로 전역 객체에 바인딩된다.**

```javascript
function foo() {
  console.log("foo's this: ", this); // foo's this: winodw
  function bar() {
    console.log("bar's this: ", this);// bar's this: window
  }
  bar();
}
foo();
```

전역 함수 뿐 아니라 중첩 함수를 일반 함수로 호출해도 함수 내부의 this에는 전역 객체가 바인딩된다. this는 객체의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수이므로 일반 함수에서는 this가 의미가 없다. 따라서 엄격 모드가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.

```javascript
function foo() {
  'use strict';
  
  console.log("foo's this: ", this); // foo's this: undefined
  function bar() {
    console.log("bar's this: ", this);// bar's this: undefined
  }
  bar();
}
foo();
```

메소드 내에서 정의한 중첩 함수도 일반 함수로 호출되면 전역 객체가 바인딩된다.

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // foo's this: {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // foo's this.value: 100
    
    function bar() {
      console.log("bar's this: ", this); // bar's this: window
      console.log("bar's this.value: ", this.value) // bar's this: 1
    }
    bar();
  }
};

obj.foo();
```

콜백 함수 내부의 this에도 전역 객체가 바인딩된다. 콜백 함수여도 일반 함수로 호출되는 것이기 때문이다.

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // foo's this: {value: 100, foo: ƒ}
    
    setTimeout(function () {
      console.log("callback's this: ", this); // callback's this: window
      console.log("callback's this.value: ", this.value); // callback's this.value: 1
    }, 100);
  }
};

obj.foo();
```

**즉, 일반 함수로 호출된 모든 함수(중첩 함수, 콜백 함수 포함) 내부의 this에는 전역 객체가 바인딩된다.**

메소드 내에서 정의한 중첩 함수 또는 메소드에게 전달한 콜백 함수의 this가 전역 객체를 바인딩하는 것은 문제가 있다. 중첩 함수 또는 콜백 함수는 외부 함수를 돕는 헬퍼 함수로서의 역할을 담당하므로, 외부 함수의 일부 로직을 대신하는 경우가 대부분이다. 이 경우에 외부 함수인 메소드와 중첩 함수 또는 콜백 함수의 this가 일치하지 않는다면 중첩 함수 또는 콜백 함수가 헬퍼 함수로 동작하기 어렵게 만든다.

때문에 메소드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메소드의 this 바인딩과 일치시키기 위한 방법으로는 that이라는 새로운 변수를 만들어 거기에 this를 할당하는 것이다.

```javascript
var value = 1;

const obj = {
  value: 100,
  foo() {
    const that = this;
    
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};

obj.foo();
```



### 2.2. 메소드 호출

**메소드 내부의 this는 메소드를 호출한 객체 즉, 메소드의 이름 앞에 있는 마침표(.) 연산자 앞에 기술한 객체에 바인딩된다.**

```javascript
const person = {
  name: 'Lee',
  getName() {
    return this.name;
  }
};

console.log(person.getName()); // Lee
```

메소드 내부의 this는 메소드를 소유한 객체가 아닌 메소드를 호출한 객체에 바인딩된다. 따라서 위 예제의 getName 메소드는 person 객체의 메소드로 정의되어 있다. getName 메소드는 person 객체의 프로퍼티에 바인딩되어 있다. getName 메소드가 person 객체의 프로퍼티가 바인딩되어 있다는 것은, person 객체와 getName 프로퍼티에 바인딩된 getName 메소드 즉, 함수 객체가 별도의 객체라는 뜻이다.

때문에 getName 메소드는 다른 객체의 프로퍼티에 할당하면 다른 객체의 메소드가 되고, 일반 변수에 할당하면 일반 함수로 호출할 수 있다.

```javascript
const anotherPerson = {
  name: 'Kim'
};

// person.getName = getName() { return this.name; }
anotherPerson.getName = person.getName;

// this.name이 가리키는 것은 anotherPerson 객체이다.
console.log(anotherPerson.getName()); // Kim

const getName = person.getName;

// this.name이 가리키는 것은 person.getName이 가리키는 객체 즉, person 객체이다.
console.log(getName()); // Lee
```

메소드 내부의 this는 메소드를 소유한 객체와는 관계가 없고 메소드를 호출한 객체에 바인딩된다. this.name을 return하는 getName 메소드가 anotherPerson 객체가 호출할 때와 일반 변수에 할당되어 일반 함수로 호출될 때의 반환값이 다르다.

프로토타입 메소드 역시 마찬가지이다.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person('Lee');

console.log(me.getName()); // Lee

Person.prototype.name = 'Kim';

console.log(Person.prototype.getName()); // Kim
```

me.getName 메소드는 me 객체를 호출한다. 따라서 getName 메소드 내부의 this.name은 'Lee'이다.

Person.prototype.getName 메소드는 Person.prototype을 호출한다. 따라서 Person.prototype 메소드 내부의 this.name은 'Kim'이다.



### 2.3. 생성자 함수 호출

**생성자 함수 내부의 this에는 생성자 함수가 (미래에) 생성할 인스턴스가 바인딩된다**

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

Circle 생성자 함수는 circle1이라는 인스턴스와 circle2라는 인스턴스를 생성한다. 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스에 바인딩되므로, getDiameter 메소드 내부의 this는 circle1 인스턴스와 circle2 인스턴스를 가리킨다. 따라서 circle1 인스턴스는 파라미터 값으로 5를 줬으므로 getDiameter 메소드가 10을 반환하고, circle2 인스턴스는 파라미터 값으로 10을 줬으므로 getDiameter 메소드가 20을 반환한다.

생성자 함수는 new 연산자와 함께 호출했을 때 생성자 함수로써 동작한다. 만약 new 연산자가 없이 생성자 함수를 호출하면 일반 함수로 동작하게 된다.

```javascript
const circle3 = Circle(15);

console.log(circle3); // undefined

console.log(radius); // 15
```

일반 함수의 this는 전역 객체를 가리키므로 15라는 파라미터 값이 생성자 함수의 파라미터도 들어가지 않게 된다. new 연산자 없이 호출된 Circle은 일반 함수로 동작하기 때문에 15라는 파라미터 값을 그대로 반환하게 된다.



### 2.4. Function.prototype.apply/call/bind 메소드에 의한 간접 호출

Function.prototype.apply 메소드와 Function.prototype.call 메소드는 인수로 this와 인수 리트스를 전달 받아 함수를 호출한다. apply와 call apthemsms Function.prototype의 메소드이므로 Function 생성자 함수를 constructor 프로퍼티로 가리키는 모든 함수가 상속받아 사용할 수 있다.

```javascript
function getThisBinding() {
  return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding()); // window
console.log(getThisBinding.apply(thisArg)); // { a: 1 }
console.log(getThisBinding.call(thisArg)); // { a: 1 }
```

apply와 call 메소드의 본질적인 기능은 함수를 호출하는 것이다. apply와 call 메소드는 함수를 호출하면서 첫번째 인수로 전달한 특정 객체를 this에 명시적으로 바인딩한다.

```javascript
function getThisBinding() {
  console.log(arguments);
  return this;
}
const thisArg = { a: 1 };

console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}

console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// {a: 1}
```

apply 메소드는 호출할 함수의 인수를 **배열**로 묶어 전달한다. call 메소드는 호출할 함수의 인수를 **쉼표로 구분한 리스트 형식**으로 전달한다. 그러나 apply와 call 메소드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 this로 사용할 객체를 전달하면서 함수를 호출하는 것은 동일하다.

apply와 call 메소드의 대표적인 용도는 arguments 객체와 같은 유사 배열 객체에 배열 메소드를 사용하는 경우이다. arguments 객체는 배열이 아니기 때문에 Array.prototype.slice와 같은 배열 메소드를 사용할 수 없으나 apply와 call 메소드를 이용하면 배열 메소드를 사용할 수 있다.

```javascript
function convertArgsToArray() {
  console.log(arguments);
  // Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
  
  const arr = Array.prototype.slice.apply(arguments);
  console.log(arr);
  // (3) [1, 2, 3]
  
  return arr;
}

convertArgsToArray(1, 2, 3);

```



Function.prototype.bind 메소드는 apply와 call 메소드와는 달리 함수를 호출하지 않고 this로 사용할 객체만을 전달한다.

```javascript
function getThisBinding() {
  return this;
}

const thisArg = { a: 1 };

console.log(getThisBinding.bind(thisArg));
// ƒ getThisBinding() { return this; }
console.log(getThisBinding.bind(thisArg)()); // {a: 1}

```

bind 메소드는 함수를 호출하지는 않기 때문에 this로 사용할 객체를 전달하면서 명시적으로 함수를 호출해야 한다.

bind 메소드는 this와 메소드 내부의 중첩 함수 또는 콜백 함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.doSomething = function (callback) {
  callback();
};
function foo() {
  console.log(this.name); // ''
}
const person = new Person('Lee');

person.doSomething(foo); // ''

```

콜백 함수 foo가 호출되기 전인  Person.prototype.doSomething 메소드를 호출한 객체는 Person 객체이다. 그러나 콜백 함수 foo가 일반 함수로 호출된 시점에서 this는 전역 객체 window를 가리킨다. 따라서 foo 함수 내부에서 참조한 this.name은 window.name과 같다.

메소드로 호출한 this와 콜백 함수 내부의 this가 다르다면 문맥상 문제가 발생하기 때문에 콜백 함수 내부의 this에 콜백 함수를 호출하는 외부 함수 내부의 this와 일치시켜야 한다.

```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.doSomething = function (callback) {
  callback.bind(this)();
  // callback.apply(this);와 callback.call(this);도 사용할 수 있다.
};

function foo() {
  console.log(this.name); // Lee
}

const person = new Person('Lee');

person.doSomething(foo);

```

