#[핸드폰 번호 가리기](https://programmers.co.kr/learn/courses/30/lessons/12948)

프로그래머스 모바일은 개인정보 보호를 위해 고지서를 보낼 때 고객들의 전화번호의 일부를 가립니다.
전화번호가 문자열 phone_number로 주어졌을 때, 전화번호의 뒷 4자리를 제외한 나머지 숫자를 전부 `*`으로 가린 문자열을 리턴하는 함수, solution을 완성해주세요.

##### 제한 조건

- s는 길이 4 이상, 20이하인 문자열입니다.

##### 입출력 예

| phone_number | return      |
| ------------ | ----------- |
| 01033334444  | *******4444 |
| 027778888    | *****8888   |



---

**나의 풀이**

1. 인수로 받는 phone_number를 뒷 4자리만 변수 answer에 담는다.
2. 반복문으로 phone_number의 뒷 4자리 전까지 돌면서 변수 star에 반복되는 횟수만큼 문자열 *을 찍는다.
3. 변수 star에 담긴 값과 변수 answer에 담긴 값을 연결해 리턴한다.

~~~javascript
function solution(phone_number) {
    let answer = '';
    let star = '';
    answer = phone_number.substring( phone_number.length - 4 );
    for ( let i = 0; i < phone_number.length - 4; i++ ) {
        star += '*';
    }
    return star + answer;
}
~~~

*string.substring()은 문자열을 추출하는 메서드이다.*

*string.substring(start, end)로 사용하며, start 값은 필수이고 end 값을 생략할 경우 가장 끝자리 문자열을 의미한다.*

