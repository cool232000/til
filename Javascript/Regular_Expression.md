# 정규 표현식

정규 표현식(Regular Expression)은 문자열에서 특정 내용을 찾거나 대체 또는 발췌할 때 사용한다.
회원 가입 화면에서 사용자가 입력한 정보가 유효한지 체크하는 경우에 많이 사용한다.

```javascript
const tel = '0101234567팔';

const myRegExp = /^[0-9]+$/;

console.log(myRegExp.test(tel)); // false
```

반복문이나 조건문을 사용해 복잡하게 짜는 코드도 정규표현식을 이용하면 간단하게 표현할 수 있다. 그러나 정규표현식은 주석과 공백을 허용하지 않고, 여러 기호를 혼합해 사용하기 때문에 가독성이 좋지 않다.

정규표현식 리터럴은 시작'/'과 종료'/' 기호, 기호 안에 들어가는 패턴, 가장 마지막에 위치하는 플래그로 구성되어 있다.

```javascript
const targetStr = 'This is a pen.';
const regexr = /is/ig;

console.log(regexr.exec(targetStr)); // [ 'is', index: 2, input: 'This is a pen.', groups: undefined ]
console.log(regexr.test(targetStr)); // true 

console.log(targetStr.match(regexr)); // [ 'is', 'is' ]
console.log(targetStr.replace(regexr, 'IS')); // ThIS IS a pen.
console.log(targetStr.search(regexr)); // 2
console.log(targetStr.split(regexr)); // [ 'Th', ' ', ' a pen.' ]
```

## 플래그

| Flag | Meaning     | Description                      |
| ---- | ----------- | -------------------------------- |
| i    | Ignore Case | 대소문자를 구별하지 않고 검색    |
| g    | Global      | 문자열 내의 모든 패턴을 검색     |
| m    | Multi Line  | 문자열의 행이 바뀌어도 계속 검색 |

플래그는 옵션이므로 사용하지 않아도 무방하다. 다만 플래그를 사용하지 않는 경우 문자열 내 검색 매칭 대상이 1개 이상이더라도 첫번째 매칭한 대상만 검색한 후 종료하기 때문에 여러 개를 검색해야 한다면 플래그를 써줘야 한다.

```javascript
const targetStr = 'Is this all there is?';

// 플래그가 없으므로 문자열 is를 대소문자 구별해 한 번만 검색
let regexr = /is/;

console.log(targetStr.match(regexr));
// [ 'is',  index: 5,  input: 'Is this all there is?',  groups: undefined ]
// 대소문자를 구별했기 때문에 5번째 인덱스부터 시작하는 'is'를 검색했다.

// 대소문자를 구별하지 않는 i 플래그와 문자열 내의 모든 패턴을 검색하는 g 플래그를 사용해 검색
regexr = /is/ig;

// 대소문자를 구별하지 않고 문자열 내의 모든 is를 반환한다.
console.log(targetStr.match(regexr)); // [ 'Is', 'is', 'is' ]
console.log(targetStr.match(regexr).length); // 3
```

## 패턴

패턴에는 검색하고 싶은 문자열을 지정한다. 이때 따옴표를 포함하면 따옴표까지도 검색하기 때문에 따옴표는 생략해야 한다. 또한 패턴은 특별한 의미를 가지는 메타문자(Metacharacter) 또는 기호로 표현할 수 있다.

```javascript
const targetStr = 'AA BB Aa Bb';
const targetStr2 = 'AA AAA BB Aa Bb';
const targetStr3 = 'AA BB ZZ Aa Bb';
const targetStr4 = 'AA BB Aa Bb 24,000'
```

### 임의의 문자 추출

```javascript
// '.'은 임의의 문자 한 개를 의미한다. '.'을 연속해 패턴을 생성했기 때문에 3자리 임의의 문자를 추출한다.
const regexr = /.../;
console.log(targetStr.match(regexr));
// [ 'AA ', index: 0, input: 'AA BB Aa Bb', groups: undefined ]

// 만약 문자열을 끝까지 검색하며 해당되는 문자열을 반환하게 하려면 플래그 'g'를 사용한다.
// 이때 임의의 문자열 3개를 반환하는 코드이므로 반환은 'Aa '에서 끝나게 된다.
const regexr2 = /.../g;
console.log(targetStr.match(regexr2));
// [ 'AA ', 'BB ', 'Aa ' ]

// 모든 문자를 각각 하나씩 선택하려면 '.'을 하나만 사용하고 g를 지정한다.
const regexr3 = /./g;
console.log(targetStr.match(regexr3));
// [ 'A', 'A', ' ', 'B', 'B', ' ', 'A', 'a', ' ', 'B', 'b' ]
```

