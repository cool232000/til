# `justify-content`와 `align-items`

`flex`가 가지고 있는 속성인 `justify-content`와 `align-items`는 어떤 축을 중심으로 정렬하는지에 대한 속성이다. 흔히 `justify-content`는 가로, `align-items`는 세로로 정렬한다고 생각하지만 그보다는 `flex`가 메인축을 중심으로 정렬되었냐 아니면 교차축을 중심으로 정렬되었냐를 보고 정렬 옵션을 선택하는 방식이다. 따라서 `flex-direction`이 `row` 형식이나 `column` 형식이냐에 따라 무엇을 선택해 정렬할지를 판단할 수 있따.



## `justify-content`: 메인축

`justify-content`는 `flex-direction: row`일 때 정렬하는 방식이다. 일반적으로 `display:flex`를 적용하면 `flex-direction`는 `row` 값이 기본으로 적용된다. 일반적인 선형화 구조일 때 사용하는 속성이다.



## `align-items`: 교차축

`align-items`는 `flex-direction: column`일 때 정렬하는 방식이다. `flex`는 적용하는 순간 박스 사이즈를 생각하지 않고 모두 `row`로 정렬하기 때문에 선형화된 구조를 짰을 때 세로축이 모두 틀어지게 되므로 선형화된 구조로 웹을 만들기 위해서는 `flex-direction: column`으로 설정한 후 `align-items` 속성을 `center`로 주면 센터 정렬이 완료된다.