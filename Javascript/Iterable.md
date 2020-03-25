# 이터레이션 프로토콜

이터레이션 프로토콜(interation protocol)은 순회 가능한 (iterable) 자료구조를 만들기 위해 미리 약속한 규칙이다.  

ES6에 추가된 protocols(표현법)이며 일정 규칙만 충족한다면 어떤 객체에서도 구현이 가능하다.  

ES6 이전의 순회 가능한 자료 구조인 배열, 유사 배열 객체, 문자열 등은 통일된 규약없이 각자의 구조를 가지고 for문, for...in문, forEach 등 다양한 방법으로 순회할 수 있었으나 ES6에서는 순회 가능한 자료 구조를 이터레이션 프로토콜을 준수하는 이터러블로 통일해 for...of문, 스프레드 문법, 디스트럭처링 할당의 대상으로 사용할 수 있도록 일원화하였다.  

이터레이션 프로토콜은 2개의 프로토콜을 가진다.  

[iterable protocol](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#iterable)

[iterator protocol](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#iterator)  

  

## 이터러블

이터러블 객체는 `@@iterator` 메소드를 구현해야 한다. 이는 object가 `Symbol.iterator` key 속성을 가져야 한다는 것을 의미한다. 즉, **객체에 `Symbol.iteraror`를 프로퍼티 키로 사용한 메소드를 구현**하거나 **프로토타입 체인에 의한 상속을 통해 소유**해야 한다.  

`Symbol.iterator` 메소드를 호출하면 iterator protocol을 준수한 이터레이터(iterator)를 반환한다.  



* 프로토타입 체인에 의한 상속

  ```javascript
  const array = [1, 2, 3];
  
  console.log(Symbol.iterator in array); // true
  ```



* Symbol.iterator 메소드로 구현 (사용자 정의 이터러블)

  ```javascript
  const someString = new String('hi');
  
  someString[Symbol.iterator] = function () {
    return {
      next() {
        if (this._first) {
          this._first = false;
          return { value: 'bye', done: false };
        } return { done: true };
      },
      _first: true
    };
  };
  ```

  

이렇게 상속받거나 구현한 이터러블 객체는  

1. for...of 문으로 순회 가능하며

   ```javascript
   for (const item of array) {
     console.log(item);
   } // 1 2 3
   
   for (const item of someString) {
     console.log(item);
   } // bye
   ```

2. 스프레드 문법의 대상으로 사용할 수 있고

   ```javascript
   console.log([...array]); // [1, 2, 3]
   console.log([...someString]); // ["bye"]
   ```

3. 디스트럭처링 할당의 대상으로 사용할 수 있다.

   ```javascript
   const [a, ...rest] = array;
   console.log(a, rest); // 1, [2, 3]
   
   const [a, ...rest] = someString;
   console.log(a, rest); // bye, []
   ```

이렇게 Symbol.iterator 메소드를 직접 구현하지 않거나 상속받지 않은 일반 객체는 이터러블 프로토콜을 준수한 이터러블이 아니기 때문에 for...of 문으로 순회할 수 없고, 스프레드 문법과 디스트럭처링 할당의 대상으로 사용할 수 없다.

```javascript
const obj = { a: 1, b: 2 };
console.log(Symbol.iterator in obj);

for (const item of obj) {
  console.log(item); // TypeError: obj is not iterable
}
```

현재 Strage 4 제안에 스프레드 프로퍼티 제안이 올라가 있으며 이는 일반 객체에 스프레드 문법의 사용을 허용하는 것이다.

[Proposal-object-rest-spread](https://github.com/tc39/proposal-object-rest-spread): 객체의 요소를 디스트럭처링하거나 객체 리터럴에 사용할 수 있다.

```javascript
const obj = { a: 1, b: 2 };
console.log({...obj}); // { a: 1, b: 2 }
```

그러나 중괄호를 제외하고 스프레드 문법을 사용하면 `@@iterator` 메소드를 호출할 수 없어서 타입에러를 반환한다.

```javascript
console.log(...obj); // TypeError: Found non-callable @@iterator
```



## 이터레이터

이터러블의 `Symbol.iterator` 메소드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터를 반환한다. 이렇게 반환된 이터레이터는 `next` 메소드를 갖는다.

이터레이터의 next()는 이터러블의 각 요소를 순회하기 위한 포인터 역할을 한다. next()를 호출하면 이터러블은 순차적으로 한 단계씩 순회하며 순회 결과를 나타내는 **이터레이터 리절트 객체(Iterator result object)** 를 반환한다.

```javascript
const array = [1, 2, 3];
const iterator = array[Symbol.iterator]();
console.log('next' in iterator); // true
console.log(iterator.next()); // {value: 1, done: false}
console.log(iterator.next()); // {value: 2, done: false}
console.log(iterator.next()); // {value: 3, done: false}
console.log(iterator.next()); // {value: undefined, done: true}
```

next()가 반환하는 이터레이터 리절트 객체의 value 프로퍼티는 현재 순회 중인 이터러블의 값을 나타내고 done 프로퍼티는 이터러블의 순회 완료 여부를 나타낸다.

> 비정형 이터레이터: 이터러블의 `@@iterator()` 가 이터레이터 객체를 반환하지 않는 경우 비정형 이터레이터라고 한다. 비정형 이터레이터는 예외 혹은 예상치 못한 버그를 발생시킬 가능성이 있다.
>
> ```javascript
> let nonWellFormedIterable = {}
> nonWellFormedIterable[Symbol.iterator] = () => 1
> [...nonWellFormedIterable] // SyntaxError: Unexpected token '...'
> ```



## 사용자 정의 이터러블

1. 사용자 정의 이터러블 구현

   일반 객체를 이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 된다. 피보나치 수열로 구현한 사용자 정의 이터러블은 아래와 같다.

   ```javascript
   const fibonacci = {
     [Symbol.iterator]() {
       let [pre, cur] = [0, 1];
       const max = 10;
       return {
         next() {
           [pre, cur] = [cur, pre + cur];
           return {
             value: cur,
             done: cur >= max
           };
         }
       };
     }
   };
   
   for (const num of fibonacci) {
     console.log(num); // 1, 2, 3, 5, 8
   }
   
   // 이터러블이지만 이터레이터는 아닌 객체에서 next()를 호출하면 아래와 같은 에러를 반환한다.
   console.log(iter.next()); // TypeError: iter.next is not a function
   ```

   max 값이 내부에 있고 Symbol.iterator()가 이터레이터를 반환하는 객체이다.

   

2. max 값을 매개변수로 받는 이터러블 생성 함수를 만들면 아래와 같다.

   ```javascript
   const fibonacciFunc = function (max) {
     let [pre, cur] = [0, 1];
     return {
       [Symbol.iterator]() {
         return {
           next() {
             [pre, cur] = [cur, pre + cur];
             return {
               value: cur,
               done: cur >= max
             };
           }
         };
       }
     };
   };
   
   for (const num of fibonacciFunc(10)) {
     console.log(num); // 1, 2, 3, 5, 8
   }
   
   // 이터러블이지만 이터레이터는 아닌 함수에서 next()를 호출하면 아래와 같은 에러를 반환한다.
   console.log(iter.next()); // TypeError: iter.next is not a function
   ```

   max 값을 파라미터로 받아 이터레이터를 반환하는 `[Symbol.iterator]()`를 반환한다.

   

3. 지금까지는 이터러블과 이터레이션이 구분된 객체와 함수를 만들었다면 이번에는 이터러블이면서 이터레이터 객체를 생성하는 함수를 만들어보자.

   ```javascript
   const fibonacciFunc = function (max) {
     let [pre, cur] = [0, 1];
     return {
       [Symbol.iterator]() { return this; },
       next() {
         [pre, cur] = [cur, pre + cur];
         return {
           value: cur,
           done: cur >= max
         };
       }
     };
   };
   
   // 이터러블 함수를 할당한 iter라는 변수는 next()를 가져서 value와 done 값을 리턴한다.
   let iter = fibonacciFunc(10);
   console.log(iter.next()); // {value: 1, done: false}
   console.log(iter.next()); // {value: 2, done: false}
   console.log(iter.next()); // {value: 3, done: false}
   console.log(iter.next()); // {value: 5, done: false}
   console.log(iter.next()); // {value: 8, done: false}
   console.log(iter.next()); // {value: 13, done: true}
   
   // 변수 iter는 이터러블이므로 for...of 문으로 순회할 수 있다.
   iter = fibonacciFunc(10);
   for (const num of iter) {
     console.log(num); // 1 2 3 5 8
   }
   ```

   이터러블이면서 이터레이터인 함수를 만들면  `[Symbol.iterator]()`를 호출하지 않아도 이터레이터 객체를 생성할 수 있게 된다. 이때 `[Symbol.iterator]()`이 반환하는 `this`는 다음과 같다.

   `{next: ƒ, Symbol(Symbol.iterator): ƒ}`

   

4. 무한수열을 생성하면 done 프로퍼티를 생략할 수 있다. done 값이 false일 수 없기 때문이다. 그러나 외부에서 파라미터로 값을 전달할 때 탈출할 값을 입력해줘야 한다.

   ```javascript
   const fibonacciFunc = function (max) {
     let [pre, cur] = [0, 1];
     return {
       [Symbol.iterator]() {
         return {
           next() {
             [pre, cur] = [cur, pre + cur];
             return { value: cur };
           }
         };
       }
     };
   };
   
   for (const num of fibonacciFunc()) {
     if (num > 10000) break;
     console.log(num); // 1, 2, 3, 5, 8, ... 
   }
   
   const [f1, f2, f3] = fibonacciFunc();
   console.log(f1, f2, f3); // 1 2 3
   
   ```

   