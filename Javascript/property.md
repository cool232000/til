# 프로퍼티의 정의

> 프로퍼티 정의란 프로퍼티 어트리뷰트의 값을 정의하여 프로퍼티의 상태를 관리하는 것이다.

여기에서 프로퍼티의 상태란 1. 프로퍼티 값을 갱신 가능하도록 할 것인지, 2. 프로퍼티를 열거 가능하도록 할 것인지, 3. 프로퍼티를 재정의 가능하도록 할 것인지 정의할 수 있다. 이것을 통해 객체의 프로퍼티가 어떻게 동작해야 하는지 명확히 정의할 수 있다.

**자바스크립트 엔진은 프로퍼티를 생성(객체 리터럴의 평가, 프로퍼티 동적 생성)할 때, 프로퍼티의 상태를 나타내는 프로퍼티 어트리뷰트를 기본값으로 자동 정의한다.**

```javascript
const obj = {};
obj.prop = 10;

// 정의된 프로퍼티 어트리뷰트를 확인하는 메서드: Object.getOwnPropertyDescriptor
var descriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
console.log(descriptor);
// {value: 10, writable: true, enumerable: true, configurable: true}
// writable: 갱신 가능 | enumerable: 열거 가능 | configurable: 재정의 가능
```

프로퍼티 정의와 프로퍼티 동적 생성은 다른 것이다. 예컨대, `obj.prop = 10;`은 프로퍼티에 값을 할당하는 할당문이다. 하지만 프로퍼티가 없을 경우 프로퍼티를 동적으로 생성하여 추가한다. 따라서 할당문은 프로퍼티의 유무를 확인하고, 존재하는 프로퍼티에 값을 할당할지 아니면 프로퍼티를 동적으로 생성한 후 값을 할당할지 결정한다.

프로퍼티 동적 생성은 프로퍼티가 존재하지 않을 경우 프로퍼티를 생성하여 추가하는 것이다. 반면 프로퍼티 정의는 프로퍼티 어트리뷰트를 정의하는 것을 말한다. 프로퍼티 어트리뷰트란 프로퍼티의 상태를 나타내는 것이다. 프로퍼티 상태는 `value`, `writable`, `enumerable`, `configurable`로 이루어져 있다.

프로퍼티 어트리뷰트는 `Object.getOwnPropertyDescriptor` 메서드를 사용해 참조할 수 있다. 이 메서드가 프로퍼티 어트리뷰트를 객체로 표현한 프로퍼티 디스크립터 객체를 반환하기 때문이다. 따라서 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로퍼티 디스크립터를 요구하면 undefined가 반환된다.

프로퍼티가 동적 생성될 때 자바스크립트 엔진은 프로퍼티 어트리뷰트를 기본값으로 정의한다. 이렇게 정의된 프로퍼티 어트리뷰트를 재정의하는 것도 가능하다.



## 접근자 프로퍼티

프로퍼티는 데이터 프로퍼티와 접근자 프로퍼티로 구분된다.

- 데이터 프로퍼티(Data property): 키와 값으로 구성된 일반적인 프로퍼티다.
- 접근자 프로퍼티(Accessor property): 자체적으로 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수(Accessor function)로 구성된 프로퍼티다. 접근자 함수는 getter/setter 함수라고 부른다. 접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의할 수도 있다.

