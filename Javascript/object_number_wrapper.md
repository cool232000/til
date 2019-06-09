# Number 래퍼 객체

Number 객체는 원시 타입 number를 다룰 때 유용한 프로퍼티와 메서드를 제공하는 래퍼(wrapper) 객체이다. 변수 또는 객체의 프로퍼티가 숫자를 값으로 가지고 있다면 Number 객체의 별도 생성없이 Number 객체의 프로퍼티와 메서드를 사용할 수 있다.

```javascript
var num = 1.5;
console.log(num.toFixed()); // 2
```

## Number Constructor

Number 객체는 Number() 생성자 함수를 통해 생성할 수 있다.

```javascript
new Number(value);
```

만약 인자가 숫자로 변환될 수 없다면 NaN이 반환된다.

```javascript
var x = new Number(123);
var y = new Number('123');
var z = new Number('str');

console.log(x); // 123
console.log(y); // 123
console.log(z); // NaN
```

Number() 생성자 함수를 new 연산자를 생략해 일반 함수로 사용하면 Number 객체를 반환하지 않고 원시 타입 숫자를 반환한다. 이때 형 변환이 생길 수 있다.
일반적으로 숫자를 사용할 때는 원시 타입 숫자를 사용한다. 생성자 객체를 통해 객체를 생성하게 되면 당연히 원시 타입 숫자가 아니라 객체(object)가 생성된다.

```javascript
var x = Number('123');
console.log(typeof x, x); // number 123
```

```javascript
var x = 123;
var y = new Number(123);

console.log(x == y); // true
console.log(x === y); // false

console.log(typeof x); // number
console.log(typeof y); // object
```

## Number Property

정적 프로퍼티로 Number 객체를 생성할 필요없이 `Number.propertyName`의 형태로 사용한다.

### Number.EPSILON ^ES6^

Number.EPSILON은 임의의 수와 그 수보다 큰 수 중 가장 작은 수와의 차이를 나타내는 것이다. Javascript에서의 EPSILON은 2^-52^이다.
부동소수점 산술 연산 비교는 정확한 값을 기대하기 어렵다. 정수처럼 오차없이 저장할 수가 없기 때문이다. 정수는 부동소수점과 달리 2진법으로 변환시 무한소수가 되어 미세한 오차가 발생할 수밖에 없는 구조적 한계를 갖는다.
이런 경우에 Number.EPSILON을 사용한다.

```javascript
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 == 0.3); // false

function isEqual(a, b) {
  // Math.abs는 절대값을 반환한다.
  // a - b 의 절대값이 Number.EPSILON보다 작으면 같은 수로 인정한다.
  return Math.abs(a - b) < Number.EPSILON;
}

console.log(isEqual(0.1 + 0.2, 0.3)); // true
```

### Number.MAX_VALUE ^ES1^

자바스크립트에서 사용할 수 있는 가장 큰 숫자를 반환한다. MAX_VALUE보다 큰 숫자는 `Infinity`이다.

```javascript
Number.MAX_VALUE; // 1.7976931348623157e+308
var num = 10;
num.MAX_VALUE;

console.log(Infinity > Number.MAX_VALUE); // true
```

### Number.MIN_VALUE ^ES1^

자바스크립트에서 사용할 수 있는 가장 작은 숫자를 반환한다. MIN_VALUE는 0에 가까운 양수 값이다. MIN_VALUE보다 작은 숫자는 0으로 반환된다.

```javascript
Number.MIN_VALUE; // 5e-324

var num = 10;
num.MIN_VALUE;

console.log(Number.MIN_VALUE > 0); // true
```

### Number.POSITIVE_INFINITY ^ES1^

양의 무한대 `Infinity`를 반환한다.

```javascript
Number.POSITIVE_INFINITY

var num = 10;
num.POSITIVE_INFINITY;
```

### Number.NEGATIVE_INFINITY ^ES1^

음의 무한대 `-Infinity`를 반환한다.

```javascript
Number.NEGATIVE_INFINITY

var num = 10;
num.NEGATIVE_INFINITY;
```

### Number.NaN ^ES1^

NaN은 Not-a-Number이다.
Number.NaN의 프로퍼티는 window.NaN 프로퍼티와 같다.

