# stack

stack은 흔히 접시를 쌓는 것처럼 제일 나중에 들어간 원소가 제일 먼저 나오는 방식이다. 이것을 LIFO(Last In, First Out), 선입후출 혹은 후입선출이라고 한다.



```python
class Stack:
    def __init__(self):
        self.container=list()
    
    # empty는 반드시 불리언 값으로 반환한다.
    def empty(self):
        if not self.container:
            return True
        return False
    
    # 데이터는 매개변수이다. 데이터를 푸시하는 것이므로 반환값이 없다.
    def push(self, data):
        self.container.append(data)

    # 래퍼 함수(wrapper function)
    # 있는 데이터를 하나씩 꺼내는 것이므로 매개변수가 필요하지 않다.
    def pop(self):
        return self.container.pop()
    
    def peek(self):
        return self.container[-1]
```



# Queue

queue는 화장실 앞에 줄을 서는 것처럼 제일 먼저 들어간 원소가 제일 먼저 나오는 방식이다. 이것을 FIFO(First In, First Out), 선입선출이라고 한다.



```python
class Queue:
    def __init__(self):
        self.container=list()
        
    def empty(self):
        if not self.container:
            return True
        return False
    
    def enqueue(self, data):
        self.container.append(data)

    # 래퍼 함수(wrapper function)
    def dequeue(self):
        return self.container.pop(0)
    
    def peek(self):
        return self.container[-1]
```



# Stack을 두 번 이용해 Queue 구현하기

stack을 두 번 이용해 queue를 구현하려면 첫번째 stack에 push한 값을 두번째 stack으로 pop해서 push해주고, 그 값을 pop하면 마치 queue를 이용한 것처럼 push한 순서대로 data를 pop할 수 있다.

그러나 여기에는 함정이 있다.

만약 단순히 첫번째 stack에서 두번째 stack으로 data를 pop한다면, 중간에 data를 추가할 경우 두번째 stack에서 최종적으로 pop 되는 data가 입력된 순서대로 출력되지 않을 수 있다.

따라서 중요한 것은 첫번째 stack의 data를 두번째 stack으로 옮겨주는 시점을 정하는 것이다.

```python
#Stack을 정의
class Stack:
    def __init__(self):
        self.container=list()
        
    def empty(self):
        if not self.container:
            return True
        return False
    
    def push(self, data):
        self.container.append(data)

    # 래퍼 함수(wrapper function)
    def pop(self):
        return self.container.pop()
    
    def peek(self):
        return self.container[-1]
      
#Queue를 정의
class Queue:
    def __init__(self):
        self.first = Stack()
        self.second = Stack()
        
    def empty(self):

        if self.first.empty() and self.second.empty():
            return True
        return False

# 빈 first Stack에 data를 넣어준다.
    def enqueue(self, data):
        self.first.push(data)

    def dequeue(self):
        if self.empty():
            return None

        # first에서 second로 옮기는 시점이 중요하다.
        # 'second가 비었을 때'라는 조건을 주기 위해 if문을 추가한다.
        if self.second.empty():
            while not self.first.empty():
                self.second.push(self.first.pop())

        return self.second.pop()
```



first에서 second로 data를 이동해주는 시점을, second가 비어있을 때라는 조건을 주면

```python
q=Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)

print(q.dequeue())

q.enqueue(4)
q.enqueue(5)

while not q.empty():
    print(q.dequeue())
```

위와 같이 값을 중간에 추가해도 엉키지 않고 push된 순서대로 pop 된다.
