# enum

Enum은 Enumeration의 약자로 열거형이라는 뜻이다. 열거형을 사용하면 명명된 상수 집합을 정의할 수 있다. Typescript에서의 열거형은 숫자와 문자열을 모두 제공한다. 열거형은 `enum` 키워드를 사용해 정의할 수 있다.



## 숫자열거형

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right
}
```

1로 초기화되는 Up이라는 멤버가 있다. 이후에 나열되는 멤버는 1씩 증가한 값을 가진다. 즉, Down = 2, Left = 3, Right = 4와 같다. 초기화를 하지 않는 경우 숫자는 0부터 시작한다.

숫자열거형은 계산 멤버와 상수 멤버로 혼합될 수 있다. 그러나 이 경우

1. 이니셜라이저가 없는 열거형이 먼저 오거나
2. 숫자 상수로 초기화된 숫자열거형 혹은 기타 상수 열거 멤버 뒤에 와야 한다.

때문에 아래와 같은 형식은 허용되지 않는다.

```typescript
enum E {
  A = getSomeValue(),
  B // Error! Enum member must have initializer
}
```

