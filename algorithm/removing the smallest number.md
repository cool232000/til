# [제일 작은 수 제거하기](https://programmers.co.kr/learn/courses/30/lessons/12935)

정수를 저장한 배열, arr 에서 가장 작은 수를 제거한 배열을 리턴하는 함수, solution을 완성해주세요. 단, 리턴하려는 배열이 빈 배열인 경우엔 배열에 -1을 채워 리턴하세요. 예를들어 arr이 [4,3,2,1]인 경우는 [4,3,2]를 리턴 하고, [10]면 [-1]을 리턴 합니다.

##### 제한 조건

- arr은 길이 1 이상인 배열입니다.
- 인덱스 i, j에 대해 i ≠ j이면 arr[i] ≠ arr[j] 입니다.

##### 입출력 예

| arr       | return  |
| --------- | ------- |
| [4,3,2,1] | [4,3,2] |
| [10]      | [-1]    |



---

**나의 풀이**

1. 가장 작은 수는 Math.min()을 사용해 찾는다.
2. 인수로 들어오는 배열에서 가장 작은 수를 제외한 배열을 필터링한다.
3. 필터링한 배열의 length가 true 값이라면 그대로 필터링된 배열을 리턴하고
4. false 값이라면 [-1]을 리턴한다.



```javascript
function solution(arr) {
    let answer = [];
    answer = arr.filter(array => array != Math.min(...arr));
    return answer.length ? answer : [-1];
}
```

