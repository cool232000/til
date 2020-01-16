# [평균 구하기](https://programmers.co.kr/learn/courses/30/lessons/12944)

정수를 담고 있는 배열 arr의 평균값을 return하는 함수, solution을 완성해보세요.

**제한조건**

- arr은 길이 1 이상, 100 이하인 배열입니다.
- arr의 원소는 -10,000 이상 10,000 이하인 정수입니다.

**입출력 예**

| arr       | return |
| --------- | :----: |
| [1,2,3,4] |  2.5   |
| [5,5]     |   5    |



---

**나의 풀이**

1. 고차함수 중 reduce를 사용해 배열을 돌면서 임의의 수 a와 b를 더해나간다.
2. 총합을 arr의 길이로 나누면 평균이 도출된다.



~~~javascript
function solution(arr) {
    let sum = arr.reduce((a, b) => a + b)
    return sum / arr.length;
}
~~~





---

**Array.prototyape.reduce()**

reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고 하나의 결과값을 반환한다.

~~~
arr.reduce(callback[, initalValue])
~~~

reduce()는 빈 요소를 제외하고 배열 내에 존재하는 각 요소에 대해 callback 함수를 한번씩 실행하는데, 콜백 함수는 다음의 네 인수를 받는다.

- accumulator
- currentValue
- currentIndex
- array

콜백의 최초 호출시 accumulator와 currentValue는 다음의 두 가지 값 중 하나를 가질 수 있다.

1. reduce() 함수 호출에서 initialValue를 제공한 경우, accumulator는 initialValue와 같다.
2. reduce() 함수 호출에서 initialValue를 제공하지 않은 경우, accumulator는 배열의 첫번째 값과 같고 currentValue는 두번째 값과 같다.

*initialValue를 제공하지 않으면 reduce()는 인덱스 1부터 시작해 콜백 함수를 실행하고 첫번째 인덱스는 건너뛴다. initialValue를 제공하면 인덱스 0에서 시작한다.*

*만약 배열이 비어있는데 initialValue도 제공하지 않으면 **TypeError**가 발생한다.*

배열의 요소가 하나 뿐이면서 initialValue를 제공하지 않은 경우나 initialValue는 주어졌으나 배열이 빈 경우에는 단독값을 콜백 호출 없이 반환한다.