# [직사각형 별찍기](https://programmers.co.kr/learn/courses/30/lessons/12969)

이 문제에는 표준 입력으로 두 개의 정수 n과 m이 주어집니다.
별(*) 문자를 이용해 가로의 길이가 n, 세로의 길이가 m인 직사각형 형태를 출력해보세요.

------

##### 제한 조건

- n과 m은 각각 1000 이하인 자연수입니다.

------

##### 예시

입력

```
5 3
```

출력

```
*****
*****
*****
```



---

**나의 풀이**

1. 두번째로 들어오는 숫자 즉, 세로로 찍힐 숫자 b만큼 반복문을 돌면서
2. 첫번째로 들어오는 숫자 즉, 가로로 찍힐 숫자 a를 repeat() 함수를 써서 a만큼 콘솔에 찍히게 한다

~~~javascript
process.stdin.setEncoding('utf8');
process.stdin.on('data', data => {
    const n = data.split(" ");
    const a = Number(n[0]), b = Number(n[1]);
    
    let star = '*';
    for (let i = 0; i < b; i++) {
        console.log(star.repeat(a));
    }
});
~~~



---

**String.prototype.repeat()**

repeat() 메서드는 문자열을 주어진 횟수만큼 반복해 붙인 새로운 문자열을 반환한다

```
str.repeat(count);
```

매개변수 count: 문자열을 반복할 횟수. 0과 양의 무한대 사이의 정수.