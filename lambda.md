# 익명함수

익명함수는 말 그대로 이름이 없는 함수이다. 이 함수는 이름이 없기 때문에 몇 번 사용하지 않을 때 사용한다. 파이썬에서는 lambda 함수를 사용한다.



## lambda 함수의 효용

lambda 함수를 쓰지 않으면 pred 함수를 사용해 아래와 같이 표현해야 한다.

```python
li=[3, 2, 5, 6, 1, 8]
li2=li.copy()
li2.sort()

# [1, 2, 3, 5, 6, 8]

def pred(x):
    return x % 2 == 0
  li2.sort(key=pred, reverse=True)
  
  # [2, 6, 8, 1, 3, 5]
```

lambda 함수를 쓰면 함수 내에서 조건을 줄 수 있다.

```python
  li2.sort(key=lambda x: x%2==0, reverse=True)
```



## map, filter, reduce

세 함수는 lazy evaluation(연산시점을 필요할 때 계산할 수 있다)을 하는 함수들이다.



### map

```python
li=[1, 2, 3, 4]

m=map(lambda x: x**2, li)
next(m)

print('다른 일을 할 수 있다')
# 다른 일을 할 수 있다

next(m)
```

map은 내가 필요한 시점에 필요한 데이터를 가져와서 쓰고 버릴 수 있다. 이때 메모리는 한 번만 쓴다. map을 사용하지 않고 for 문을 돌리면 함수가 끝날 때까지 다른 일을 할 수 없다. 아래와 같이.

```python
for e in li:
    print(e**2)

# 1
# 4
# 9
# 16
```



### filter

```python
li=[5, -4, 3, -2, 6]

f=filter(lambda x: x > 0, li)
for e in f:
    print(e)
    
# 5
# 3
# 6
```



### map과 filter 합쳐서 쓰기

##### (x의 제곱이 양수인 리스트 반환하기)

```python
li=[4, -2, 5, -4, 3]

list(map(lambda x: x**2, filter(lambda x: x>0, li)))

# [16, 25, 9]
```



### reduce

```python
li=[i for i in range(1, 51)]

reduce(lambda a, b: a+b, li)

# 1275
```

1부터 50까지의 숫자를 전부 더하는 for 문이다.

1과 2를 더해서 나온 값 3에 3을 더해, 그 값인 6에 4를 더하는 식으로 계산된다.



#### reduce로 알파벳 개수 세기 문제

```python
li=['a', 'b', 'c', 'd', 'a', 'a', 'a', 'b', 'c']

reduce(lambda dic, ch: dic.update({ch : dic.get(ch, 0)+1}) or dic, li, {})

# {'a': 4, 'b': 2, 'c': 2, 'd': 1}
```



## closure

함수 내부에 상태 정보를 저장해두고 함수 결과가 이 내부의 상태 정보에 따라 출력값이 달라지도록 하는 것이다. OOP를 쓸 수 없을 때 썼다.

상태 정보는 특정한 데이터의 현재 상태이다. 스택 프레임은 어떤 함수가 실행될 때 이때의 상태 정보를 저장하기 위해서 필요하다. 이 상태 정보가 local variable이다. 이 저장된 상태 정보를 가지고 연산할 수 있다.



```python
def adder(a, b):
    return a+b
    
	adder(3, 4)
    
	# 7
	
	adder(5, 10)
	
	# 15
```



#### 계좌 클로저 함수

```python
def account(cus_name, balance):
    def inner(money):
        nonlocal balance
        balance+=money
        return cus_name, balance
    return inner
    
    my_acnt = account('greg', 5000)
    your_acnt = account('john', 300)
    
    my_acnt.__name__
    # 'inner'
    
    your_acnt.__name__
    # 'inner'
    
    my_acnt(500)
    # ('greg', 5500)
    
    your_acnt(500)
    # ('john', 800)
```

