# 날짜와 시간을 위한 Date 객체

Date 객체는 날짜와 시간(년/월/일/시/분/초/밀리초)을 위한 메서드를 제공하는 빌트인 객체이다. 내부적으로 Date 객체는 숫자값을 가지며, 1970년 1월 1일 00:00(UTC)을 기점으로 현재 시간까지의 밀리초를 나타낸다.
현재의 날짜와 시간은 자바스크립트 코드가 동작한 시스템의 시계에 의해 결정된다. 시스템 시계의 설정에 따라 서로 다른 값을 가질 수 있다.

## Date Constructor

Date 생성자는 날짜와 시간을 가지는 인스턴스를 생성한다. 이렇게 생성된 인스턴스는 기본적으로 현재 날짜와 시간을 나타내는 값을 가진다. 다른 날짜와 시간을 다루고 싶은 경우 해당 날짜와 시간 정보를 명시적으로 지정해야 한다. Date 객체를 생성하는 방법은 다음과 같다.

```javascript
new Date()
new Date(milliseconds)
new Date(dateString)
new Date(year, month[, day, hour, minute, second, millisecond])
```

Date() 생성자 함수를 new 연산자 없이 사용하면 Date 객체를 반환하지 않고 결과값을 문자열로 반환한다.

```javascript
var date = new Date();
console.log(typeof date, date); // object 2019-05-16T09:03:19.078Z

date = Date();
console.log(typeof date, date); // string Thu May 16 2019 18:03:19 GMT+0900 (Korean Standard Time)

console.dir(Date); // [Function: Date]
```

### new Date()

매개변수가 없는 경우 현재의 날짜와 시간을 가지는 인스턴스를 반환한다.

```javascript
var d = new Date();
console.log(d); // 2019-05-16T09:04:56.069Z
```

### new Date(milliseconds)

매개변수에 밀리초를 전달하면 1970년 1월 1일 00:00(UTC)을 기점으로 전달된 밀리초만큼 경과한 날짜와 시간을 가지는 인스턴스를 반환한다.

```javascript
var d = new Date(0);
console.log(d); // 1970-01-01T00:00:00.000Z

var d = new Date(86400001); // 86400000은 하루를 의미한다.
console.log(d); // 1970-01-02T00:00:00.001Z
```

```code
1s = 1,000ms
1m = 60s * 1,000ms = 60,000ms
1h = 60m * 60,000ms = 3,600,000ms
1d = 24h * 3,600,000ms = 86,400,000ms
```

### new Date(dateString)

매개변수에 날짜와 시간을 나타내는 문자열을 전달하면 지정된 날짜와 시간을 가지는 인스턴스를 반환한다. 대신 함수에 전달된 문자열은 parse() 메서드에 의해 인식 가능한 형식이어야 한다.

```javascript
var d = new Date('May 12, 2019 01:31:00');
console.log(d); // 2019-05-11T16:31:00.000Z
// Sun May 12 2019 01:31:00 GMT+0900 (한국 표준시)

var d = new Date('2014/01/03/01:31:00');
console.log(d); // 2014-01-02T16:31:00.000Z
// Fri Jan 03 2014 01:31:00 GMT+0900 (한국 표준시)
```

### new Date(year, month[, day, hour, minute, second, millisecond])

매개변수에 년/월/일/시/분/초/밀리초를 의미하는 숫자를 전달하면 지정된 날짜와 시간을 가지는 인스턴스를 반환한다. 이때 년/월을 반드시 지정해야 한다. 지정하지 않은 옵션 정보는 0 또는 1로 초기화된다.
년/월을 지정하지 않은 경우 1970년 1월 1일 00:00(UTC)을 가지는 인스턴스를 반환한다.

| Argument    | Description                                           |
| ----------- | ----------------------------------------------------- |
| year        | 1900년 이후의 년                                      |
| month       | 월을 나타내는 0~11까지의 정수(0부터 시작하며 0 = 1월) |
| day         | 일을 나타내는 1~31까지의 정수                         |
| hour        | 시를 나타내는 0~23까지의 정수                         |
| minute      | 분을 나타내는 0~59까지의 정수                         |
| second      | 초를 나타내는 0~59까지의 정수                         |
| millisecond | 밀리초를 나타내는 0~999까지의 정수                    |

