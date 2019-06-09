# Math 객체

Math 객체는 수학 상수와 함수를 위한 프로퍼티와 메서드를 제공하는 빌트인 객체이다. Math 객체는 별도의 생성자가 없는 정적 프로퍼티와 메서드이다.

## Math property

### Math.PI

PI 값(π ≈ 3.141592653589793)을 반환한다.

```javascript
Math.PI; // 3.141592653589793
```

## Math Method

### Math.abs(x: number): number ^ES1^

반드시 0 또는 양수여야 하는 절대값(absolute value)을 반환한다.

```javascript
Math.abs(-1); // 1
Math.abs('-1'); // 1
Math.abs(''); // 0
Math.abs([]); // 0
Math.abs(null); // 0
Math.abs(undefined); // NaN
Math.abs({}); // NaN
Math.abs('string'); // NaN
Math.abs(); // NaN
```

### Math.round(x: number): number ^ES1^

숫자를 가장 인접한 정수로 올리거나 내린다.

```javascript
Math.round(10.49); // 10
Math.round(10.5); // 11
Math.round(-10.5); // -10
Math.round(-10.51); // -11
Math.round(10); // 10
```

### Math.sqrt(x: number): number ^ES1^

양의 제곱근을 반환한다.

```Javascript
Math.sqrt(9); // 3
Math.sqrt(-9); // NaN
Math.sqrt(2); // 1.4142135623730951
Math.sqrt(1); // 1
Math.sqrt(0); // 0
```

### Math.ceil(x: number): number ^ES1^

지정된 숫자를 자신보다 크고 가장 가까운 정수로 올림한다.

```javascript
Math.ceil(1.4); // 2
Math.ceil(-1.4); // -1
```

### Math.floor(x: number): number ^ES1^

지정된 숫자를 자신보다 작으면서 가장 가까운 정수로 내림한다. 또한 소숫점 이하의 값을 제거한 정수만을 반환한다.

```javascript
Math.floor(1.9); // 1
Math.floor(9.1); // 9
Math.floor(-1.9); // -2
Math.floor(-9.1); // -10
```

### Math.random(): number ^ES1^

0과 2 사이의 임의의 소수를 반환한다. 반환값에 0은 포함되지만 1은 포함되지 않는다.

```javascript
console.log(Math.random()); // 0.1739126298974507

var random = Math.floor((Math.random() * 10) + 1);
console.log(random);
```

Math.pow(x: number, y: number): number ^ES1^
첫번째 인수를 밑(base), 두번째 인수를 지수(exponent)로 해 거듭제곱을 반환한다.

```javascript
Math.pow(2, 8); // 256
2 ** 8; // 256
```

### Math.max(...values: number[]): number ^ES1^

인수 중 가장 큰 수를 반환한다.

```javascript
Math.max(1, 2, 3);

var arr = [1, 2, 3];
var max = Math.max.apply(null, arr);

var max = Math.max(... arr);
```

### Math.min(...value: number[]): number ^ES1^

인수 중 가장 작은 수를 반환한다.

```javascript
Math.min(1, 2, 3);

var arr = [1, 2, 3];
var min = Math.min.apply(null, arr);
var min = Math.min(...arr);
```
