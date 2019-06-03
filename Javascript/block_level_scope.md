# var 키워드

ES5까지는 변수를 선언하려면 var 키워드를 사용할 수밖에 없었다. 그러나 var 키워드에는 특징적 문제가 몇 가지 있다.

1. **변수 중복 선언**

```javascript
var x = 1;
var x = 100;
console.log(x); // 100
```

var 키워드는 변수 중복 선언을 허용한다. 같은 스코프 내에서 변수를 중복 선언하면 나중에 선언된 값으로 변수의 값이 변경된다.



2. **함수 레벨 스코프**

```javascript
// if 문
var x = 1;
if (true) {
  var x = 10;
}
console.log(x); // 10

// for 문
var i = 10;
for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}
console.log(i); // 5
```

자바스크립트는 함수 레벨 스코프를 사용한다. 따라서 함수 외부에서 선언한 변수는 제어문 내부에서 선언되었더라도 전역 변수이다. 이로 인해 의도치않게 전역 변수로 선언되고, 심지어 중복 선언되는 경우도 발생한다.



3. **변수 호이스팅**

```javascript
console.log(foo); // undefined

foo = 123;
console.log(foo); // 123

var foo;
```

위 코드는 변수 선언문이 가장 아래에 위치하고, 변수 할당문이 중간에 위치한다. 변수 선언문의 위치가 어디여도 우선 선언된 변수는 호이스팅 되어 전역 스코프 상단에 위치하는 것처럼 보인다. 변수 선언문은 변수가 선언되면서 undefined로 초기화를 같이 진행하므로 첫번째 콘솔의 출력 값은 undefined이다.

키워드를 사용하지 않은 할당문이 있더라도 자바스크립트 엔진은 이것을 변수 선언문이 있는 것으로 간주하고 변수를 등록한다. 대신 var 키워드를 사용하지 않은 경우 함수 내에서 선언되었더라도 전역 변수로 동작한다. 따라서 `123`이라는 값이 할당된 변수는 이후의 호출에 123이라는 값을 반환한다.



# let 키워드

위에서 열거한 var 키워드의 단점을 보완하기 위해 ES6에서는 `let`과 `const`를 도입했다.

let 키워드는 var 키워드와 동일하게 변수를 선언할 때 사용한다. 



1. **변수 중복 선언 금지**

```javascript
var foo = 123;
var foo = 456;
console.log(foo); // 456

let bar = 123;
let bar = 456;
console.log(bar); // SyntaxError: Identifier 'bar' has already been declared
```

var 키워드는 변수를 중복 선언해도 에러가 발생하지 않지만 let 키워드는 문법 에러를 반환한다.



2. **블록 레벨 스코프**

```javascript
let foo = 123;

{
  let foo = 456;
  let bar = 456;
}

console.log(foo); // 123;
console.log(bar); // ReferenceError: bar is not defined
```

var 키워드로 선언한 변수는 함수 레벨 스코프를 따른다. 하지만 let키워드로 선언한 변수는 블록 레벨 스코프(Block-level scope)를 따른다. 블록 레벨 스코프는 모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등)을 지역 스코프로 인정한다.

위 코드에서 만약 함수 레벨 스코프를 따르는 var 키워드를 사용했다면 블록 내에서 선언된 변수 foo와 변수 bar는 전역 변수로 선언되었을 것이다. 그러나 let 키워드는 블록 레벨 스코프를 따른다. 따라서 전역에서 선언된 변수 foo와 블록 내에서 선언된 변수 foo, 변수 bar는 서로 관계가 없다. 블록 내에서 선언된 변수 foo와 변수 bar는 지역 변수이다.

따라서 전역에서 변수 bar 값을 참조할 수 없고 값이 456인 변수 foo를 참조할 수 없는 것이다.



3. **변수 호이스팅**

```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

var 키워드와는 달리 let 키워드는 변수 호이스팅이 발생하지 않는 것처럼 동작한다. 따라서 변수 선언문 이전에 변수를 호출하면 해당 변수를 찾을 수 없다는 참조 에러가 발생한다.

```javascript
// var 키워드는 선언과 초기화가 동시에 진행된다.
console.log(foo); // undefined

var foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```

var 키워드는 변수의 선언과 초기화가 동시에 진행된다. 선언 단계에서 변수 식별자를 등록하면서 변수를 undefined로 초기화하는 것이다. 따라서 let 키워드와 달리 참조 에러가 발생하지 않고 undefined를 반환한다.

```javascript
console.log(foo); // ReferenceError: foo is not defined

let foo;
console.log(foo); // undefined

foo = 1;
console.log(foo); // 1
```

let 키워드 역시 var 키워드와 마찬가지로 런타임 이전에 선언 단계가 실행된다. 그러나 선언만 될 뿐 초기화는 진행되지 않는다. 따라서 참조 에러가 발생한다.

변수 선언문이 실행되면 변수의 초기화가 진행된다. 따라서 변수 선언문이 실행되면 undefined를 반환한다.

마지막으로 변수에 값을 할당한 후에는 변수의 값이 반환된다.

스코프의 시작 시점부터 초기화 시작 시점까지의 구간을 일시적 사각지대(Temporal Dead Zone; TDZ)라고 부른다.

```javascript
var foo = 1;
{
  console.log(foo); // 1
  var foo = 2;
}

let foo = 1;
{
  console.log(foo); // ReferenceError: foo is not defined
  let foo = 2;
}
```

var 키워드로 선언한 변수는 변수 호이스팅이 발생해 블록 내부에서 변수 foo를 호출해도 전역 변수 foo의 값인 1을 반환한다.

만약 let 키워드로 선언한 변수에 변수 호이스팅이 발생하지 않는다면 블록 내부에서 변수 foo를 호출했을 때 전역 변수 foo의 값인 1이 반환되어야 한다. 그러나 블록이 실행되는 순간 블록 내부에 있는 식별자가 실행 컨텍스트의 렉시컬 환경에 등록된다. 따라서 변수 foo를 호출하면 1이 반환되는 것이 아니라 참조 에러가 발생하는 것이다.

실행 순서는 다음과 같다.

1. ```javascript
   // 전역 스코프
   1. 전역 변수 foo가 실행 컨텍스트의 렉시컬 환경에 등록되며 값이 초기화 된다.
   2. 전역 변수 foo에 1이라는 값이 할당된다.
   // 블록 스코프
   3. 블록이 실행되며 블록 내부에 있는 지역 변수 foo가 실행 컨텍스트의 렉시컬 환경에 등록된다.
   4. console.log(foo); 가 실행되지만 지역 변수 foo가 같은 스코프 내에 존재하므로 전역 변수를 참조하지 않는다. 다만 지역 변수 foo는 초기화도 진행되지 않고 식별자만 등록된 상태이므로 참조 에러가 발생한다(마치 호이스팅이 일어나지 않는 것처럼).
   5. console.log(foo); 아래에 있는 변수 선언문과 할당문이 합쳐진 let foo = 2;를 통해 변수 foo가 undefined로 초기화 되고, 바로 2라는 값이 할당된다.
   ```

   

2. **전역 객체와 let**

전역 객체(Global Object)는 모든 객체의 유일한 최상위 객체를 의미한다. 브라우저 환경에서는 window 객체, Node.js 환경에서는 global 객체를 의미한다.

var 키워드가 있거나 혹은 없이 선언된 변수와 함수는 암묵적 전역 변수, 그리고 전역 함수가 된다. 이 (암묵적)전역 변수와 전역 함수는 전역 객체의 프로퍼티가 된다. 따라서 전역 객체의 프로퍼티를 참조할 때 window를 생략할 수 있고, 의도치 않게 window 객체를 사용해 표현식을 평가하는 일도 발생한다.

```javascript
var x = 1;
y = 2;
function foo() {}

console.log(window.x); // 1
console.log(x); // 1

console.log(window.y); // 2
console.log(y); // 2

