# Element.animate()

![랜덤리스트](https://i.imgur.com/d24HSF9.gif)

버튼을 누르면 랜덤으로 순서가 정해져서 뷰에 리스트가 나타나는 추첨기를 만들 때 생각했던 이미지는 생성되는 li들이 약간의 텀을 두고 주르륵(?) 나타나는 것이었다.
그것을 구현하기 위해 처음에는 css에서 animation을 사용했다.

```css
li {
  perspective: 100px;
}

li:nth-child(1) {
  animation: move .2s both;
}

li:nth-child(2) {
  animation: move .4s both;
}

li:nth-child(3) {
  animation: move .6s both;
}

li:nth-child(4) {
  animation: move .8s both;
}

li:nth-child(5) {
  animation: move 1s both;
}

li:nth-child(6) {
  animation: move 1.2s both;
}

li:nth-child(7) {
  animation: move 1.4s both;
}

@keyframes move {
  from {
    opacity: 0;
    transform: rotateX(-90deg);
    transition: all 0.3s cubic-bezier(.36,-0.64,.34,1.76);
  }
  to {
    opacity: 1;
    transform: none;
    transition: all 0.3s cubic-bezier(.36,-0.64,.34,1.76);
  }
```

같은 동작을 하는 애니메이션을 시간만 달리 하다보니 많은 코드가 중복되어 보기가 좋지 않았다. 그래서 처음에는 css에서 변수를 선언해 반복되는 코드를 줄여보려고 하다가 자바스크립트가 지원하는 웹 API 중에 animate() 라는 게 있다는 걸 알게 되었다.

## [Element.animate()](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate)

![브라우저지원현황](https://i.imgur.com/EvympKy.png)

지원되는 브라우저는 많지 않다. 가장 최신 기술이기 때문이다. 신기술에 적극적인 파이어폭스를 제외하면 대부분 최신 버전에서 지원한다. 그러나 지금까지 자바스크립트로 애니메이션을 조작했던 방법(비동기 이벤트 함수 사용 || requestAnimationFrame)보다 성능이 우수하기 때문에 애니메이션을 구현하고자 한다면 더 적합한 기술이라고 할 수 있다.
동작은 css의 @keyframes와 흡사하여 코드를 거의 수정하지 않아도 된다.

```css
li {
  perspective: 100px;
}
```

```javascript
// shuffle 이라는 미리 정의된 배열을 사용해 li를 형성한다.
[...shuffle].map(idx => {
    const $randomList = document.createElement('li');
    $randomList.animate(
      [
        {
          opacity: '0',
          transform: 'rotateX(-90deg)',
          transition: 'all 0.3s cubic-bezier(.36,-0.64,.34,1.76)',
        },
        {
          opacity: '1',
          transform: 'none',
          transition: 'all 0.3s cubic-bezier(.36,-0.64,.34,1.76)',
        },
      ],
      {
        duration: 77 * (idx + 1),
      }
    );
    $listContainer.appendChild($randomList);
  });
```

`element.animate ( keyframes , option )`의 방식으로 사용한다.
keyframes에는 배열 또는 속성이 반복할 값의 배열인 키프레임 객체가 들어와야 한다.
option에는 delay, duration 등 css에서 이미 사용해봐서 익숙한 속성들을 넣어준다.

사용 방법이 쉽고 최신 기술이라 성능에서도 우수하지만 브라우저에서 지원하지 않는 경우가 많기 때문에 그런 부분에 대한 폴리필을 사용해야 하지만 최근에는 애니메이션에 대한 요구가 높아지고 있기 때문에 브라우저 지원 범위만 넓어진다면 유용하게 사용할 수 있을 것 같다.