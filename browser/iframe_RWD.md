# iframe 요소 반응형으로 만들기

html5에서는 `<video>` 태그가 추가되어 영상 요소를 자유롭게 삽입할 수 있게 되었다. 그러나 youtube, vimeo 등의 서비스가 활발하게 운영되고 있기 때문에 이러한 영상을 가져오는 경우도 있다. 외부 서비스 영상은 대개 `<iframe>` 태그를 사용하는데, `<iframe>` 요소의 `width`, `height`를 조정하기 위해서는 약간의 트릭이 필요하다.



## iframe 감싸기

`<video>` 태그는 따로 영상을 감싸주는 요소가 필요하지 않지만 `<iframe>` 태그를 사용해 가져온 영상은 반응형에 대응하기 위해 감싸주는 요소가 필요하다. 감싸주지 않으면 `<iframe>`이 기준을 잡을만한 요소가 없어지기 때문에 반드시 감싸야 한다.

```html
<div class="iframeContainer iframe16To9">
  <iframe src="https://www.youtube.com/embed/2KtFPjSp3og" allowfullscreen></iframe>
</div>
```

이렇게 감싼 `<div>` 요소에 포지션으로 `relative`를 주고 내부에 있는  `<iframe>`에 `absolute`를 줘서 `iframe`이 `div`의 크기에 영향을 받도록 `width`와 `height`를 100%로 준다.

```css
.iframeContainer {
  position: relative;
  width: 100%;
}
.iframeContainer iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
```

이렇게 되면 `<iframe>` 요소는 `<div>`의 크기에 영향받는 상태가 된다. `<div>` 요소는 `<div>`를 싸고 있는 `<figure>`의 `width`만큼 움직이게 하기 위해 100%를 준다. 여기까지 하면 `iframe` 요소는 100%의 `width`를 가지게 되는데 여기에 `height`를 100%를 줘도 크기만큼 가지지 못하기 때문에 `height`를 0을 주고 대신 `padding-top(or padding-bottom)`을 줘서 영역을 확보해 `iframe` 요소가 전체 사이즈만큼의 크기를 차지할 수 있게 한다.

이때 `div` 요소가 `16:9`의 비율을 갖거나 `4:3` 비율을 가져도 대응할 수 있도록 iframe`16To9` 혹은 `iframe4To3`이라는 클래스를 줘서 어떤 비율을 선택하는지에 따라 클래스를 다르게 줄 수 있도록 한다. 때문에 `iframe`을 싸고 있는 요소인 `div`에 `height`를 0, `padding-top`을 비율만큼 줄 수 있지만 그렇게 하지 않고 클래스를 분리해 `.iframecontainer`에는 `height`를 0, `.iframe16To9`에는 `padding-top`을 `9/16*100(결과값 56.25%)`을 준다.

```css
.iframeContainer {
  position: relative;
  width: 100%;
  height: 0;
}

/* 16:9 */
.iframe16To9 {
  padding-top: 56.25%;
}

/* 4:3 */
.iframe4To3 {
  padding-top: 75%;
}

.iframeContainer iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
```

height를 0을 주는 이유는 예외상황을 없애기 위해서이다. 어떤 브라우저, 어떤 사이즈로 접근하더라도 동일한 사용자 경험을 제공하기 위해 height를 0을 주는 것이다.