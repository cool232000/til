# 함수와 메서드

절차지향은 함수를 이용해서 프로그래밍하는 것이다. 함수는 어떤 기능(operation, behavior)를 구현한 것이고, 함수를 설계할 때 가장 중요한 것은 함수 시그니처이다.

함수는 상태정보를 갖지 않는다. 같은 인풋에 대해 같은 아웃풋을 내보낸다. 절차지향은 함수를 통해 추상화를 한 것 즉, 함수가 추상화의 도구이다.



객체지향은 객체(object)가 추상화의 도구이다. 객체는 관련있는 변수와 함수를 묶은 것인데, 변수가 특정 값을 갖는 상태정보(data)이고 함수는 기능을 담당한다.

그래서 객체지향에서의 함수는 같은 인풋에 같은 아웃풋을 리턴하지 않는다. 인풋으로 동일한 값을 받더라도 변수의 상태정보에 따라 출력값이 달라진다.





## 계좌함수를 이용해 메서드 이해하기

```python
class Account:
    # 생성자(constructor) __init__>>initioalize?
    # 객체를 생성할 때 "반드시" 한 번 호출한다.
    def __init__(self, cust_name, init_balance):
        #인스턴스 멤버(속성, 데이터, 변수)를 설정
        self.name=cust_name
        self.balance=init_balance
        
    #소멸자(distructor)
    # 객체가 소멸될 때 "반드시" 한 번 호출한다.
    def __del__(self):
        pass
    
    # 인스턴스 메서드(기능, 행동)
    # 입금
    def deposit(self, money):
        if money < 0:
            return False
        
        # 관련있는 변수: 인스턴스 멤버
        self.balance+=money
        return True
    
    #출금
    def withdraw(self, money):
        if money > self.balance:
            return 0
        self.balance -= money
        return money
    
    #송금
    def tranfer(self, other, money):
        self.balance -= money
        # 다른 객체의 멤버에 바로 접근하지 않는다!! (인터페이스로 열어두지 않는 이상)
        # 다른 객체의 데이터를 변경할 때는 "반드시" 상대 객체가 가진 메서드에 위임을 해야 한다.
        # 이것을 메시지 패싱이라고 한다.
        # other.money += money
        other.deposit(money)
```

나(Greg)의 계좌에 5,000원이 있고

```python
my_acnt=Account('Greg', 5000)
```

너(John)의 계좌에 100원이 있다면

```python
your_acnt=Account('John', 100)
```



1,000원을 출금하고자 할 때

```python
my_acnt.withdraw(1000)
your_acnt.withdraw(1000)
```

나(Greg)는 출금할 수 있지만 John은 출금할 수 없다.

이것은 계좌에 미리 설정된 잔고(객체값)에 따른 것이기 때문에 이 계산식은 더이상 함수가 아니라 메서드가 된다.



### 다른 객체의 데이터를 변경하고자 할 때

내가 John의 계좌에 2,000원을 송금하려면 deposit 속성을 이용해서 입금해줘야 하고,

```python
my_acnt.tranfer(your_acnt, 2000)
```

이 결과값을

```python
your_acnt.withdraw(1000)
```

1,000원을 출금한 것으로 확인할 수 있다.



외부에서 어떤 객체의 데이터를 바꾸는 것은 안 된다. 객체의 메서드를 통해서만 변경해야 한다.
