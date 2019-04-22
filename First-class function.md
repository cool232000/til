# First-class function

모든 언어가 First-class function을 지원하는 것이다. First-class function를 지원하는 언어의 조건은 세 가지가 있다.

1. 함수를 인자(argument)로 전달할 수 있어야 한다.
2. 함수를 리턴(return)값으로 쓸 수 있어야 한다.
3. 함수를 변수에 할당(전달)할 수 있어야 한다.

자바스크립트와 파이썬은 First-class function을 지원한다.



파이썬으로 First-class function을 지원하는지를 확인해보자.

1. 함수를 인자(argument)로 전달할 수 있는가.

```python
def f(func, a, b):
    return func(a, b)

def g(a, b):
    return a + b

a=10
b=20
f(g, a, b)

# 함수를 인자(argument)로 전달할 수 있다.
```

2. 함수를 리턴(return)값으로 쓸 수 있는가.

```python
def calc(kind):
    if kind=='add':
        def add(a, b):
            return a + b
        return add
    elif kind=='sub':
        def sub(a, b):
            return a - b
        return sub

adder = calc('add')

adder(10, 20)

# 함수를 리턴(return)값으로 쓸 수 있다.
```

3. 함수를 변수에 할당(전달)할 수 있는가.

```python
t = g

t(20, 30)

# 함수를 변수에 할당할 수 있다.
```



## 참고 아티클

파이썬 - 퍼스트클래스 함수(First-class function)

http://schoolofweb.net/blog/posts/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%ED%8D%BC%EC%8A%A4%ED%8A%B8%ED%81%B4%EB%9E%98%EC%8A%A4-%ED%95%A8%EC%88%98-first-class-function/



JavaScript의 함수는 1급 객체(First-class object)이다.

https://bestalign.github.io/2015/10/18/first-class-object/