```javascript
var d = new Date(1999);
console.log(d); // 1970-01-01T00:00:01.999Z
// Thu Jan 01 1970 09:00:01 GMT+0900 (한국 표준시)

var d = new Date (1999, 1, 3, 11, 33, 30, 0);
console.log(d); // 1999-02-03T02:33:30.000Z
// Wed Feb 03 1999 11:33:30 GMT+0900 (한국 표준시)

var d = new Date(1999, 1);
console.log(d); // 1999-01-31T15:00:00.000Z
// Mon Feb 01 1999 00:00:00 GMT+0900 (한국 표준시)

var d = new Date('1999/1/3/11:33:00:00');
console.log(d); // 1999-01-03T02:33:00.000Z
// Sun Jan 03 1999 11:33:00 GMT+0900 (한국 표준시)
```

## Date Method

### Date.now()

1970년 1월 1일 00:00:00(UTC)을 기점으로 현재 시간까지 경과한 밀리초를 숫자로 반환한다.

```javascript
var n = Date.now();
console.log(n); // 1557998737220
```

### Date.parse()

1970년 1월 1일 00:00:00(UTC)을 기점으로 매개변수로 전달된 지정 시간(new Date(dateString)의 인수와 동일한 형식)까지의 밀리초를 숫자로 반환한다.

```javascript
var d = Date.parse('Jan 2, 1970 00:00:00 UTC');
console.log(d); // 86400000

var d = Date.parse('Jan 2, 1970 09:00:00');
console.log(d); // 86400000

var d = Date.parse('1970/01/02/09:00:00');
console.log(d); // 86400000
```

### Date.UTC()

1970년 1월 1일 00:00:00(UTC)을 기점으로 매개변수로 전달된 지정 시간(new Date(year, month[, day, hour, minute, second, millisecond])의 인수와 동일한 형식)까지의 밀리초를 숫자로 반환한다.

```javascript
var d = Date.UTC(1970, 0, 2);
console.log(d); // 86400000

var d = Date.UTC('1970/1/2');
console.log(d); // NaN
```

### Date.prototype.getFullYear()

해당 연도를 나타내는 4자리 숫자를 반환한다.

```javascript
var today = new Date();
var year = today.getFullYear();

console.log(today); // 2019-05-16T09:33:35.495Z
// Thu May 16 2019 18:33:49 GMT+0900 (한국 표준시)
console.log(year); // 2019
```

### Date.prototype.setFullYear()

해당 연도를 나타내는 4자리 숫자를 설정한다. 연도 이외의 월/일도 설정할 수 있다.

```javascript
dateObj.setFullYear(yearValue[, monthValue[, dayValue]])
```

### Date.prototype.getMonth()

해당 월을 나타내는 0부터 11까지의 정수를 반환한다. 1월 0, 12월 11이다.

```javascript
var today = new Date();
var month = today.getMonth();

console.log(today); // 2019-05-16T09:43:12.347Z
// Thu May 16 2019 18:43:29 GMT+0900 (한국 표준시)
console.log(month); // 4
```

### Date.prototype.setMonth()

해당 월을 나타내는 0부터 11까지의 정수를 설정한다. 월 이외의 일도 설정할 수 있다.

```javascript
dateObj.setMonth(monthValue[, dayValue])
```

```javascript
var today = new Date();
today.setMonth(0);
var month = today.getMonth();

console.log(today); // 2019-01-16T09:47:17.880Z
// Wed Jan 16 2019 18:47:58 GMT+0900 (한국 표준시)
console.log(month); // 0

today.setMonth(11, 1);
month = today.getMonth();

console.log(today); // 2019-12-01T09:47:17.880Z
// Sun Dec 01 2019 18:47:58 GMT+0900 (한국 표준시)
console.log(month); // 11
```

