# 디스트럭처링

디스트럭처링(Destructuring)은 구조화된 배열 또는 객체를 Destructuring(비구조화, 파괴)하여 개별적인 변수에 할당하는 것이다. 배열 또는 객체 리터럴에서 필요한 값만을 추출해 변수에 할당할 경우에 사용한다.



## 배열 디스트럭처링(Array destructuring)

ES5에서는 각 요소를 배열로부터 디스트럭처링하여 변수에 각각 할당하는 방법을 사용했다.

```javascript
var arr = [1, 2, 3];

var one = arr[0];
var two = arr[1];
var three = arr[2];

console.log(one, two, three); // 1 2 3
```

ES6에서는 배열의 인덱스를 기준으로 배열로부터 요소를 추출해 변수에 할당한다. 변수를 선언하고, initializer(초기화자)를 할당하면 이니셜라이저가 디스트럭처링되어 할당된다. 디스트럭처링을 사용할 때는 반드시 이니셜라이저를 할당해야 한다.

또한 배열 디스트럭처링을 하기 위해서는 할당 연산자 왼쪽에 배열 형태의 변수 리스트가 필요하다.

```javascript
const arr = [1, 2, 3];

const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

할당 연산자 왼쪽에 있는 변수 리스트와 오른쪽에 있는 배열은 인덱스를 기준으로 할당된다.

```javascript
let x, y, z;

[x, y] = [1, 2];
console.log(x, y); // 1 2

[x, y] = [1];
console.log(x, y); // 1 undefined

[x, y] = [1, 2, 3];
console.log(x, y); // 1 2

[x, , z] = [1, 2, 3];
console.log(x, z); // 1 3

[x, y, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3

[x, y = 10, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3

[x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [2, 3]
```

배열 디스트럭처링은 배열에서 필요한 요소만 추출해 변수에 할당하고 싶은 경우 유용하게 사용할 수 있다. 아래의 코드는 Date 객체에서 연, 월, 일을 추출하는 예제이다. '-'를 기준으로 split한다.

```javascript
const today = new Date();
const formattedDate = today.toISOString().substring(0, 10);
const [year, month, day] = formattedDate.split('-');
console.log([year, month, day]); // ["2019", "06", "09"]

// toISOString()메소드는 ISO 포맷의 문자열로 반환하는데, ISO 포맷은 UTC 타임존의 zero offset을 사용한다. 한국을 기준으로 사용할 때는 UTC+09:00 이므로 9시간을 더해야 한다.
// 2019-06-09T08:19:25.049Z

// substring(0, 10): substring(시작인덱스, 종료인덱스);
// 2019-06-09
```



## 객체 디스트럭처링(Object destructuring)

ES5에서 객체의 각 프로퍼티를 객체로부터 디스트럭처링해 변수에 할당하려면 프로퍼티 이름을 사용해 할당한다.

```javascript
var obj = { firstName: 'Jin', lastName: 'Lee' };

var firstName = obj.firstName;
var lastName = obj.lastName;

console.log(firstName, lastName); // Jin Lee
```

ES6의 객체 디스트럭처링은 객체의 각 프로퍼티를 객체로부터 추출해 변수 리스트에 할당한다. 할당 기준은 **프로퍼티 키**이다. 따라서 변수를 선언할 때 순서는 상관 없다. 할당 기준이 프로퍼티 키이기 때문에 순서에 관계없이 해당하는 프로퍼티 키를 찾아 할당하게 되기 때문이다.

```javascript
const obj = { firstName: 'Jin', lastName: 'Lee' };

const { lastName, firstName } = obj;

console.log(firstName, lastName); // Jin Lee
```

객체 디스트럭처링을 하려면 할당 연산자 왼쪽에 객체 형태의 변수 리스트가 필요하다.

```javascript
const { prop1: p1, prop2: p2 } = { prop1: 'a', prop2: 'b' };
console.log(p1, p2); // a b
console.log({ prop1: p1, prop2: p2 }); // {prop1: "a", prop2: "b"}

// 변수명에 { prop: p1, prop: p2 }를 { prop1, prop2 }로 축약할 수도 있다.
const { prop1, prop2 } = { prop1: 'a', prop2: 'b' };
console.log({ prop1, prop2 }); // {prop1: "a", prop2: "b"}

// 변수명에 값을 할당할 수도 있다.
const { prop1, prop2, prop3 = 'c' } = { prop1: 'a', prop2: 'b' };
console.log({ prop1, prop2, prop3 }); // {prop1: "a", prop2: "b", prop3: "c"}
```

객체디스트럭처링을 사용해 객체에서 프로퍼티 키로 필요한 프로퍼티 값을 추출할 수 있다.

```javascript
const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: false },
  { id: 3, content: 'JS', completed: false }
];

const comletedTodos = todos.filter(({ completed }) => completed);
console.log(comletedTodos); // {id: 1, content: "HTML", completed: true}
```

중첩 객체는 아래와 같이 사용한다.

```javascript
const person = {
  name: 'Lee',
  address: {
    zipCode: '00000',
    city: 'Seoul'
  }
};

const { address: { city } } = person;
console.log(city); // seoul

```

