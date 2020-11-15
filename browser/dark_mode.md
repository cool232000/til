# 다크모드 구현하기

다크모드란 일반적으로 더 어두운 색상 팔레트를 사용하는 UI를 말한다. 쉽게 말하면 어두운 배경에 밝은 색상의 요소를 사용하는 것이다.

그러나 어떤 배경(라이트/다크)을 가지고 있더라도 [웹 콘텐츠 접근성 지침(WCAG: Web Content Accessibility Guidelines)](https://www.w3.org/WAI/standards-guidelines/wcag/)에 따라 적절한 대비 색상을 요소로 배치하여 접근성을 해치는 일이 없도록 해야 한다. 쉽게 말해 라이트 모드에서 너무 밝은 요소를 사용하거나 다크 모드에서 너무 어두운 요소를 사용해 사용자의 웹 경험을 해치지 말아야 한다. WCAG 2.0 기준을 충족하는지는 [CONTRAST CHECKER](https://contrastchecker.com/)에서 확인할 수 있다.

## prefers-color-scheme

다크모드를 구현하는 방법은 여러가지가 있는데 가장 쉬운 방법은 [prefers-color-scheme](https://developer.mozilla.org/ko/docs/Web/CSS/@media/prefers-color-scheme)라는 CSS 미디어 특성을 이용해 사용자의 OS가 사용하는 테마를 감지하는 것이다.

`prefers-color-scheme`은 미디어 쿼리를 통해 감지한다. `prefers-color-scheme: light`는 라이트 모드인지 확인하고, `prefers-color-scheme: dark`는 다크 모드인지 확인한다. `prefers-color-scheme: no-preference`는 사용자가 선호하는 테마를 알리지 않았음을 의미하며 불리언 값으로 `false`를 반환하게 된다.

CSS를 통해 다크모드를 적용하는 방법은 아래와 같다.

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

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="yijaee" data-slug-hash="wvWNbwr" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="wvWNbwr">
  <span>See the Pen <a href="https://codepen.io/yijaee/pen/wvWNbwr">
  wvWNbwr</a> by yijaee (<a href="https://codepen.io/yijaee">@yijaee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## Atrribute 활용

그러나 `prefers-color-scheme`를 사용하는 방법은 사용자가 선택한 테마를 반영할 뿐, 사용자가 직접 해당 웹에서 사용하고 싶은 모드를 결정하게 해주는 것은 아니다. 예를 들어 사용자가 OS는 다크 모드로 사용하고 싶지만 특정 웹은 라이트 모드로 사용하고 싶은 경우, `prefers-color-scheme`를 사용해 모드 감지를 하게 되면 사용자가 웹의 모드를 컨트롤할 수 없게 된다.

그래서 많은 경우 사용자가 직접 웹 환경에 대한 모드를 설정할 수 있도록 한다. 이는 자바스크립트로 구현할 수 있다.

사용자가 선택한 모드를 지원하는 웹 환경을 구성할 때, 웹은 사용자의 접근이 있는 경우 다음과 같이 모드를 감지할 수 있다.

1. 사용자가 해당 웹에서 선택한 모드가 있는지 감지하고 사용자가 선택한 모드가 있는 경우 해당 모드로 렌더링
2. 사용자가 선택한 모드가 없는 경우 OS의 모드를 감지해 OS 모드로 렌더링
3. 사용자가 모드를 변경할 때마다 변경된 모드를 반영하고 렌더링

이와 같이 사용자 선택 권한을 주기 위해서는 토글할 수 있는 요소를 제공해야 한다. `input`의 `checkbox`를 이용하도록 한다.

```html
<input class="check" type="checkbox" />
<div class="themed">Theme</div>
```

더 많은 UI적 처리를 할 수도 있겠지만 단순하게 `checkbox`가 체크되면 다크 모드, 체크되지 않으면 라이트 모드를 적용한다고 가정한다. 따라서 `checkbox`가 체크되면 `html` 혹은 `body`의 `attribute`로 `color-theme="dark"`가 삽입되도록 하고 체크가 되지 않았거나 체크를 취소했을 때는 `color-theme="light"`가 삽입될 수 있도록 코드를 작성한다.

```javascript
const $checkbox = document.querySelector('.check');

$checkbox.addEventListener('click', e => {
  if (e.target.checked) {
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    document.documentElement.setAttribute('color-theme', 'light');
  }
});
```

위 코드가 실행되면 `<html color-theme="dark">...</html>` 혹은 `<html color-theme="light">...</html>`로 `attribute`가 삽입된다.

이렇게 작성한 코드가 제대로 동작할 수 있도록 CSS에서 `:root`로 루트 요소를 선택해 모드에 따라 실질적으로 색상 변경이 일어나도록 한다. 이때 CSS에 변수를 적용해 모드에 코드를 두 번 작성하지 않도록 한다.

```css
:root[color-theme='light'] {
  --background: #fff;
  --boxColor: #000;
}

:root[color-theme='dark'] {
  --background: #000;
  --boxColor: #fff;
}

html {
  background: var(--background);
}

.themed {
  display: block;
  width: 10em;
  height: 10em;
  background: var(--boxColor);
  color: var(--background);
}
```

여기까지 코드를 작성하고 나면 `checkbox`의 상태에 따라 렌더링이 달라지는 것을 확인할 수 있다.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="yijaee" data-slug-hash="vYKbwmx" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="attribute 적용">
  <span>See the Pen <a href="https://codepen.io/yijaee/pen/vYKbwmx">
  attribute 적용</a> by yijaee (<a href="https://codepen.io/yijaee">@yijaee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## LocalStorage 활용

지금까지 작성한 대로 한다면 사용자가 선택하는 모드를 감지할 수는 있지만 브라우저를 껐다 켜거나 사용자가 웹에 재접근하는 경우 기존의 모드를 알 수 없다는 단점이 있다. 그리고 앞서 작성한 코드는 `html` 코드에 사용자가 `checkbox`를 클릭하기 전까지는 `color-theme`라는 `attribute`가 없기 떄문에 어떤 모드로 렌더링해야 할지 알 수 없는 문제가 발생한다.

이 문제는 `LocalStorage`를 통해 해결할 수 있다.

먼저 `LocalStorage`에 `html`의 `attribute`를 삽입했던 것과 마찬가지로 `color-theme`라는 키를 삽입하고 그 값이 `dark` 혹은 `light`로 저장될 수 있게 하는 코드는 다음과 같다.

```javascript
localStorage.setItem('color-theme', 'dark);
localStorage.setItem('color-theme', 'light);
```

위 코드가 동작하는 경우는 두 가지다. 첫번째는 사용자가 웹에 처음 접근해 `LocalStorage`에 아무런 정보가 없고 OS 모드를 그대로 렌더링하는 경우이고, 두번째는 사용자가 직접 모드를 변경하는 경우이다.

어떤 경우에도 기존에 `LocalStorage`에 저장된 정보를 확인해야 하고, 저장된 정보가 없는 경우를 대비해 OS 모드를 확인해야 한다. 때문에 두 가지 변수가 필요하다.

```javascript
const isUserColorTheme = localStorage.getItem('color-theme');
const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
```

`isOsColorTheme` 변수는 `(prefers-color-scheme: dark)`를 확인하면 `dark`일 경우 `true`, `light`일 경우 `false`가 반환된다. 불리언 값을 받아서 동작을 처리할 수도 있겠지만 나는 불리언 값에 따라 해당되는 상태 값을 직접 변수에 할당하는 게 낫겠다고 판단해 위와 같이 코드를 작성했다. 이렇게 코드를 작성하면 `isUserColorTheme`에 할당된 값과 동일한 값을 받게 되고, 로직을 좀 더 단순화할 수 있다.

기존에 발생했던 문제점을 고려해 러프하게 짠 코드는 다음과 같다.

`getUserTheme` 함수는 `LocalStorage`의 정보가 있으면 해당 정보를, 없으면 OS 정보를 제공하는 함수이다. 이 정보는 `dark` 혹은 `light`라는 값으로 반환되기 때문에 웹이 시작할 경우 해당 정보를 확인해 바로 `LocalStorage`에 키와 값을 저장한다.

이때 고려해야 할 것은 모드별로 다른데,
`dark` 모드일 경우 렌더링 시점에 `checkbox`의 체크 상태까지 렌더링해줘야 한다.

```javascript
const $checkbox = document.querySelector('.check');

const isUserColorTheme = localStorage.getItem('color-theme');
const isOsColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const getUserTheme = () => (isUserColorTheme ? isUserColorTheme : isOsColorTheme);

window.onload = function () {
  if (getUserTheme === 'dark') {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
    $checkbox.setAttribute('checked', true);
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
  }
};

$checkbox.addEventListener('click', e => {
  if (e.target.checked) {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
  }
});
```

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="js,result" data-user="yijaee" data-slug-hash="oNLmrve" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="로컬스토리지 활용">
  <span>See the Pen <a href="https://codepen.io/yijaee/pen/oNLmrve">
  로컬스토리지 활용</a> by yijaee (<a href="https://codepen.io/yijaee">@yijaee</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

## 마무리

많은 서비스가 다크모드를 지원하고 있고 실제로 사용자의 선호도 꽤 높다. 하지만 사용자 경험에서 중요한 것은 단순히 예쁜 디자인으로 꾸미는 것이 아니라 어떤 디자인이든 사용자 경험을 해치지 않고, 나아가 더 나은 사용자 경험을 제공해야 한다는 점이다.

사용자가 직접 선택한 모드를 저장해뒀다가 렌더링하거나 사용자의 OS 모드를 감지해 같은 모드로 렌더링하는 것은 모두 일관된 사용자 경험을 제공하기 위한 방법이다. 이번에 다크모드를 구현해보면서 단순히 기술적인 문제에 그치지 않고 실제로 서비스를 제공했을 때 발생할 수 있는 문제점에 대해 고려해볼 수 있었다.