```javascript
const person = {
  firstName: 'Jeny',
  lastName: 'kim',
  
  // getter 함수와 setter 함수는 접근자 프로퍼티이다.
  // fullName을 호출하는 getter 함수
  get fullName() {
    return this.firstName + ' ' + this.lastName;
  },
  // fullName을 firstName과 lastName으로 쪼개고 공백을 삽입하는 setter 함수
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
};
// 변수 person의 프로퍼티를 콘솔에 찍는다.
console.log(person.firstName + ' ' + person.lastName); // Jeny kim

// 접근자 프로퍼티를 통해 프로퍼티 값을 저장한다.
// 변수 person의 프로퍼티를 fullName으로 추가하면서 접근자 setter 함수가 호출된다.
person.fullName = 'Larisa Manoban';
console.log(person); // {firstName: "Larisa", lastName: "Manoban"}

// 접근자 프로퍼티를 통해 프로퍼티 값을 참조한다.
// 변수 person을 fullName으로 호출하면 getter 함수가 호출된다.
console.log(person.fullName); // Larisa Manoban

// 데이터 프로퍼티인 firstName은 프로퍼티 어트리뷰트(value, writable, enumerable, configurable)를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Larisa", writable: true, enumerable: true, configurable: true}

// 접근자 프로퍼티인 fullName은 프로퍼티 어트리뷰트(get, set, enumerable, configurable)를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

person 객체의 firstName과 lastName 프로퍼티는 일반적인 데이터 프로퍼티이다.

메서드 앞에 get과 set이 붙은 메서드가 있는데 이것이 바로 getter와 setter 함수이고, getter/setter 함수의 이름인 fullName이 접근자 프로퍼티다. 접근자 프로퍼티는 자체적으로 값을 갖지 않고 값을 읽거나 저장할 때 관여한다.

접근자 프로퍼티와 데이터 프로퍼티를 구분하는 방법

```javascript
// 일반 객체의 __proto__는 접근자 프로퍼티이다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
Object.getOwnPropertyDescriptor(Object.prototype, 'prototype');
// undefined

//함수 객체의 prototype은 데이터 프로퍼티이다.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}
Object.getOwnPropertyDescriptor(function() {}, '__proto__');
// undefined
```



## 프로퍼티 어트리뷰트

```javascript
const obj = { prop: 1};

const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop');
console.log(descriptor);
// {value: 1, writable: true, enumerable: true, configurable: true}
```

Object.getOwnPropertyDescriptor 메서드가 반환한 프로퍼티 디스크립터 객체에서 value 값은 1이다. value를 제외한 writable, enumerable, configurable 프로퍼티는 모두 true 값을 기본적으로 갖는다.

프로퍼티 정의를 따로 하지 않고 기본적으로 생성된 프로퍼티의 [[value]] 값은 프로퍼티의 값을 나타내고 나머지 [[writable]], [[enumerable]], [[configurable]] 값은 ture이다.

```javascript
const obj = { prop1: 1 };
obj.prop2 = 2;

const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop2');
console.log(descriptor);
// {value: 2, writable: true, enumerable: true, configurable: true}

const person = {};

// Object.defineProperty() 정적 메서드는 객체에 직접 새로운 속성을 정의하거나 이미 존재하는 속성을 수정한 후 그 객체를 반환합니다.
Object.defineProperty(person, 'firstName', {
  value: 'Jeny',
  writable: true,
  enumerable: true,
  configurable: true
});

Object.defineProperty(person, 'lastName', {
  value: 'Kim'
});

// Object.getOwnPropertyDescriptor() 메서드는 주어진 객체 자신의 속성(즉, 객체에 직접 제공하는 속성, 객체의 프로토타입 체인을 따라 존재하는 덕택에 제공하는 게 아닌)에 대한 속성 설명자(descriptor)를 반환합니다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Jeny", writable: true, enumerable: true, configurable: true}

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Kim", writable: false, enumerable: false, configurable: false}

// Object.keys() 메소드는 개체 고유의 열거형(enumerable) 속성들을 for...in 루프에 의해 제공되는 순서와 동일한 순서로 리턴합니다. (차이점은 for-in 루프는 프로토타입 체인을 통하여 프로퍼티를 나열한다는 것입니다.)
console.log(Object.keys(person));
// ["firstName"]

person.lastName = 'Lee';

delete person.lastName;

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Kim", writable: false, enumerable: false, configurable: false}

Object.defineProperty(person, 'fullName', {
  get: function () {
    return this.firstName + ' ' + this.lastName;
  },
  set: function (name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}

person.fullName = 'Larisa Manoban';
console.log(person);
// {firstName: "Larisa", lastName: "Kim"}
```

