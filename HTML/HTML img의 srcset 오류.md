# HTML `img`의 `srcset` 오류

반응형 웹을 동작하게 하기 위해 HTML `img`의 `srcset`을 이용할 수 있다.

```html
<img srcset="image_small.png 400w,
             image_medium.png 700w,
             image_large.png 1000w" src="image.png" alt="IMAGE" />
```

`srcset`은 반응형으로 동작할 이미지의 경로와 변경될 기준을 지정한다.

단위는 px이 아닌 w를 사용하는데 400w는 400px을 의미하는 것으로, 기준으로 제시된 픽셀이 조정되는 것에 따라 해당 이미지가 동작하는 방식이다.

그런데 각 브라우저의 환경에 따라 수치가 제대로 동작하지 않는 경우가 있다. 그럴 때는 `picture` 태그를 사용해 똑같은 효과를 낼 수 있다.

```html
<picture>
    <source srcset="image_large.png" media="(min-width: 1000px)" />
    <source srcset="image_medium.png" media="(min-width: 700px)" />
    <source srcset="image_small.png" media="(min-width: 400px)" />
    <img src="image.png">
</picture>
```

`picture` 태그에서 주의할 점은 `img` 태그와 달리 반드시 높은 해상도 기준을 가진 이미지 소스 태그가 상위에 위치해야 한다는 점이다. `picture` 태그를 지원하지 않는 브라우저인 IE의 경우에는 해상도에 관계없이 `img` 태그로 설정된 기본 이미지가 브라우저에 나타나게 된다.

> If no matches are found—or the browser doesn't support the `` element—the URL of the `` element's `src` attribute is selected.



## 관련 아티클

Ultimately, what source the browser chooses to display from a range of `srcset`s is entirely up to the browser, unlike `picture`, where you can set strict conditions. Theoretically, browsers could tomorrow roll out a bandwidth-saving preference which would *always* select the smallest-resolution image in a `srcset`, even if you’re on a retina Thunderbolt display.

------

##### [`picture` 태그](https://developer.mozilla.org/ko/docs/Web/HTML/Element/picture)