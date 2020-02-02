# hidden 속성

`hidden`은 해당 요소가 관련이 없음을 나타내는 불리언 특성이다. 브라우저는 	`hidden` 속성을 설정한 요소를 렌더링하지 않는다. `hidden`은 시각적으로만 뷰에서 가려지는 것이 아니라 스크린 리더 등 접근할 수 있는 모든 방식에서 숨겨진다.

그러나 hidden 속성을 가진 요소의 css `display` 속성 값을 변경하면 특성으로 인한 동작을 재정의한다. `display: flex`를 지정한 요소는 `hidden` 특성이 존재하더라도 뷰에 보이게 된다.

`hidden` 속성은 `display: none`과 비슷한 특성을 가진다. `display: none` 역시 브라우저에서 렌더링 되지 않고 접근할 수 있는 모든 방식에서 숨겨진다.

그러나 `hidden` 속성과 `display: none`은 `aria-describedby` 특성을 사용할 수 있는지에 따라 달라진다. `hidden` 속성은 숨겨진 설명문을 참조하기 위해 `aria-describedby`를 사용해 숨겨진 설명문 자체로는 쓸모가 없지만 특정 문맥에서 참조하는 방식으로 사용할 수 있지만 `display: none`은 `aria-describedby`로도 접근할 수 없다.