# aria로 tab 메뉴 구성하기

탭 메뉴를 구성하는 방법 중에 시멘틱한 마크업을 사용하지 않고 `div`를 사용하고 aria를 이용하는 방법이 있다. aria에는 tab 메뉴를 지원하는 요소들이 있다.



## tab list 영역 구성하기

tab을 클릭하는 영역으로 구성할 부분은 aria-role이 가진 속성 중 tablist를 추가해준다. role="tablist"는 해당되는 영역이 tab 메뉴라는 것을 알려주는 역할을 한다.

이렇게 선언된 tablist 영역 밑으로 실제 클릭하게 되는 tab 메뉴가 위치한다. tab 메뉴는 무엇을 선택하느냐에 따라 활성화 클래스가 다르게 들어가야 하기 때문에 aria-selected 속성을 활용해 불리언 값을 줘야 한다.

또 aria-controls 속성을 이용해 해당 메뉴가 클릭됐을 때 보여줄 영역과 연결시켜준다.

```html
<div class="tab-board">
  <ul class="tab-list" role="tablist">
        <li role="tab" id="tab1" aria-controls="tabpanel1" aria-selected="true" tabindex="0">탭 메뉴 1</li>
        <li role="tab" id="tab2" aria-controls="tabpanel2" aria-selected="false" tabindex="0">탭 메뉴 2</li>
      </ul>
```



## tab panel 영역 구성하기

tab panel은 클릭된 영역에 따라 보여지는 콘텐츠 영역을 의미한다. 선택된 메뉴에 따라 보여질 영역이 달라져야 하므로 tab list에 추가했던 속성인 aria-controls와 연결할 aria-role을 동일한 이름으로 작성한다. 또한 화면에 표시되는 영역을 aria-labelledby 속성을 이용해 tab list에 작성한 id와 연결한다.

```html
  <div role="tabpanel" id="tabpanel1" class="section-act" aria-labelledby="tab1">
    활성화 되었을 때 보여질 영역
  </div>
  <div role="tabpanel" id="tabpanel2" aria-labelledby="tab2">
    활성화 되었을 때 보여질 영역
  </div>
</div>
```



즉, tab panel과 tab list를 연결하는 요소는 두 가지인다. 1) tab list의 aria-controls 속성과 tab panel의 aria-role 속성을 연결하고 2) tab list의 id 속성과 tab panel의 aria-labelledby 속성을 연결한다.