### Date.prototype.getDate()

해당 날짜 1부터 31까지 나타내는 정수를 반환한다.

```javascript
var today = new Date();
var date = today.getDate();

console.log(today); // 2019-05-16T09:50:11.298Z
// Thu May 16 2019 18:50:30 GMT+0900 (한국 표준시)
console.log(date); // 16
```

### Date.prototype.setDate()

해당 날짜 1부터 31까지 나타내는 정수를 설정한다.

```javascript
var today = new Date();
today.setDate(1);
var date = today.getDate();

console.log(today); // 2019-05-01T09:53:00.015Z
// Wed May 01 2019 18:53:17 GMT+0900 (한국 표준시)
console.log(date); // 1

```

### Date.prototype.getDay()

해당 요일(0~6)을 나타내는 정수를 반환한다.

| 요일   | 반환값 |
| ------ | ------ |
| 일요일 | 0      |
| 월요일 | 1      |
| 화요일 | 2      |
| 수요일 | 3      |
| 목요일 | 4      |
| 금요일 | 5      |
| 토요일 | 6      |

```javascript
var today = new Date();
var day = today.getDay();

console.log(today); // 2019-05-16T09:56:30.082Z
// Thu May 16 2019 18:56:42 GMT+0900 (한국 표준시)
console.log(day); // 4

```

### Date.prototype.getHours()

해당 시간(0~23)을 나타내는 정수를 반환한다.

```javascript
var today = new Date();
var hours = today.getHours();

console.log(today); // 2019-05-16T09:58:19.293Z
// Thu May 16 2019 18:58:31 GMT+0900 (한국 표준시)
console.log(hours); // 18

```

### Date.prototype.setHours()

해당 시간(0~23)을 나타내는 정수를 설정한다. 시간 외 분/초/밀리초도 설정할 수 있다.

```javascript
dateObj.setHours(hoursValue[, minutesValue[, secondsValue[, msValue]]])

```

```javascript
var today = new Date();
today.setHours(7);
var hours = today.getHours();

console.log(today); // 2019-05-15T22:30:42.128Z
// Thu May 16 2019 07:31:07 GMT+0900 (한국 표준시)
console.log(hours); // 7

today.setHours(0, 0, 0, 0);
hours = today.getHours();

console.log(today); // 2019-05-15T15:00:00.000Z
// Thu May 16 2019 00:00:00 GMT+0900 (한국 표준시)
console.log(hours); // 0

```

### Date.prototype.getMinutes()

해당 분(0~59)을 나타내는 정수를 반환한다.

```javascript
var today = new Date();
var minutes = today.getMinutes();

console.log(today); // 2019-05-16T11:32:52.086Z
// Thu May 16 2019 20:33:17 GMT+0900 (한국 표준시)
console.log(minutes); // 32

```

### Date.prototype.setMinutes()

해당 분(0~59)을 나타내는 정수를 설정한다. 분 이외 초/밀리초도 설정할 수 있다.

```javascript
dateObj.setMinutes(minutesValue[, secondsValue[, msValue]])

```

```javascript
var today = new Date();
today.setMinutes(50);
var minutes = today.getMinutes();

console.log(today); // 2019-05-16T11:50:24.418Z
// Thu May 16 2019 20:50:38 GMT+0900 (한국 표준시)
console.log(minutes); // 50

today.setMinutes(5, 10, 999);
minutes = today.getMinutes();

console.log(today); // 2019-05-16T11:05:10.999Z
// Thu May 16 2019 20:05:10 GMT+0900 (한국 표준시)
console.log(minutes); // 5

```

### Date.prototype.getSeconds()

해당 초(0~59)를 나타내는 정수를 반환한다.

```javascript
var today = new Date();
var seconds = today.getSeconds();

console.log(today); // 2019-05-16T11:39:57.160Z
// Thu May 16 2019 20:40:11 GMT+0900 (한국 표준시)
console.log(seconds); // 57

```

### Date.prototype.setSeconds()

해당 초(0~59)를 나타내는 정수를 설정한다. 초 이외 밀리초도 설정할 수 있다.

