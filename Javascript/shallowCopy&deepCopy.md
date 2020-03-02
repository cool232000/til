# 얕은 복사와 깊은 복사

객체를 복사하는 과정에 있어서 객체가 프로퍼티 값으로 존재하는 객체의 경우 즉, 이중 객체의 경우 복사하는 방법이 두 가지로 나뉜다.

얕은 복사는 외부의 객체만을 복사해 새로운 객체로 생성하되 프로퍼티 값으로 존재하는 객체는 참조값을 복사해 참조에 의한 전달 상태를 유지하는 것이고, 깊은 복사는 외부의 객체 뿐 아니라 프로퍼티 값으로 존재하는 객체까지 복사해 새로운 객체를 생성하는 방법이다.

아래와 같은 코드가 있을 때 얕은 복사와 깊은 복사가 어떻게 다른지 살펴보자.

```javascript
const o = {
  a: 1,
  b: { c: 1 },
  c: 3
};
```



## 얕은 복사

1. 스프레드 연산자로 객체 복사하기

   ```javascript
   // 스프레드 연산자로 o를 복사한 새로운 객체를 생성한다.
   const d = { ...o };
   
   // 두 객체는 같은 값을 가진 것처럼 보이는 다른 객체이다.
   console.log(o); // {a: 1, b: { c: 1 }, c: 3}
   console.log(d); // {a: 1, b: { c: 1 }, c: 3}
   console.log(o === d); // false
   
   // 그러나 프로퍼티 값으로 존재하는 객체를 비교하면 같은 값이라고 판단한다.
   console.log(o.b === d.b); // true
   console.log(o.b.c === d.b.c); // true
   ```

2. Object.assign()으로 객체 복사하기

   ```javascript
   const d = Object.assign({}, o);
   
   console.log(d); // {a: 1, b: { c: 1 }, c: 3}
   console.log(o === d); // false
   console.log(o.b === d.b); // true
   console.log(o.b.c === d.b.c); // true
   ```

3. for ... in 문 사용해서 객체 복사하기

   ```javascript
   function shallow(obj) {
     const copy = {};
     for (const key in obj) {
       copy[key] = obj[key];
     }
     return copy;
   }
   
   const d = shallow(o);
   
   console.log(d); // {a: 1, b: { c: 1 }, c: 3}
   console.log(o === d); // false
   console.log(o.b === d.b); // true
   console.log(o.b.c === d.b.c); // true
   ```

   

o 라는 객체 자체는 새로운 객체로 복사되어 d에 다른 메모리 주소를 갖는 객체를 형성하지만 프로퍼티 값으로 존재하는 객체는 다른 메모리 주소를 갖는 객체로 복사되지 않고 같은 메모리 주소를 공유하는 방식으로 복사된다. 때문에 세가지 복사 방법은 아래와 같은 문제가 발생한다.

```javascript
d.b.f = 4;

console.log(o); // {a: 1, b: { c: 1, f: 4 }, c: 3}
console.log(o.b === d.b); // true
console.log(o.b.f === d.b.f); // true
```

복사한 객체에 프로퍼티를 추가하면 다른 메모리 주소를 갖는 객체의 프로퍼티 값으로 존재하는 객체까지 변경된다. 원본을 변경하지 않기 위해서 새로운 메모리 주소를 갖는 새로운 객체를 형성한 경우에는 이러한 특성이 큰 문제가 되기 때문에 객체의 프로퍼티 값으로 존재하는 객체까지 다른 메모리 주소를 갖는 완전히 새로운 객체를 복사하고자 할 때는 깊은 복사를 사용해야 한다.



## 깊은 복사

1. lodash 라이브러리

   * lodash 설치
   
   ```shell
   $ npm install lodash
   ```
   
   * lodash를 사용해 깊은 복사하기
   
   ```javascript
   // lodash 명령어 입력
  const _ = require('lodash');
   console.log(_);
   
   // lodash가 적용된 변수를 활용해 깊은 복사하기
   const d = _.cloneDeep(o);
   
   console.log(d); // {a: 1, b: { c: 1 }, c: 3}
   console.log(o === d); // false
   console.log(o.b === d.b); // false
   
   // 객체의 내부에 있는 객체의 값들을 비교했을 때만 true가 나온다.
   console.log(o.c === d.c); // true
   ```
   
2. Json.parse(Json.stringify()) 이용해 깊은 복사하기

   ```javascript
   const d = JSON.parse(JSON.stringify(o));
   
   console.log(d); // {a: 1, b: { c: 1 }, c: 3}
   console.log(o === d); // false
   console.log(o.b === d.b); // false
   console.log(o.b.c === d.b.c); // true
   ```

3. for ... in 문 사용해서 깊은 복사하기

   ```javascript
   function deep(obj) {
     const copy = {};
     for (const key in obj) {
       if (typeof obj[key] === 'object') {
         copy[key] = deep(obj[key]);
       } else {
         copy[key] = obj[key];
       }
     }
     return copy;
   }
   
   const d = deep(o);
   
   console.log(d); // {a: 1, b: { c: 1 }, c: 3}
   console.log(o === d); // false
   console.log(o.b === d.b); // false
   console.log(o.b.c === d.b.c); // true
   ```



깊은 복사를 하게 되면 아래와 같이 복사된 객체에 프로퍼티를 추가하더라도 원본 객체는 영향을 받지 않는다. 동일한 값을 갖는 새로운 객체이기 때문이다. 객체를 복사해서 사용할 때는 객체 내부에 객체가 있는지를 확인해서 어떤 방식으로 객체를 복사할 것인지 미리 판단해야 한다. 이중 배열 등의 객체 내부에 객체가 있는 형태의 객체를 얕은 복사로 사용하면 뜻하지 않게 값이 바뀌는 일이 발생할 수 있기 때문에 주의해야 한다.

```javascript
d.b.f = 4;

console.log(o); {a: 1, b: { c: 1 }, c: 3}
console.log(o.b === d.b); // false
console.log(o.b.f === d.b.f); // false
console.log(o.b.f); // undefined
console.log(d.b.f); // 4
```

