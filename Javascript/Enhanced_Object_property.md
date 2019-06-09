# 객체 리터럴 프로퍼티 기능의 확장

ES6에서는 객체 리터럴 프로퍼티 기능이 확장되었다. 더욱 간편하고 동적인 객체 생성이 가능하게 되었다.



## 프로퍼티 축약 표현

객체 리터럴 프로퍼티는 프로퍼티 이름과 프로퍼티 값으로 구성된다. 프로퍼티 값은 변수에 할당된 값일 수 있으며 ES5에서는 아래와 같이 사용했다.

```javascript
var x = 1, y = 2;

var obj = {
  x: x,
  y: y
};

console.log(obj); // {x: 1, y: 2}
```

ES5에서는 프로퍼티 값과 변수명이 같을 경우 프로퍼티 이름을 생략할 수 있다. 프로퍼티 이름을 생략하면 변수의 이름으로 자동 생성된다.

```javascript
let x = 1, y = 2;

const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```



## 프로퍼티 키 동적 생성

프로퍼티 키를 동적 생성하려면 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 한다. 이것을 계산된 프로퍼티 이름(Computed property name)이라 한다.

ES5에서 프로퍼티 키를 동적으로 생성하려면 객체 리터럴 **외부**에서 대괄호 표기법을 사용했다.

```javascript
var prefix = 'prop';
var i = 0;

var obj = {};

obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```

ES6에서는 객체 리터럴 **내부**에서 프로퍼티 키를 동적으로 생성할 수 있다. 이때 문자열 인터폴레이션을 사용한다.

```javascript
const prefix = 'prop';
let i = 0;

const obj = {
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i,
  [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```



## 메소드 축약 표현

ES5에서 메소드를 선언하는 경우 프로퍼티 값으로 함수 표현식을 할당한다.

```javascript
var obj = {
  name: 'Lee',
  sayHi: function() {
    console.log('Hi! '+ this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

ES6에서는 function 키워드를 생략한 축약 표현을 사용할 수 있다.

```javascript
const obj = {
  name: 'Lee',
  sayHi() {
    console.log(`Hi! ${this.name}`);
  }
};

obj.sayHi(); // Hi! Lee
```



## `__proto__` 프로퍼티에 의한 상속

ES5에서 객체 리터럴을 상속하기 위해서는 Object.create() 함수를 사용한다. 이것을 프로토타입 패턴 상속이라고 한다.

```javascript
var parent = {
  name: 'parent',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

var child = Object.create(parent);
child.name = 'child';

parent.sayHi(); // Hi! parent
child.sayHi(); // Hi! child
```

ES6에서는 객체 리터럴 내부에서 `__proto__` 프로퍼티를 직접 설정할 수 있다. 객체 리터럴에 의해 생성된 객체의 `__proto__` 프로퍼티에 다른 객체를 직접 바인딩해서 상속을 표현할 수 있다는 것을 뜻한다.

```javascript
const parent = {
  name: 'parent',
  sayHi() {
    console.log(`Hi! ${this.name}`);
  }
};

const child = {
  name: 'child',
  __proto__: parent
};

parent.sayHi(); // Hi! parent
child.sayHi(); // Hi! child
```