```javascript
console.log(Number('xyz')); // NaN
console.log(1 * 'string'); // NaN
console.log(typeof NaN); // number
```

## Number Method

Number 객체에 숫자와 관련해 정의되어있는 작업을 할 때 사용한다.

### Number.isFinite(testValue: number): boolean ^ES6^

매개변수에 전달된 값이 정상적인 유한수인지 검사해 결과를 Boolean으로 반환한다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적으로 형변환 되지 않는다.
 * @return {boolean}
 */
Number.isFinite(testValue)
```

Number.isFinite()는 전역 함수 isFinite()와 차이가 있다. 전역 함수 isFinite()는 인수를 숫자로 변환해 검사를 수행하지만 Number.isFinite()는 인수를 변환하지 않는다. 숫자가 아닌 인수가 주어졌을 때 반환값은 언제나 false이다.

```javascript
Number.isFinite(NaN) // false
Number.isFinite('Hello') // false
Number.isFinite('2005/12/12') // false

Number.isFinite(0) // true
Number.isFinite(2e64) // true
Number.isFinite(null) // false
```

### Number.isInteger(testValue: number): boolean ^ES6^

매개변수에 전달된 값이 정수(integer)인지 검사하여 그 결과를 Boolean으로 반환한다. 검사 전에 인수를 숫자로 변환하지 않는다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적으로 형변환 되지 않는다.
 * @return {boolean}
 */
Number.isInteger(testValue)
```

```javascript
Number.isInteger(123); // true
Number.isInteger(-123) // true
Number.isInteger(5-2) // true
Number.isInteger(0) // true
Number.isInteger(0.5) // false
Number.isInteger('123') // false
Number.isInteger(false) // false
Number.isInteger(Infinity) // false
Number.isInteger(-Infinity) // false
Number.isInteger(0 / 0) // false
```

### Number.isNaN(testValue: number): boolean ^ES6^

매개변수에 전달된 값이 NaN 값인지 검사해 그 결과를 Boolean으로 반환한다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적으로 형변환 되지 않는다.
 * @return {boolean}
 */
Number.isNaN(testValue)
```

Number.isNaN()은 전역 함수 isNaN()과 차이가 있다. 전역 함수 isNaN()은 인수를 숫자로 변환해 검사를 수행하지만 Number.isNaN()은 인수를 변환하지 않는다. 따라서 숫자가 아닌 인수가 주어지면 반환값은 언제나 false이다.

```javascript
Number.isNaN(NaN) // true
Number.isNaN(undefined) // false
Number.isNaN({}) // false
Number.isNaN('blahblah') // false
Number.isNaN(true) // false
Number.isNaN(null) // false
Number.isNaN(37) // false
Number.isNaN('37') // false
Number.isNaN('37.37') // false
Number.isNaN('') // false
Number.isNaN(' ') // false
Number.isNaN(new Date()) // false
Number.isNaN(new Date().toString()) // false

```

### Number.isSafeInteger(testValue: number): boolean ^ES6^

매개변수에 전달된 값이 안전(safe)한 정수 값인지 검사해 결과를 boolean으로 반환한다. 안전한 정수 값은 -(2^53^-1)과 2^53^-1 사이의 정수 값이다. 검사 전에 인수를 숫자로 변환하지 않는다.

```javascript
/**
 * @param {any} testValue - 검사 대상 값. 암묵적으로 형변환 되지 않는다.
 * @return {boolean}
 */

```

```javascript
Number.isSafeInteger(123) // true
Number.isSafeInteger(-123) // true
Number.isSafeInteger(5-2) // true
Number.isSafeInteger(0) // true
Number.isSafeInteger(1000000000000000) // true
Number.isSafeInteger(10000000000000001) // false
Number.isSafeInteger(0.5) // false
Number.isSafeInteger('123') // false
Number.isSafeInteger(false) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false
Number.isSafeInteger(0 / 0) // false

```

### Number.prototype.toExponential(fractionDigit?: number): string ^ES3^

대상을 지수 표기법으로 변환하여 문자열로 반환한다. 지수 표기법이란 매우 큰 숫자를 표기할 때 주로 사용하며 e 앞에 있는 숫자에 10의 n승이 곱하는 형식으로 수를 나타내는 방식이다.

```javascript
1234 = 1.234e+3

