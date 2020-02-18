# string.length

> length 속성은 UTF-16 코드 유닛을 기준으로 문자열의 길이를 나타낸다.

```javascript
var a = 'length';
var b = '';
var c = ' ';

console.log('length의 코드 유닛은 ' + a.length + '개 입니다.');
// length의 코드 유닛은 6개 입니다.

console.log('빈 문자열은 ' + b.length + '개 입니다.');
// 빈 문자열은 0개 입니다.

console.log('공백은 ' + c.length + '개 입니다.');
// 공백은 1개 입니다.


var str = 'string.length는 문자열의 길이를 반환합니다. 이 문자열의 길이는 ';

console.log(str + str.length + '개 입니다.');
// string.length는 문자열의 길이를 반환합니다. 이 문자열의 길이는 42개 입니다.
```





# string.prototype.repeat()

> repeat() 메서드는 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열을 반환한다.

repeat()가 반환할 수 있는 문자열은 양의 정수여야 하며, 최대 문자열은 2<sup>53</sup>-1을 넘지 않아야 한다.

구문: `str.repeat(count);`

`count`: 문자열을 반복할 횟수. 0과 양의 무한대 사이의 정수.



```javascript
'abc'.repeat(1);
// abc

var def = 'def';
def.repeat(3);
// defdefdef
```

