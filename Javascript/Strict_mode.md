# 엄격 모드

```javascript
function foo() {
  x = 10;
}
foo();

console.log(x); // 10
```

위 예제와 같이 foo 함수 내에서 선언하지 않은 변수 x에 10을 할당하고 외부에서 x를 참조하면 콘솔에는 10이라는 값이 찍힌다. 위 예제에는 문제가 있다.

**선언하지 않은 변수 x에 10이라는 값을 할당할 수 없어야 한다.**

위 예제에서는 foo 함수 내부에서 변수 x에 10이라는 값을 할당하고 있다. 값을 할당하려면 할당 이전에 변수가 선언되었어야 하므로 자바스크립트 엔진은 변수 x가 어디에서 선언되었는지를 검색한다. 자바스크립트 엔진은 x에 값을 할당하라는 명령이 있었던 foo 함수의 스코프에서 먼저 변수 x의 선언이 있었는지를 검색한 후, 스코프 체인을 따라 전역으로 올라가 변수 x의 선언이 있었는지를 검색한다.

변수 x가 선언된 적이 없으므로 할당이 되지 않아야 하고, 그로 인해 ReferenceError가 반환되어야 할 것 같지만 실제로는 선언한 적 없는 변수 x에 10의 값이 할당된다. 자바스크립트 엔진이 암묵적으로 전역 객체의 프로퍼티로 x를 동적 생성하기 때문이다. 따라서 foo 함수 내부에서 할당된 변수 x는 전역 변수가 된다. 이것을 **암묵적 전역 변수(Implicit global)**라 한다.

전역 변수는 스크립트 내부 어디에서든 참조할 수 있다. 만약 개발자가 foo 함수 내부에서 x를 선언함과 동시에 값을 할당하려고 했다면 함수 내부에서만 사용하려던 변수 x가 의도와는 상관없이 암묵적 전역 변수가 되어 어디서든 참조할 수 있는 값이 되어버리는 문제가 발생한다. 이런 암묵적 전역 변수의 생성을 막기 위해서는 var, let, const 키워드를 사용해 변수를 선언한 후 변수를 사용해야 한다.



그러나 오타나 문법 실수는 언제나 발생하는 것이므로 보다 안정적인 코드를 생산하기 위해서는 좀 더 근본적인 접근이 필요하다. 처음부터 오류를 발생시키기 어려운 환경을 만드는 것이다. 이것을 지원하기 위해 ES5부터 엄격 모드(strict mode)가 추가되었다. 엄격 모드는 자바스크립트 언어의 문법을 보다 엄격하게 적용하여 기존에는 무시되던 오류를 발생시킬 가능성이 높거나 자바스크립트 엔진의 최적화 자업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생시킨다.



## Strict mode의 적용

엄격 모드를 적용하려면 전역의 선두 또는 함수 몸체의 선두에 `'use strict';` 를 추가한다. 전역의 선두에  `'use strict';` 를 추가하면 스크립트 전체에 엄격 모드가 적용된다.

```javascript
'use strict';

function foo() {
  x = 10;
}
foo();
// ReferenceError: x is not defined
```

함수 몸체의 선두에 추가하면 해당 함수와 중첩된 내부 함수에 엄격 모드가 적용된다.

```javascript
function foo() {
  'use strict';
  
  x = 10;
  
  function bar() {
    y = 20;
  }
  bar();
}
foo();
// ReferenceError: x is not defined
```

코드의 선두에 추가하지 않으면 제대로 동작하지 않는다.

```javascript
function foo() {
  x = 10;
  
  function bar() {
    'use strict';
   
    y = 20;
  }
  bar();
}
foo();
// ReferenceError: y is not defined
// x에 대해서는 엄격 모드가 동작하지 않는다.
```



## 전역에 strict mode를 적용하지 않아야 한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      'use strict';
    </script>
    <script>
      x = 1;
      console.log(x); // 1
    </script>
    <script>
      'use strict';
      
      y = 1; // ReferenceError: y is not defined
      console.log(y);
    </script>
  </body>
</html>
```

스크립트 단위로 적용된 엄격 모드는 다른 스크립트에 영향을 주지 않고 자신의 스크립트에 한정되어 적용된다. 그러나 엄격 모드(strict mode)를 적용한 스크립트와 적용하지 않은(non-strict mode) 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다. 특히 외부 서드 파티 라이브러리를 사용하는 경우 라이브러리가 non-strict mode일 수도 있기 때문에 전역에 엄격 모드를 적용하는 것보다 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행 함수의 선두에 엄격 모드를 적용해야 한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <script>
      'use strict';
    </script>
    <script>
      x = 1;
      console.log(x); // 1
    </script>
    <script>
      (function() {
        'use strict';

        y = 1; // ReferenceError: y is not defined
        console.log(y);
      }());
    </script>
  </body>
</html>
```



## 함수 단위로 strict mode를 적용하지 말아야 한다.

함수 단위로 엄격 모드를 적용할 수도 있다. 그러나 어떤 함수는 엄격 모드를 적용하고 어떤 함수는 적용하지 않는 것은 바람직하지 않고, 모든 함수에 일일이 엄격 모드를 적용하는 것도 번거롭다. 엄격 모드가 적용된 함수가 참조할 함수 외부의 컨텍스트에 엄격 모드를 적용하지 않으면 이것 또한 문제가 생길 수 있다.

따라서 엄격 모드는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.

```javascript
(function () {
  // non-strict mode
  var let = 10;
  
  function foo() {
    'use strict';
    
    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```



## strict mode가 발생시키는 에러

### 암묵적 전역 변수

선언하지 않은 변수를 참조하면 ReferenceError를 발생시킨다.

```javascript
(function() {
  'use strict';

  y = 1; // ReferenceError: y is not defined
  console.log(y);
}());
```



### 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError를 발생시킨다.

```javascript
(function () {
  'use strict';
  
  var x = 1;
  delete x;
  
  function foo(a) {
    delete a;
  }
  delete foo;
}());
// SyntaxError: Delete of an unqualified identifier in strict mode.
```



### 매개변수 이름의 중복

중복된 함수 파라미터 이름을 사용하면 SyntaxError를 발생시킨다.

```javascript
(function () {
  'use strict';
  
  // SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```



### with 문의 사용

with 문을 사용하면 SyntaxError를 발생시킨다.

```javascript
(function () {
  'use strict';
  
  // SyntaxError: Strict mode code may not include a with statement
  with({ x: 1 }) {
    console.log(x);
  }
}());
```



### 일반 함수의 this

일반 함수를 호출하면 this에 undefined가 바인딩된다. 일반 함수 내부에서 this를 사용할 필요가 없기 때문이다.

```javascript
(function () {
  'use strict';
  
  function foo() {
    console.log(this); // undefined
  }
  foo();
  
  function Foo() {
    console.log(this);
  }
  new Foo();
}());
```

