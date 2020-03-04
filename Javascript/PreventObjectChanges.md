# 객체 변경 방지

객체는 변경 가능한 값이다. `const` 키워드로 선언한 객체에 대해서도 프로퍼티를 추가, 삭제, 변경하는 것이 가능할 뿐 아니라 프로퍼티 어트리뷰트를 재정의하는 것도 가능하다. 자바스크립트는 객체의 변경을 방지하는 다양한 메소드를 제공한다.

|     구분     | 메소드                     | 프로퍼티추가 | 프로퍼티삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| :----------: | -------------------------- | ------------ | ------------ | ---------------- | ---------------- | -------------------------- |
| 객체확장금지 | Object.preventExtensions() | X            | o            | o                | o                | o                          |
|  객체 밀봉   | Object.seal()              | X            | X            | o                | o                | X                          |
|  객체 동결   | Object.freeze()            | X            | X            | o                | X                | X                          |



## 객체 확장 금지

[Object.preventExtensions()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) 메소드는 새로운 속성이 객체에 추가되는 것을 방지하는 메소드이다.

```javascript
const person = { name: 'Lee' };

// isExtensible() 메소드는 확장이 가능한지 확인하는 메소드이다.
console.log(Object.isExtensible(person)); // true

// preventExtensions() 메소드로 person 객체의 확장을 금지한다.
Object.preventExtensions(person);
console.log(Object.isExtensible(person)); // false

// preventExtensions() 메소드는 프로퍼티 추가가 금지되는 메소드이다.
// 프로퍼티 정의 및 재정의는 가능하지만 defineProperty() 메소드를 이용해 프로퍼티를 추가하는 것은 금지된다.
person.age = 20; // strict mode에서는 TypeError를 반환한다.
console.log(person); // {name: "Lee"}
Object.defineProperty(person, 'age', { value: 20 });
// TypeError: Cannot define property age, object is not extensible

// 프로퍼티 추가는 금지되지만 삭제는 가능하다.
delete person.name;
console.log(person); // {}
```



## 객체 밀봉

[Object.seal()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/seal) 메소드는 객체를 밀봉하는 역할을 한다. 객체를 밀봉하면 해당 객체에는 새로운 속성을 추가할 수 없고, 현재 존재하는 모든 속성을 재정의 불가능한 상태로 만들어준다. 하지만 쓰기 가능한 속성의 값은 여전히 변경 가능하다. Object.preventExtensions() 메소드보다는 다소 엄격한 방법이다.

```javascript
const person = { name: 'Lee' };

// Object.isSealed() 메소드는 객체가 밀봉이 되어있는지 확인하는 메소드이다.
console.log(Object.isSealed(person)); // false

// seal() 메소드로 person 객체의 프로퍼티 추가, 삭제, 재정의를 금지한다.
Object.seal(person);
console.log(Object.isSealed(person)); // true

// 밀봉(seal)된 객체는 configurable가 false이다. 때문에 재정의할 수 없다.
console.log(Object.getOwnPropertyDescriptors(person));
// { name: {value: "Lee", writable: true, enumerable: true, configurable: false}, }

// 프로퍼티 추가가 금지된다.
person.age = 20; // strict mode에서는 TypeError를 반환한다.
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // strict mode에서는 TypeError를 반환한다.
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신(쓰기)은 가능하다.
Object.defineProperty(person, 'name', { value: 'Kim' });
console.log(person); // {name: "Kim"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name
```



## 객체 동결

[Object.freeze()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) 메소드는 객체를 동결한다. 동결된 객체는 새로운 속성을 추가하거나 존재하는 속성을 삭제하는 것을 방지하며, 존재하는 속성의 재정의를 금지하고 값을 변경(쓰기)하는 것도 금지한다. 즉, 동결된 객체는 읽기만 가능하다. freeze() 메소드는 전달된 동일한 객체를 반환하는 것이지 복사된 객체를 반환하는 것은 아니다.

```javascript
const person = { name: 'Lee' };

// isFrozen() 메소드는 객체가 동결되었는지 확인하는 메소드이다.
console.log(Object.isFrozen(person)); // false

// freeze() 메소드로 person 객체의 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
Object.freeze(person);
console.log(Object.isFrozen(person)); // true

// 동결(freeze)된 객체는 writable(쓰기)과 configurable(재정의)가 false이다.
console.log(Object.getOwnPropertyDescriptors(person));
// { name: {value: "Lee", writable: false, enumerable: true, configurable: false}, }

// 프로퍼티 추가가 금지된다.
person.age = 20; // strict mode에서는 TypeError를 반환한다.
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // strict mode에서는 TypeError를 반환한다.
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신(쓰기)이 금지된다.
person.name = 'Kim'; // strict mode에서는 TypeError를 반환한다.
console.log(person); // {name: "Lee"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { value: 'Kim' });
// TypeError: Cannot redefine property: name
```



## 불변 객체

그러나 위에서 살펴본 객체 변경 방지 방법은 얕은 변경 방지로, 직속 프로퍼티만 변경이 금지되고 중첩 객체까지 영향을 주지는 않는다. Object.freeze() 메소드로 객체를 읽을 수 있게만 하고 나머지를 모두 동결한다고 해도 중첩 객체까지 동결할 수 있는 것은 아니다.

```javascript
const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
};

// 얕은 객체 동결
Object.freeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false

person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Busan"}}
```

때문에 아무리 Object.freeze() 메소드로 객체를 동결한다고 해도 객체를 프로퍼티 값으로 갖는 중첩 객체의 경우는 객체를 변경, 삭제, 재정의까지 가능하게 된다. 객체의 중첩 객체까지 동결해 변경이 불가능한 읽기 전용의 불변 객체를 구현하기 위해서는 객체를 값으로 갖는 모든 프로퍼티에 대해 재귀적으로 Object.freeze() 메소드를 호출해야 한다.

```javascript
function deepFreeze(target) {
  // 객체가 아니거나 동결된 객체는 무시하고 객체이고 동결되지 않은 객체만 동결한다.
  if (target && typeof target === 'object' && !Object.isFrozen(target)) {
    Object.freeze(target);
    /*
      Object.keys() 메소드는 객체 내부의 프로퍼티 키를 배열로 반환하는 메소드이다.
      배열로 반환된 프로퍼티 키를 map() 메소드로 순회하면서 재귀적으로 동결하도록 한다.
      map() 메소드 대신 forEach() 메소드를 사용하는 것도 가능하다.
    */
    Object.keys(target).map((item) => deepFreeze(target[item]));
    // Object.keys(target).forEach((item) => deepFreeze(target[item]));
  }
  return target;
}

const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
};

// 깊은 객체 동결
deepFreeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결한다.
console.log(Object.isFrozen(person.address)); // true

person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Seoul"}}
```