```javascript
dateObj.setSeconds(secondsValue[, msValue])

```

```javascript
var today = new Date();
today.setSeconds(30);
var seconds = today.getSeconds();

console.log(today); // 2019-05-16T11:43:30.097Z
// Thu May 16 2019 20:43:30 GMT+0900 (한국 표준시)
console.log(seconds); // 30

today.setSeconds(10, 0);
seconds = today.getSeconds();

console.log(today); // 2019-05-16T11:43:10.000Z
// Thu May 16 2019 20:43:10 GMT+0900 (한국 표준시)
console.log(seconds); // 10

```

### Date.prototype.getMilliseconds()

해당 밀리초(0~999)를 나타내는 정수를 반환한다.

```javascript
var today = new Date();
var ms = today.getMilliseconds();

console.log(today); // 2019-05-16T11:45:30.476Z
// Thu May 16 2019 20:45:48 GMT+0900 (한국 표준시)
console.log(ms); // 476

```

### Date.prototype.getTime()

1970년 1월 1일 00:00:00(UTC)를 기점으로 현재 시간까지 경과된 밀리초를 반환한다.

```javascript
var today = new Date();
var time = today.getTime();

console.log(today); // 2019-05-16T11:47:08.082Z
// Thu May 16 2019 20:47:25 GMT+0900 (한국 표준시)
console.log(time); // 1558007228082

```

### Date.prototype.setTime()

1970년 1월 1일 00:00:00(UTC)를 기점으로 현재 시간까지 경과된 밀리초를 설정한다.

```javascript
dateObj.setTime(timeValue)

```

```javascript
var today = new Date();
today.setTime(86400000);
var time = today.getTime();

console.log(today); // 1970-01-02T00:00:00.000Z
// Fri Jan 02 1970 09:00:00 GMT+0900 (한국 표준시)
console.log(time); // 86400000

```

### Date.prototype.getTimezoneOffset()

UTC와 지정 로케일(Locale) 시간과의 차이를 분 단위로 반환한다.

```javascript
var today = new Date();
var x = today.getTimezoneOffset() / 60;

console.log(today); // 2019-05-16T11:52:15.561Z
// Thu May 16 2019 20:52:35 GMT+0900 (한국 표준시)
console.log(x); // -9

```

KST(Korea Standard Time)는 UTC에 9시간을 더한 시간이다. 따라서 UTC = KST - 9h이다.

### Date.prototype.toDateString()

사람이 읽을 수 있는 형식의 문자열로 날짜를 반환한다.

```javascript
var d = new Date('1988/8/17/13:30');

console.log(d.toString()); // Wed Aug 17 1988 13:30:00 GMT+1000 (Korean Daylight Time)
console.log(d.toDateString()); // Wed Aug 17 1988

```

### Date.prototype.toTimeString()

사람이 읽을 수 있는 형식의 문자열로 시간을 반환한다.

```javascript
var d = new Date('1998/8/17/13:30');

console.log(d.toString()); // Mon Aug 17 1998 13:30:00 GMT+0900 (Korean Standard Time)
console.log(d.toTimeString()); // 13:30:00 GMT+0900 (Korean Standard Time)

```

## Date Example

현재 날짜와 시간을 초 단위로 반복 출력하는 예제이다.

```javascript
(function printNow() {
  var today = new Date();

  var dayNames = ['(일요일)', '(월요일)', '(화요일)', '(수요일)', '(목요일)', '(금요일)', '(토요일)'];

  var day = dayNames[today.getDay()];

  var year = today.getFullYear(),
      month = today.getMonth() + 1,
      date = today.getDate(),
      hour = today.getHours(),
      minute = today.getMinutes(),
      second = today.getSeconds();
      ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12;
  hour = hour ? hour : 12;

  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;

  var now = year + '년' + month + '월' + date + '일' + day + ' ' + hour + ':' + minute + ':' + second + ' ' + ampm;

  console.log(now);
  setTimeout(printNow, 1000);  
}());

```
