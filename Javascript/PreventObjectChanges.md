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

// Object.isSealed() 메소드는 밀봉이 되어있는지 확인하는 메소드이다.
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