console.log(window.foo); // ƒ foo() {}
console.log(foo); // ƒ foo() {}
```

그러나 let 키워드로 선언한 전역 변수는 전역 객체 window의 프로퍼티가 아니다. 따라서 window.foo와 같이 접근 불가능하다. let 전역 변수는 전역 객체의 프로퍼티가 되지 않고 눈에 보이지 않는 일종의 블록 내부에 변수와 함수가 선언된 것으로 인식된다.

```javascript
let x = 1;
console.log(window.x); // undefined
console.log(x); // 1
```



## const 키워드

const 키워드는 상수(변하지 않는 고정된 값)를 선언하기 위해 사용한다. let 키워드와 다른 점을 살펴보자.

1. **선언과 초기화**

```javascript
const TAX_RATE = 0.1;
TAX_RATE = 0.2; // TypeError: Assignment to constant variable.
```

let 키워드로 선언한 변수는 재할당이 자유롭지만 const 키워드로 선언한 변수는 재할당이 금지된다. const 키워드로 선언한 변수는 값을 변경할 수 없으므로 한 번 할당한 값 그대로 유지된다. 따라서 변하지 않는 고정된 값 즉, 상수를 변수에 할당하기 위해 사용한다.

const 키워드로 선언한 변수는 반드시 선언과 동시에 할당이 이루어져야 한다. 그렇지 않으면 문법 에러가 발생한다.

```javascript
const FOO; // SyntaxError: Missing initializer in const declaration
```

const 키워드로 선언한 변수는 let 키워드처럼 블록 레벨 스코프를 갖는다.

```javascript
{
  const TAX_RATE = 0.1;
  console.log(TAX_RATE); // 0.1
}
console.log(TAX_RATE); // ReferenceError: TAX_RATE is not defined
```



2. **상수**

상수는 가독성과 유지보수의 편의를 위해 적극적으로 사용한다. 아래와 같이 10퍼센트의 세율을 부과하는 코드가 있다고 하자.

```javascript
let preTaxPrice = 100;
let afterTaxPrice = preTaxPrice + (preTaxPrice * 0.1);
console.log(afterTaxPrice); // 110
```

let 키워드를 사용한 위 코드를 보면 0.1을 어떤 의미로 사용했는지 알기 어렵다. 상수를 사용해 변수명부터 대문자로 선언하면 값의 의미를 명확히 알 수 있다.

```javascript
const TAX_RATE = 0.1
let preTaxPrice = 100;
let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);
console.log(afterTaxPrice); // 110

```

세율은 쉽게 바뀌지 않고 주로 고정된 값을 사용한다. 따라서 상수로 세율을 정의하면 값의 의미를 쉽게 알 수 있다. 또한 상수는 프로그램 전체에서 공통 사용하므로 나중에 세율이 변경되면 상수만을 변경하면 되기 때문에 유지보수성이 대폭 향상된다.



3. **const 키워드와 객체**

const 키워드로 선언된 변수는 재할당이 금지된다. const 키워드로 선언된 변수에 원시 값을 할당하면 원시 값은 변경할 수 없는 값이고 const 키워드에 의해 재할당이 금지되므로 할당된 값을 변경할 수 있는 방법은 없다.

그러나 const 키워드로 선언한 변수에 객체를 할당한 경우, 원시 값을 할당한 경우와 마찬가지로 재할당이 금지된다. 그러나 객체는 변경 가능한 값이므로 const 키워드로 선언된 변수에 할당된 객체는 변경이 가능하다.

```javascript
const person = {
  name: 'Lee'
};
person.name = 'kim';
console.log(person); // {name: "kim"}

```

즉, const 키워드는 재할당을 금지할 뿐 불변을 의미하지는 않는다. 새로운 객체를 재할당하는 것은 불가능하지만 객체의 내용을 변경하는 것은 가능하다. 객체는 참조값을 통해 변수에 값을 할당하기 때문이다.



# var와 let과 const

- ES6를 사용한다면 var 키워드는 사용하지 않는다.
- 재할당이 필요한 경우에 한정해 let 키워드를 사용한다. 이때 변수의 스코프는 최대한 좁게 만든다.
- 변경이 발생하지 않는(재할당이 필요 없는 상수) 원시 값과 객체에는 const 키워드를 사용한다. const 키워드는 재할당을 금지하므로 비교적 안전하다.