```

```javascript
/**
 * @param {number} [fractionDigits] - 0~20 사이의 정수 값으로 소수점 이하의 자릿수를 나타낸다. 옵션으로 생략 가능하다.
 * @return {string}
 */
numObj.toExponential([fractionDigits])

```

```javascript
var numObj = 77.1234;

console.log(numObj.toExponential()); // 7.71234e+1
console.log(numObj.toExponential(4)); // 7.7123e+1
console.log(numObj.toExponential(2)); // 7.71e+1
console.log(77.1234.toExponential()); // 7.71234e+1
console.log(77.toExponential()); // SyntaxError: Invalid or unexpected token
console.log(77 .toExponential()); // 7.7e+1

```

### Number.prototype.toFixed(fractionDigits?: number): string ^ES3^

매개변수로 지정된 소숫점자리를 반올림하여 문자열로 반환한다.

```javascript
/**
 * @param {number} [fractionDigits] - 0~20 사이의 정수값으로 소숫점 이하 자릿수를 나타낸다. 기본값은 0이며 옵션으로 생략할 수 있다.
 * @return {string}
 */
numObj.toFixed([fractionDigits])

```

```javascript
var numObj = 12345.6789;

console.log(numObj.toFixed()); // 12346 소수점 이하 반올림
console.log(numObj.toFixed(1)); // 12345.7 소수점 이하 1자리 유효 및 반올림
console.log(numObj.toFixed(2)); // 12345.68 소수점 이하 2자리 유효 및 반올림
console.log(numObj.toFixed(3)); // 12345.679 소수점 이하 3자리 유효 및 반올림
console.log(numObj.toFixed(6)); // 12345.678900 소수점 이하 6자리 유효  및 반올림(남는 자리는 0이 붙는다)

```

### Number.prototype.toPrecision(precision?: number): string ^ES3^

매개변수로 지정된 전체 자릿수까지 유효하도록 나머지 자릿수를 반올림하여 문자열로 반환한다. 지정된 전체 자릿수로 표현할 수 없는 경우 지수 표기법으로 결과를 반환한다.

```javascript
/**
 * @param {number} [precition] - 1, 21 사이의 정수값으로 전체 자릿수를 나타낸다. 옵션으로 생략할 수 있다.
 * @return {string}
 */
numObj.toPrecision([precision])

```

```javascript
var numObj = 15345.6789;

console.log(numObj.toPrecision()); // 15345.6789 전체 자릿수 유효
console.log(numObj.toPrecision(1)); // 2e+4 전체 1자릿수 유효, 나머지 반올림
console.log(numObj.toPrecision(2)); // 1.5e+4 전체 2자릿수 유효, 나머지 반올림
console.log(numObj.toPrecision(3)); // 1.53e+4 전체 3자릿수 유효, 나머지 반올림
console.log(numObj.toPrecision(6)); // 15345.7 전체 6자릿수 유효, 나머지 반올림

```

### Number.prototype.toString(radix?: number): string ^ES1^

숫자를 문자열로 변환해 반환한다.

```javascript
/**
 * @param {number} [radix] - 2~36 사이의 정수값으로 진법을 나타낸다. 옵션으로 생략할 수 있다.
 * @return {string}
 */
numObj.toString([radix])

```

```javascript
var count = 10;
console.log(count.toString()); // '10'
console.log((17).toString()); // '17'
console.log(17 .toString()); // '17'
console.log((17.2).toString()); // '17.2'

var x = 16;
console.log(x.toString(2)); // '1000'
console.log(x.toString(8)); // '20'
console.log(x.toString(16)); // '10'

console.log((254).toString(16)); // 'fe'
console.log((-10).toString(8)); // '-12'
console.log((-0xff).toString(2)); // '-11111111'

```

### Number.prototype.valueOf(): numver ^ES1^

Number 객체의 원시 타입 값을 반환한다.

```javascript
var numObj = new Number(10);
console.log(typeof numObj); // object

var num = numObj.valueOf();
console.log(num); // 10
console.log(typeof num); // number

```
