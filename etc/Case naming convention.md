# Case naming convention

camelCase: 가장 처음에 시작하는 첫 문자를 제외하고 뒤로 이어지는 단어의 첫 문자를 대문자로 표시하는 방법이다.

> camelCase, headerMenu



PascalCase: 모든 단어의 첫 문자를 대문자로 표시하는 방법이다.

> PascalCase, HeaderMenu



snake_case: 단어 사이를 언더바(_)로 표시하는 방법이다.

> snake_case, header_menu



kebab-case: 단어 사이를 하이픈(-)으로 표시하는 방법이다.

> kebab-case, header-menu



## CSS 방법론: BEM(Block Element Modifier)

* 개발, 디버깅, 유지보수를 위해 가능한 명확하게 작성하는 것을 목표로 한다.
* 소문자, 숫자로만 조합하고 문자 사이는 하이픈(-)으로 표시한다.
* id는 사용할 수 없고 오로지 class만 사용할 수 있다.
* `.header_navigation--secondary`와 같은 방식으로 class명을 작성한다.



### `.header__navigation--secondary`

**header 클래스 안에 있는 navigation 중 두 번째라는 뜻이다**

`.header` 는 block을 뜻한다. 문단에 적용된 element 또는 element를 담고 있는 container를 말한다.

`element`는 block 안에서 특정 기능을 수행하는 컴포넌트이다. block 다음에 언더바 두 개(__)를 사용해 연결한다. 

`modifier`는 block 또는 element의 속성이다. 이 속성은 block 또는 element의 외관이나 상태를 변화시킨다.



**BEM 방법론은 OOP(객체지향프로그래밍)과 유사하다.** 따라서 SASS, SCSS와 같은 전처리장치를 이용할 때 더욱 유용하게 쓰일 수 있다. 또한 유지보수에 적합하게 클래스명을 작성해야 하기 때문에 클래스명이 다소 길더라도 구체적이고 명료하게 작성하는 것이 원칙이다.