### 문자 또는 문자열 지정 추출

```javascript
// 패턴에 문자 또는 문자열을 지정하면 일치하는 문자 또는 문자열을 추출한다.
const regexr4 = /A/;
console.log(targetStr.match(regexr4));
// [ 'A', index: 0, input: 'AA BB Aa Bb', groups: undefined ]

// 문자열을 지정해 검색하면 기본적으로 대소문자를 구별하는데, 대소문자를 구별하지 않게 하려면 'i' 플래그를 사용한다.
const regexr5 = /A/ig;
console.log(targetStr.match(regexr5));
// [ 'A', 'A', 'A', 'a' ]

// '+'를 붙이면 패턴을 반복하는 문자열 즉, 패턴을 연결 연산자로 붙인 문자열이 검색된다.
const regexr6 = /A+/g;
console.log(targetStr2.match(regexr6));
// [ 'AA', 'AAA', 'A' ]

// '+'를 사용하지 않고 g 플래그만 사용하면 각각 떼어진 문자가 반환된다.
const regexr7 = /A/g;
console.log(targetStr2.match(regexr7));
// [ 'A', 'A', 'A', 'A', 'A', 'A' ]

// '|'를 사용하면 or의 의미를 갖는다.
const regexr8 = /A|B/g;
console.log(targetStr.match(regexr8));
// [ 'A', 'A', 'B', 'B', 'A', 'B' ]

// 나란히 연결된 단어 레벨을 추출하려면 '+' 연산자를 사용한다.
const regexr9 = /A+|B+/g;
console.log(targetStr.match(regexr9));
// [ 'AA', 'BB', 'A', 'B' ]

// 위 패턴에서 '+'는 or 패턴을 계속 반복한다. 이것을 간단히 표현하려면 '[]'를 사용하면 된다.
const regexr10 = /[AB]+/g;
console.log(targetStr.match(regexr10));
// [ 'AA', 'BB', 'A', 'B' ]

// '[]' 내에서 범위를 지정하려면 '-'를 사용한다.
const regexr11 = /[A-Z]+/g;
console.log(targetStr3.match(regexr11));
// [ 'AA', 'BB', 'ZZ', 'A', 'B' ]

// 대소문자를 구별하지 않는 방법으로 'i' 플래그를 사용할 수도 있고 범위를 지정해줄 수도 있다.
const regexr12 = /[A-Za-z]+/g;
const regexr13 = /[A-Z]+/gi;
console.log(targetStr.match(regexr12));
// [ 'AA', 'BB', 'Aa', 'Bb' ]
console.log(targetStr.match(regexr13));
// [ 'AA', 'BB', 'Aa', 'Bb' ]
```

### 숫자 추출

```javascript
// 숫자를 추출하는 방법
const regexr14 = /[0-9]+/g;
console.log(targetStr4.match(regexr14));
// [ '24', '000' ]

// 컴마를 패턴에 포함시키면 컴마 때문에 분리되지 않는다.
const regexr15 = /[0-9,]+/g;
console.log(targetStr4.match(regexr15));
// [ '24,000' ]

// 위 표현식을 간단히 표현하면 '\d'를 사용할 수 있다.
let regexr16 = /[\d,]+/g;
console.log(targetStr4.match(regexr16));
// [ '24,000' ]

// '\D'는 'not \d'이므로 숫자가 아닌 모든 문자열을 뜻한다.
regexr16 = /[\D,]+/g;
console.log(targetStr4.match(regexr16));
// [ 'AA BB Aa Bb ', ',' ]

// '\w'는 알파벳과 숫자를 의미한다.
let regexr17 = /[\w,]+/g;
console.log(targetStr4.match(regexr17));
// [ 'AA', 'BB', 'Aa', 'Bb', '24,000' ]

// '\W'는 'not \w'이므로 알파벳과 숫자가 아닌 모든 문자열을 뜻한다.
regexr17 = /[\W,]+/g;
console.log(targetStr4.match(regexr17));
// [ ' ', ' ', ' ', ' ', ',' ]
```

## 자주 사용하는 정규표현식

### 특정 단어로 시작하는지 검색

```javascript
const url = 'http://example.con';
// ^는 문자열의 처음을 의미한다.
const regexr = /^http/;
console.log(regexr.test(url)); // true
```

### 특정 단어로 끝나는지 검색

