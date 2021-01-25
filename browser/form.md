# form

HTML의 `form` 태그는 정보를 제출하기 위한 대화형 컨트롤을 포함하고 있다.

`form` 태그의 구조는 크게 `form` 태그 안에 `label` 태그와 `input` 태그, `form` 태그 내부를 그룹핑할 때 사용하는 `fieldset` 태그를 사용할 수 있다.

## form 태그의 속성

**`action`**: 양식 데이터를 처리할 프로그램의 URI. `button`, `<input type="submit">`, `<input type="image">` 태그의 특성으로 재정의할 수 있다.

**`method`**: 양식을 제출할 때 사용하는 HTTP 메소드. `post`와 `get`으로 구성되어 있다. `get` 메소드는 `action` URL과 `?` 구분자 뒤에 이어 붙여서 전송한다.

**`target`**: 양식 제출의 결과를 표시할 위치를 나타내는 표준 키워드 혹은 사용자 지정 이름. `_self`, `_blank`, `_parent`, `_top`이라는 값을 줘서 연결된 페이지를 어떻게 표시할 건지 선택할 수 있다.

## input 태그

웹 기반 양식에서 사용자의 데이터를 받을 수 있는 대화형 컨트롤을 생성한다. 브라우저에 따라서 다양한 종류의 입력 데이터 유형과 컨트롤 위젯이 존재한다.

`input` 태그는 `type` 특성에 따라 유형이 달라진다. 기본값은 `text`이고 다양한 유형이 있지만 `form` 요소가 서버에 양식을 제출하는 역할을 한다는 것을 생각할 때 `submit` 속성을 가진 `input` 태그의 쓰임이 크다고 할 수 있다.

## label 태그

`label` 태그는 사용자 인터페이스 항목의 설명을 나타낸다. 주요 속성은 `for`이며 `input`의 `id` 값과 같으면 연결된다. `label`을 클릭하면 연결된 양식에 입력값을 입력할 수 있도록 하거나 체크하거나 체크를 해제하는 역할을 한다.

```html
<div class="preference">
  <label for="cheese">Do you like cheese?</label>
  <input type="checkbox" name="cheese" id="cheese" />
</div>
```

## fieldset

`fieldset` 태그는 웹 양식의 여러 컨트롤과 레이블(`label`)을 묶을 때 사용한다. `fieldset` 태그는 양식 안에서 그룹을 만드는 역할을 하며 `legend` 태그가 `fieldset`의 설명을 제공한다.

```html
<form>
  <fieldset>
    <legend>Choose your favorite monster</legend>

    <input type="radio" id="kraken" name="monster" />
    <label for="kraken">Kraken</label><br />

    <input type="radio" id="sasquatch" name="monster" />
    <label for="sasquatch">Sasquatch</label><br />

    <input type="radio" id="mothman" name="monster" />
    <label for="mothman">Mothman</label>
  </fieldset>
</form>
```

`fieldsest`은 `display` 속성이 `block`이며 새로운 블록 서식 맥락을 형성한다. 인라인형 display 값을 지정하면 `inline-block`, 그렇지 않으면 `block`처럼 행동한다. 또한 `fieldsest`은 기본 스타일로 콘텐츠를 감싸는 2px 너비의 `groove` 테두리, 작은 양의 내부 여백, 그리고 `min-inline-size: min-content`를 갖는다.

`legend` 요소는 `fieldset`의 블록 시작 방향 테두리 위를 가로지르는 위치에 놓인다. `legend` 또한 자신의 블록 서식 맥락을 만들며 너비는 자신의 콘텐츠에 맞춰져 늘어나거나 줄어든다. 이때 `display`는 항상 블록형이 되어 `display: inline`도 `block`처럼 동작한다.

`fieldset`이 가진 속성 중 `form` 속성에 `fieldset`과 연결하고자 하는 `form`의 `id`를 입력하면 `fieldset`의 위치가 `form` 태그의 내부가 아니라고 하더라도 해당 `form` 태그와 연결된다. `fieldset`의 위치가 `form` 태그 내부라면 `id`를 명시적으로 연결해주지 않아도 괜찮다.

#### 크롬에서의 fieldset flex 이슈

`fieldset` 태그에 `display: flex`를 적용하면 다른 브라우저는 잘 동작하는데 크롬의 경우 제대로 동작하지 않는다. 이는 크롬이 가지고 있는 버그이다.
