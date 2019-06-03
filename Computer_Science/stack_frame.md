# stack frame

메모리의 스택 영역은 함수의 호출과 관계되는 지역변수와 매개변수가 저장되는 영역이다. 흔히 '스택이 쌓인다'고 표현한다. 스택 영역은 함수의 호출과 함께 할당되며 함수의 호출이 완료되면 사라진다.



stack frame의 문제점은 한 stack에는 하나의 실행만 할 수 있다는 점이다. 따라서 스택을 여러 개 둬서 실행하는 것을 multithreading이라고 한다.



*자바스크립트는 single thread기 때문에 multithreading이 안 된다. 그래서 자바스크립트에서는 CPU가 필요없는 I/O 실행은 OS에서 담당하도록 하고 실행이 끝난 후 callback에 자동으로 올려뒀다가 call stack이 비면 event loop를 통해 알려주어 실제로 동작하도록 한다.*



# call by value

![](https://imgur.com/qdCJFJq.jpg)

main에 있는 x=10이라는 값을 change_value로 복사해서 스택 프레임에 값을 넘겼다. 따라서 change_value에 있는 x 값을 변경해도 main에 있는 값은 변경되지 않는다. 복사해서 사용한 값이기 때문이다.

![](https://imgur.com/L0AfTVy.jpg)

즉, call by value는 그 어떤 변수를 이용하더라도 바깥에 있는 데이터에 접근하는 게 완벽하게 불가능하다. 왜냐하면 스택 프레임이 완벽하게 갈라져 있기 때문이다.



# call by reference

call by reference는 값을 복사해서 전달하지 않고 주소값을 전달한다. 주소값을 전달하는 것은 참조값을 전달하는 것과 같다. 주소값을 알고 있으면 바깥에 있는 데이터에 접근하는 것이 가능해진다.

![](https://imgur.com/e8r5P8D.jpg)

참조한 값은 특정한 문법에 의해 바깥에 있는 데이터에 접근한다. 원래 함수는 자기만의 스택 프레임에서 실행되는데 특정 문법을 이용해 함수 바깥의 데이터에 접근하면 스택 프레임을 벗어나는 것이다.

![ᅵ](https://imgur.com/7JGE14m.jpg)

call by reference는 갈라진 스택 프레임이 동작하고 있는 상황에서 특정 변수를 통해 스택 프레임 바깥에 있는 데이터에 접근 및 수정할 수 있다.



## call by object reference

```python
a=10
def change_value(a, value):
    a=value
    print(f' {a} in change_value')
change_value(a, 30)
print(f' {a} in main')

# return: 30 in change_value
# return: 10 in main
```

전역변수 a=10이다.

change_value의 값으로 a=value를 하면 새로운 값 30을 갖는 오브젝트가 생기면서 지역변수 a는 해당값을 가리킨다. 값이 변경된 게 아니라 가리키는 오브젝트의 값이 바뀐 것이므로 전역변수 a의 값은 변경되지 않는다.



```python
li=[1, 2, 3]
def change_index(li, idx, value):
    li=[1, 200, 3]
    print(li, 'in change_index')
change_index(li, 1, 200)
print(li, 'in main')

# return: [1, 200, 3] in change_index
# return: [1, 2, 3] in main
```

리스트는 포인트 배열이다. 즉, li=[1, 2, 3]은 li 자체가 [1, 2, 3]의 값을 갖는 것이 아니라 리스트 포인트가 있고, 그 리스트 포인트가 [1], [2], [3] 각각의 값을 가리키는 형태이다.

change_index에서 리스트 포인트를 변경하면 [1, 200, 3]으로 변경하면 [1], [200], [3]이라는 새로운 오브젝트가 생성되어 change_index는 그 값을 가리키게 된다. change_index 의 값이 변경되는 함수가 실행되고 나면 해당 스택 프레임이 사라진다. 스택 프레임이 값을 가리키지 않게 되면 object의 값 역시 사라지고 남는 것은 최초에 선언된 li=[1, 2, 3] 이다.



```python
li=[1, 2, 3]
def change_index(li, idx, value):
    li[idx]=value
    print(li, 'in change_index')
change_index(li, 1, 200)
print(li, 'in main')

# return: [1, 200, 3] in change_index
# return: [1, 200, 3] in main
```

index를 통해 접근하지 않으면 리스트의 값은 [1, 2, 3]에서 변경되지 않는다. 내부에서 변경하는 값은 내부에서만 동작하기 때문이다. 그런데 li=[1, 2, 3]이 아니라 리스트는 리스트 포인트를 가리키고, 그 리스트 포인트는 또 각자의 [1], [2], [3] 값을 가리키는 것이므로 인덱스 값을 통해 접근하면 1번 인덱스인 [2]의 값을 [200]으로 변경할 수 있다.

즉, 리스트 포인트는 변경되지 않고 리스트 포인트가 가리키는 인덱스 값이 변경되기 때문에 전역변수의 값도 바뀌게 된다.



### immutable object

immutable object는 함수 내에서 값을 변경할 수 없다. 따라서 함수 내부에서 새로운 값을 지정해줘야 한다.

immutable object인 tuple의 내부에서 값을 변경해야 한다면 어떻게 해야 할까.

```python
tu=(1, 2, 3)
def change_tuple(tu, e1, e2, e3):
    tu=(e1, e2, e3)
    print(tu, 'in change_tuple')

change_tuple(tu, 4, 5, 6)
print(tu)

# 값이 변경되지 않는다.
```

따라서 파이썬에서는 지역변수인 tu를 리턴하고, 그 리턴한 값을 바깥에서 재정의하면 값이 변경된다.

```python
tu=(1, 2, 3)
def change_tuple(tu, e1, e2, e3):
    tu=(e1, e2, e3)
    print(tu, 'in change_tuple')
    return tu

tu=change_tuple(tu, 4, 5, 6)
print(tu)

# 값이 변경된다.
```

