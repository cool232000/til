# 함수에서의 추상화

프로그래머는 추상화(abstraction) 작업을 하는 사람이다. 추상화의 도구로 함수나 객체가 있는 것이다. 따라서 프로그래머는 함수에 입각해서 추상화를 한다.

procedure를 활용해서 프로그래밍하는 것은 procedural programming 즉, 절차지향

객체를 이용해서 추상화를 하는 기법을 OOP(object-oriented programming) 즉, 객체지향이라고 한다.

절차지향과 객체지향의 목적은 추상화이다. 과거에는 절차지향으로 작업했으나 작업이 점점 헤비해지면서 변수와 함수를 함께 묶은 객체지향이 등장했다.



## 함수에서의 추상화란?

함수는 함수 시그니처(function signature) 또는 인터페이스(interface)와 내부구현으로 나뉘어지는데, 함수 시그니처(인터페이스)와 내부구현을 분리하는 것을 함수에서의 추상화라고 한다.

함수 시그니처는 함수 이름, 매개변수(parameter/argument), 결과값/반환값(return)을 가진다. 사용자(user programmer)는 내부구현을 몰라도 함수 시그니처(인터페이스)만 알면 프로그램을 사용하는데 문제가 없다.



## 함수 시그니처를 설계할 때 주의할 점

- 함수 이름은 함수가 어떤 일을 하는지 명확하게 나타내야 한다. 이름이 길어도 상관없다.
- 매개변수와 리턴값을 제대로 설계해야 한다. 혼자서 한 번만 작업한다면 상관이 없겠지만 대개 프로그래밍은 협업으로 진행되기 때문이다. 이것을 미리 합의하는 것을 기능 명세라고 한다.
- 내부구현을 하기 전에 인터페이스를 먼저 설계해야 한다.



## Absolute epsilon comparisons의 함정

절대 비교 기법을 알아보기 위해 아래와 같은 함수를 만들면 콘솔은 "NOT THE SAME"을 반환한다.

```javascript
function main(){
    var a = 0.3;
    var b = 0.1 * 3;

    if (a==b)
    {
        console.log("THE SAME");
    }else{
        console.log("NOT THE SAME");
    }
}
```

위 코드가 동작하지 않기 때문에 코드를 다시 아래처럼 수정하면 원래 원했던 "THE SAME"을 반환한다.

```javascript
function is_equal(a, b){
    return Math.abs(a-b) <= 1e-10
}

function main(){
    var a = 0.3;
    var b = 0.1 * 3;

    if(is_equal(a, b))
    {
        console.log("THE SAME");
    }else{
        console.log("NOT THE SAME");
    }
}
```

그런데 이 코드는 동작은 하지만 비교해야 하는 수가 1e-10으로 고정되어버리기 때문에 추상화가 깨어지게 된다. 이 함수를 계속 쓰려면 같은 기능을 하는 함수인데 small 상황과 big 상황을 나눠서 함수를 짜야하는 문제가 발생하는 것이다.

따라서 모든 상황에서 유연하게 동작할 수 있도록 추상화가 깨지는 것을 막아야 한다.
