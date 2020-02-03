# 마진 상쇄(마진 병합)

블록 요소의 top 및 bottom 마진은 종종 결합되는 마진의 크기가 큰 하나의 마진으로 결합(상쇄)된다. 이것을 마진 상쇄라고 부른다. 이러한 규칙은 0인 마진에도 적용된다. 음수 마진이 포함되는 경우라면 `상쇄되는 마진의 크기 = 제일 큰 양수 마진 + 제일 작은 음수 마진` 으로 계산된다.



## 마진 상쇄가 일어나는 경우

1. 인접 형제 요소

인접 형제 요소의 마진은 상쇄된다. 예를 들어 형제 요소인 `p` 요소가 각자 bottom 마진과 top 마진을 가졌다고 할 때 두 요소 중 마진 크기가 큰 쪽으로 마진이 병합된다.

```html
<p class="margin1">The bottom margin of this paragraph is collapsed...</p>
<p class="margin2">...with the top margin of this paragraph.</p>
```

```css
.margin1 {
  margin-bottom: 30px;
}

.margin2 {
  margin-top: 20px;
}
```

위의 경우 `margin-bottom`이 30px로 더 큰 margin1의 마진 영역으로 병합되어 `p` 요소간 마진이 50px이 아니라 30px이 된다.



2. 부모 및 맏이/막내 요소

부모 요소와 맏이 요소의 `margin-top`이 겹치거나 부모 요소와 막내 요소의 `margin-bottom`이 겹치는 경우 마진 상쇄가 일어난다. 부모와 자식 사이에 `inline 콘텐츠`가 없거나 부모와 자식 요소를 분리하는 `border`, `padding` 요소가 없는 경우 병합된다.

```html
<div class="parent">
  <div class="first-child"></div>
  <div class="second-child"></div>
  <div class="last-child"></div>
</div>
```

```css
.parent {
  margin: 30px;
}
.first-child {
  margin-top: 20px;
}
.last-child {
  margin-bottom: 40px;
}
```

먼저 parent 클래스를 가진 부모 요소의 전체  30px이고 첫번째 자식 요소인 first-child의 `margin-top` 속성이 20px이므로 `margin-top` 영역의 마진은 자식 요소보다 큰 부모 요소로 병합되어 30px이 된다.

반대로 last-child의 `margin-bottom` 속성은 40px로 부모 요소인 30px보다 크므로 자식 요소의 크기에 병합되어 최종 `margin-bottom`은 40px이다.



3. 빈 블록

`margin-bottom`에서 `border`, `padding`, `inline contents`, `height` 또는 `min-height`가 없는 경우 마진이 상쇄된다.

