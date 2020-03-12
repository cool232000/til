# [서울에서 김서방 찾기](https://programmers.co.kr/learn/courses/30/lessons/12919)

String형 배열 seoul의 element중 Kim의 위치 x를 찾아, 김서방은 x에 있다는 String을 반환하는 함수, solution을 완성하세요. seoul에 Kim은 오직 한 번만 나타나며 잘못된 값이 입력되는 경우는 없습니다.

##### 제한 사항

- seoul은 길이 1 이상, 1000 이하인 배열입니다.
- seoul의 원소는 길이 1 이상, 20 이하인 문자열입니다.
- Kim은 반드시 seoul 안에 포함되어 있습니다.

##### 입출력 예

| seoul       | return            |
| ----------- | ----------------- |
| [Jane, Kim] | 김서방은 1에 있다 |



---

**나의 풀이**

1. indexof로 "kim"이 있는 인덱스 위치를 찾아 변수 idx에 담는다
2. '김서방은 "변수 idx"에 있다'는 문장을 문자열 인터폴레이션으로 감싸 리턴한다

~~~javascript
function solution(seoul) {
    const idx = seoul.indexOf("Kim");
    const answer = `김서방은 ${idx}에 있다`;
    return answer;
}
~~~