```javascript
const fileName = 'index.html';
// $은 문자열의 끝을 의미한다.
const regexr = /html$/;
console.log(regexr.test(fileName)); // true
```

### 숫자인지 검색

```javascript
const targetStr = '12345';
const regexr = /^\d+$/;
console.log(regexr.test(targetStr)); // true
```

### 하나 이상의 공백으로 시작하는지 검사

```javascript
const targetStr = ' Hi!';
// '\s'는 스페이스 공백을 뜻한다.
// 여러가지 공백 문자(스페이스, 탭 등) -> [\t\r\n\v\f]
const regexr = /^[\s]+/;
console.log(regexr.test(targetStr)); // true
```

### 아이디로 사용 가능한지 검사(영문자, 숫자만 허용/4~10자리)

```javascript
const id = 'abc123';
// 조건 1: 알파벳 대소문자 또는 숫자로 시작하고 끝난다. ^와 $
// 조건 2: 4~10 자리인지 검사 {4,10}
const regexr = /^[A-Za-z0-9]{4,10}$/;
console.log(regexr.test(id)); // true
```

### 메일 주소 형식에 맞는지 검사

```javascript
const email = 'test333-444@gmail.com';
// 0~9, a~z, A-Z로 시작한다.
// 중간에 특수문자가 들어가는 것은 무방하나 아이디 맨 끝자리에는 올 수 없다.
// @ 기호 이후에도 0~9, a~z, A~Z로 시작하며 중간에 특수문자가 들어갈 수 있으나 끝에는 들어갈 수 없다.
// . 기호 이후에는 대소문자 알파벳만 올 수 있으며 알파벳의 갯수는 2~3개여야 한다.
const regexr = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
console.log(regexr.test(email)); //true
```

### 핸드폰 형식에 맞는지 검사

```javascript
const cellphone = '010-1234-5678';
// 숫자로 시작하는 3자리-숫자 3~4자리-숫자로 끝나는 4자리
const regexr = /^\d{3}-\d{3,4}-\d{4}$/;
console.log(regexr.test(cellphone)); // true
```

### 특수문자 포함 여부 검사

```javascript
const targetStr = 'abc#123';
// [^]은 not을 의미한다. 따라서 [^A-Za-z0-9]는 알파벳 대소문자 및 숫자로 시작하지 않는 모든 문자를 의미한다.
let regexr = /[^A-Za-z0-9]/gi;
console.log(regexr.test(targetStr)); // true

// 특수문자를 선택적으로 검사할 수도 있다.
regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
console.log(regexr.test(targetStr)); // true

// 특수 문자 제거
console.log(targetStr.replace(regexr, '')); // abc123
```

## 자바스크립트에서의 정규표현식

### RegExp constructor

자바스크립트는 정규표현식을 위해 RegExp 객체를 지원한다. RegExp 역시 객체이므로 리터럴로 객체를 생성하는 방식과 생성자 함수를 이용한 객체 생성 방식을 사용할 수 있다.

```javascript
// 정규식 리터럴
/ab+c/i;

// 정규식 생성자 함수
// patten: 정규표현식에서의 텍스트
// flags: 정규표현식에서의 플래그(g, i, m, u, y)
new RegExp(pattern[, flags])
new RegExp('ab+c', 'i');
new RegExp(/ab+c/, 'i');
new RegExp(/ab+c/i); // ES6
```

### RegExp Method

정규 표현식을 사용하는 자바스크립트 메서드는

- RegExp.prototype.exec
- RegExp.prototype.test
- RegExp.prototype.match
- RegExp.prototype.replace
- RegExp.prototype.search
- RegExp.prototype.split
  등이 있다.

#### RegExp.prototype.exec(target: string): RegExpExecArray | null ^ES3^

문자열을 검색해 매칭 결과를 반환한다. 반환값은 배열이거나 null 이다.

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

const res = regExp.exec(target);
console.log(res);
// [ 'is',  index: 5,  input: 'Is this all there is?',  groups: undefined ]
```

exec 메서드는 g 플래그를 지정해도 첫번째 매칭 결과만을 반환한다.

```javascript
const target = 'Is this all there is?';
const regExp = /is/g;

const res = regExp.exec(target);
console.log(res);
// [ 'is',  index: 5,  input: 'Is this all there is?',  groups: undefined ]
```

### RegExp.prototype.test(target: string): boolean ^ES3^

문자열을 검색해 매칭 결과를 반환한다. 반환값은 true 또는 false이다.

```javascript
const target = 'Is this all there is?';
const regExp = /is/;

const res = regExp.test(target);
console.log(res); // true

```
