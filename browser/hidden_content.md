# Hidden Content

뷰에는 나타나지 않지만 보조기기가 접근해야 할 필요가 있는 콘텐츠에 대해서는 CSS로 해당 영역을 뷰에서 보이지 않게 조절한다.

```css
.a11y-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  margin: -1px;
  clip-path: polygon(0 0, 0 0, 0 0);
  /* 현재는 권장되지 않는 과거 문법 */
  clip: rect(0, 0, 0, 0); 
}
```

뷰에서 보이지 않게 하려면 `display: none;`을 사용할 수도 있다. 그러나 `display: none;`을 사용하게 되면 뷰에서 사라질 뿐만 아니라 보조기기로도 접근할 수 없게 된다. 아예 렌더링 자체가 되지 않아 돔에서 없는 콘텐츠가 되어버리는 것이다.

숨김콘텐츠를 사용하는 것은 렌더링은 하되 뷰에서 보이지 않게 하기 위한 것이기 때문에 `display: none;`을 사용하게 되면 원하는 결과를 도출할 수 없게 된다. 때문에 `position: absolute;`를 사용해 박스를 위로 띄운 다음 크기를 최소한으로 줄이고(1px) `overflow: hidden;`을 적용해 콘텐츠가 최대한 보이지 않게 한 후 음수 마진을 줘서 영역을 완전히 잃게 만든다.

그리고 `clip-path`를 사용해 뷰에서 차지하는 영역을 사라지게 만든다.



## 안드로메다로 보내지 말자

```css
.a11y-hidden {
    position: absolute;
    text-indent: -10000px;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
    margin: -1px;
    clip: rect(0, 0, 0, 0);
    clip-path: polygon(0 0, 0 0, 0 0);
}
```

위 코드는 과거에 많이 썼던 방식이다. 이 방식이 나쁜 이유는 박스를 너무 먼 위치로 보내기 때문에 보조기기가 해당 숨김 콘텐츠로 접근했다가 다시 바디로 돌아오기 힘들어진다. 때문에 해당 방법을 활용하는 건 접근성 측면에서 옳지 않은 방법이다.

