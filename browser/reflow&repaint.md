# Reflow & Repaint

브라우저가 화면에 픽셀을 렌더링하는 순서는 다음과 같다. (chrome 기준)

* DOM 및 CSSOM 트리는 결합되어 렌더링 트리를 형성한다.

* 렌더링 트리에는 페이지를 렌더링하는 데 필요한 노드만 포함된다.

* 레이아웃은 각 객체의 정확한 위치 및 크기를 계산한다.

* 최종 렌더링 트리에서는 페인트가 수행되며 픽셀을 화면에 렌더링한다.

  

![렌더링 트리](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/images/render-tree-construction.png?hl=ko "Chrome 브라우저 렌더링 과정")

<center><font size="2pt" color="#666666">chrome 브라우저 렌더링 과정</center>

HTML 요소를 파싱해서 만들어진 DOM 트리와 CSS 요소를 파싱해서 만들어진 CSSOM 트리가 결합되어 렌더링 트리가 생성된 후, 브라우저는 **레이아웃** 단계로 넘어가게 된다.



## 레이아웃(reflow)

레이아웃 단계에서는 트리를 생성하면서 계산된 노드와 스타일을 기기의 뷰포트에서 어떤 위치에서 어떻게 보이도록 하는지 결정하는 단계이다. 이것을 레이아웃 단계라고 부르고 'reflow'라고도 한다.

레이아웃 프로세스는 뷰포트 내에서 각 요소의 정확한 위치와 크기를 캡쳐하는 '상자 모델'이 출력되며 상대적인 측정값도 모두 절대적인 픽셀로 변환된다. 레이아웃 과정 즉, 리플로우는 최초 한 번만 실행되는 것이 아니라 `width`, `height`, `left`, `top`, `offsetHeight`, `offsetWidth`, `scrollTop` 등 수치를 계산해 새로운 위치에 나타나게 하는 동작이 일어날 때마다 반복해서 실행된다.



## paint(repaint)

레이아웃 계산이 완료되어 뷰포트에 픽셀을 그리는 작업을 `페인팅` 또는 `래스터화` 라고 부른다. 레이아웃 단계를 통해 파악한 렌더링 트리의 각 노드를 화면에 실제 픽셀로 변환해 화면에 그리는 단계이다. `border-radius`, `shadow-box` 등과 같은 속성이 변경되었을 때 실행되며, 레이아웃 단계가 발생할 경우 화면을 다시 그려야 하기 때문에 반드시 실행된다.



## reflow와 repaint

