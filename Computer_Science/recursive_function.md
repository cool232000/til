# 재귀함수

재귀함수는 함수 호출 도중에 자기자신을 다시 호출하는 것을 말한다.

재귀함수는 base case(기저조건, 종료조건, 탈출조건)를 가지고 있어야 한다.



## 재귀함수를 만드는 방법

1. 패턴을 찾아서 점화식을 만든다.
2. 기저조건을 만든다.



## Factorial

```python
# factorial (계승)
# 3! = 3*2*1
# 5! = 5*4*3*2*1
# 3! = 3*2!
# 2! = 2*1!

# 점화식
# fac(n)=fac(n-1)*n

# 기저조건
# n==1 or n==0 return 1

def factorial(n):
    if n == 1 or 0:
        return 1
    return factorial(n-1) * n
    
for i in range(1, 6):
    print(factorial(i))
    
# 1
# 2
# 6
# 24
# 120
```



## 피보나치 수열

```python
# 점화식
# fibo(n)<-fibo(n-2)+fibo(n-1)

# 기저조건
# if n==1 than 0
# if n==2 than 1

def fibonacci(n):
    if n==1:
        return 0
    elif n==2:
        return 1
    return fibonacci(n-2)+fibonacci(n-1)
    
    for i in range(1, 11):
    print(fibonacci(i), end=' ')
    
# 0 1 1 2 3 5 8 13 21 34 
```

