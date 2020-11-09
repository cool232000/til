# 다크모드 구현하기

다크모드란 일반적으로 더 어두운 색상 팔레트를 사용하는 UI를 말한다. 쉽게 말하면 어두운 배경에 밝은 폰트를 사용하는 것이다. 다크모드를 구현하는 방법은 여러가지가 있는데 가장 쉬운 방법은 `prefers-color-scheme`라는 CSS 미디어 특성을 이용해 사용자의 OS가 사용하는 테마를 감지하는 것이다.

## prefers-color-scheme

```html
<div class="themed">Theme</div>
```

```css
.themed {
  display: block;
  width: 10em;
  height: 10em;
  background: black;
  color: white;
}

@media (prefers-color-scheme: light) {
  .themed {
    background: white;
    color: black;
  }
}
```

## Atrribute 활용하기

CSS를 사용하지 않는 방법으로는 Javascript에서 다크모드와 라이트모드를 조절하는 방법이 있다.
