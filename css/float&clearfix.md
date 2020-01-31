# float

`float`는 띄우다 라는 의미를 가지고 있는 요소로서, 출판 작업 시에 이미지와 단락을 물 흐르듯 구분하는 형태를 웹으로 구현한 것이다. 따라서 배치를 위한 속성은 아니나 배치 특히 선형적으로 구성된 박스를 가로로 배치하는 방법을 쉽게 구현할 수 있어 배치에 자주 사용한다.

**3D로 이해하는 `float` 속성의 특징**

> [CSS Float and Clear Explained - How does CSS float and clear work?](https://youtu.be/xara4Z1b18I)



## float 속성의 단점

`float`는 배치할 때 용이하게 적용할 수 있는 방법이지만 `float`를 적용하는 순간 영역을 잃어버리기 때문에 영역을 잡은 상태로 작업을 해야 하는 경우에 다음 박스에 영향을 주며 배치를 까다롭게 만든다. 따라서 `float`를 적용해 원하는 대로 가로 배치를 하면서 영역을 잃어버리지 않게 하는 방법들이 존재한다.

* overflow: hidden을 활용하는 방법
* clearfix를 활용하는 방법



### overflow: hidden

`overflow`는 박스를 over하는 콘텐츠에 대한 처리를 하는 속성이기 때문에 박스 내부의 콘텐츠가 얼마만큼의 영역을 잡고 있는지를 봐야 한다. 따라서 `float`를 사용해서 박스가 영역을 잃어버리게 되더라도 `overflow`가 영역을 확인해서 그만큼의 영역을 확보(BFC: Block Formatting Context)해주게 된다.

그러나 `overflow`에는 치명적인 문제가 하나 있는데, 디자인 상의 이유로 해당 박스를 튀어나가는 형태로 웹을 구성했을 때 hidden 처리가 되어 콘텐츠가 보이지 않게 된다는 것이다. 콘텐츠가 박스 밖으로 튀어나가지 않을 경우에는 유용하게 쓰일 수 있지만 다양한 형태의 레이아웃을 구성하고 싶을 때 `overflow: hidden`은 유용한 방법이 아니다.



### clearfix

`clearfix`는 `clear` 속성을 활용하는 방법이다. `clear: both` 속성은 `float`가 적용된 박스 뒤에 빈 박스를 사용하거나 `::after` 가상선택자를 사용해 겹쳐있던 박스에 강제로 마진을 줘서 박스가 늘어난 것처럼 보이게 만드는 속성이다.

예를 들어 다음과 같은 html 코드가 있다고 하자.

```html
<main class="main">
      <div class="group group1">그룹1</div>
      <div class="group group2">그룹2</div>
      <div class="group group3">그룹3</div>
</main>
```

이 html 태그에 있는 group 3개를 float를 사용해 가로 정렬하려고 한다. 그럴 경우 방법은 두 가지가 있다.

* group3 박스 다음에 임의의 div 박스를 생성해 celarfix를 적용하는 것이다.

```html
<main class="main">
      <div class="group group1">그룹1</div>
      <div class="group group2">그룹2</div>
      <div class="group group3">그룹3</div>
  		<div class="clearfix"></div>
</main>
```

```css
.main {
  background-color: blue;
  float: left;
}

.group1 {
  background-color: tomato;
  width: 250px;
}

.group2 {
  background-color: skyblue;
  width: 380px;
}

.group3 {
  background-color: pink;
  width: 190px;
}

.clearfix {
  content: "";
  display: block;
  clear: both;
}
```

위 방식은 `float`를 사용하지 않고 `flex`를 사용하겠다고 마음 먹는 순간 걸맞지 않은 방법이 된다. html로 작성한 임의의 `div`에 가로세로 속성을 주지 않아도 영역을 차지하게 만들기 때문이다.



* `::after` 가상선택자를 사용하는 방법이다.

```html
<main class="main clearfix">
      <div class="group group1">그룹1</div>
      <div class="group group2">그룹2</div>
      <div class="group group3">그룹3</div>
</main>
```

```css
.main {
  background-color: blue;
  float: left;
}

.group1 {
  background-color: tomato;
  width: 250px;
}

.group2 {
  background-color: skyblue;
  width: 380px;
}

.group3 {
  background-color: pink;
  width: 190px;
}

.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

위 방법을 사용하면 임의의 `div`로 영역은 먹지 않으면서 `float`를 적용하며 사라진 영역을 채울 수 있게 된다.

그러나 `clearfix`는 `float`를 사용할 때 유용한 방식으로 다른 배치 방식을 고민할 때 사용할 수 있는 방법은 아니다. `::afer`를 사용해서 길이를 적용할 수 있었다는 것은 명시적인 `div`가 존재하지 않더라도 일종의 가상 박스가 생겼다고 봐야하기 때문이다. 따라서 `float`를 사용하기 위해 `clearfix`를 먼저 적용해놓고 `flex`로 방법을 바꿀 경우 명시적인 `div`를 사용한 것과 같은 문제가 발생하게 된다.