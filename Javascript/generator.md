# 제너레이터

제너레이터는 ES6에서 도입된, 이터러블을 생성하는 함수이다. 제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간편하게 이터러블을 구현할 수 있다.

제너레이터 함수는 일반 함수와 같이 코드 블록을 한 번에 실행하지 않고 코드 블록의 실행을 중지했다가 필요한 시점에 시작할 수 있는 특수한 함수이다. 특정 조건일 때 코드를 재실행 시킬 수 있으므로 비동기 처리에 유리하다.

```javascript
function normalFunc() {
  return 1;
  return 2;
  return 3;
}

normalFunc() // 1
```

만약 위와 같은 함수가 있고, normalFunc()를 호출한다면 리턴값은 언제나 1이다. 일반적인 함수는 리턴문을 만나면 그 아래에 있는 코드는 더이상 실행하지 않기 때문이다. 그러나 제너레이터 함수는 값을 순차적으로 반환할 수 있다.

```javascript
function* generatorFunc() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
};

const generator = generatorFunc();

generator.next(); // {value: 1, done: false}
generator.next(); // {value: 2, done: false}
generator.next(); // {value: 3, done: false}
generator.next(); // {value: 4, done: true}
generator.next(); // {value: undefined, done: true}
```

제너레이터 함수를 호출하면 값과 done이라는 완료 상태를 함께 반환한다. 완료 상태 이후에 제너레이터 함수를 호출하면 값은 undefined를 반환하게 된다. 따라서 제너레이터 함수를 사용하면 함수를 중간에 멈출 수도 있고 순차적으로 여러 값을 반환하도록 할 수도 있다. 또한 next 메소드에 파라미터를 전달하면 제너레이터 함수에서 yield 값을 사용해 해당 값을 조회하게 할 수도 있다.

```javascript
function* sumGeneratorFunc() {
  let a = yield;
  let b = yield;
  yield a + b;
};

const sumFunc = sumGeneratorFunc();

sumFunc.next(); // {value: undefined, done: false}
sumFunc.next(1); // {value: undefined, done: false}
sumFunc.next(2); // {value: 3, done: false}
sumFunc.next(); // {value: undefined, done: true}
```

제너레이터 함수는 '함수'이지만 화살표 함수로는 사용할 수 없다. 이는 화살표 함수로 new 연산자를 활용해서 생성자 함수를 만들 수 없는 것과 같다. 제너레이터 함수 내부에서 화살표 함수를 사용하는 경우는 그 안에 더 중첩된 함수 내에서 사용하는 경우를 제외하면 사용할 수 없기 때문에 제너레이터 함수는 일반 함수로 작성해야 한다.