# counters

CSS counters는 웹페이지의 제목에 자동으로 번호를 매길 수 있는 기능이다. 숫자는 반드시 1번부터 시작하는 것은 아니고 시작번호를 지정할 수 있다. 때문에 counters는 본질적으로 변수이다. 개발자가 지정하는 조건에 따라 규칙적으로 증가하게 된다.

`counter-reset` 속성은 기본값이 0으로, counter를 사용할 때는 해당 속성을 사용해 초기화를 한다. 만약 counter를 사용한 적이 없고, 초기화 값을 0으로 정하려고 한다면 `counter-reset`을 사용하지 않아도 된다.

`counter-increment` 속성은 counter의 값을 증감시키는 속성이다. `counter-increment`의 값으로는 사용자가 지정한 이름을 사용한다. 이 이름으로 'none', 'inherit', 'initial' 등은 사용할 수 없다.



## counter()

```html
<h3>Introduction</h3>
<h3>Body</h3>
<h3>Conclusion</h3>
```

```css
/* 가상선택자에 한 번에 선언하는 방법 */
h3::before {
  counter-increment: section;
  content: counter(section);
}

/* 기본 태그에 선언하고 가상선택자에 표시하는 방법 */
h3 {
  counter-increment: section; 
}
h3::before {
  content: counter(section);
}
```

```markdown
두 가지 모두 같은 값을 표시한다
1Introduction
2Body
3Conclusion
```

서열을 갖는 list 태그의 경우

```html
<ul>
  <li>안녕</li>
  <li>안녕</li>
  <li>안녕</li>
</ul>
```

```css
li {
  list-style: none;
  counter-increment: number;
}
li::before {
  content: counter(number);
}
```

```markdown
결과값
1안녕
2안녕
3안녕
```

```css
li {
  list-style: none;
}
li::before {
  counter-increment: number;
  content: counter(number);
}
```

```markdown
결과값
1안녕
1안녕
1안녕
```

서열을 갖는 list 태그는 `counter-increment`를 어디에서 선언하느냐에 따라 표시되는 카운트 콘텐츠가 달라진다.



## counters()

중첩 카운터를 만들 때 counters()를 사용할 수 있다. counters() 함수를 사용해 카운터 사이를 분리하는 글자를 지정할 수 있다.

```html
<ol>
  <li>item</li>
  <li>item
    <ol>
      <li>item</li>
      <li>item</li>
      <li>item
        <ol>
          <li>item</li>
          <li>item</li>
        </ol>
        <ol>
          <li>item</li>
          <li>item</li>
          <li>item</li>
        </ol>
      </li>
      <li>item</li>
    </ol>
  </li>
  <li>item</li>
  <li>item</li>
</ol>
<ol>
  <li>item</li>
  <li>item</li>
</ol>
```

```css
ol {
/*  ol 요소마다 이름이 section인 counter 생성  */
  counter-reset: section;
  list-style-type: none;
}

li::before {
/*  해당 인스턴스 안에서 section 카운터 값 증가  */
  counter-increment: section;
/*  section 카운터 값을 마침표(.)로 구분  */
/*  section 카운터 . section 카운터  */
  content: counters(section, ".") " ";
}
```

```markdown
결과값
1 item
2 item
	2.1 item
	2.2 item
	2.3	item
		2.3.1 item
		2.3.2 item
		2.3.1 item
		2.3.2 item
		2.3.3 item
	2.4 item
3 item
4 item

1 item
2 item
```

