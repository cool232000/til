# dl

`<dl>`요소는 description list를 나타낸다. `dl` 요소는 `dt` 요소와 `dd` 요소를 자식으로 갖는데, `dl` 요소는 묶여있는 description의 테마를, `dd` 요소는 테마에 알맞은 설명을 작성한다.



```html
<p>Cryptids of Cornwall:</p>

<dl>
    <dt>Beast of Bodmin</dt>
    <dd>A large feline inhabiting Bodmin Moor.</dd>

    <dt>Morgawr</dt>
    <dd>A sea serpent.</dd>

    <dt>Owlman</dt>
    <dd>A giant owl-like creature.</dd>
</dl>
```



`dl` 요소 내부에서 `dt`와 `dd`는 하나일 수도 있고 여러 개일 수도 있다. 하나의 타이틀에 여러 개의 설명이 작성되어야 하는 경우 하나의 `dt` 요소에 여러 개의 `dd` 요소가 들어가게 되고, 하나의 설명에 여러 개의 타이틀이 붙는 경우 하나의 `dd` 요소에 여러 개의 `dt` 요소가 들어가게 된다.

`dl` 요소 내부에서 `dt`와 `dd`는 일대일, 일대다의 관계를 맺는다.



**Multiple terms, single description**

```html
<dl>
  <dt>Firefox</dt>
  <dt>Mozilla Firefox</dt>
  <dt>Fx</dt>
  <dd>
    A free, open source, cross-platform,
    graphical web browser developed by the
    Mozilla Corporation and hundreds of
    volunteers.
  </dd>

  <!-- Other terms and descriptions -->
</dl>
```



**Single term, multiple descriptions**

```html
<dl>
  <dt>Firefox</dt>
  <dd>
    A free, open source, cross-platform,
    graphical web browser developed by the
    Mozilla Corporation and hundreds of
    volunteers.
  </dd>
  <dd>
    The Red Panda also known as the Lesser
    Panda, Wah, Bear Cat or Firefox, is a
    mostly herbivorous mammal, slightly larger
    than a domestic cat (60 cm long).
  </dd>

  <!-- Other terms and descriptions -->
</dl>
```



## dl 요소 내부를 div로 감싸기

HTML5에서는 `dl` 요소 내부를 `div`로 감싸는 것이 가능하다. 그러나 `div` 요소와 `dt`, `dd` 요소가 형제 레벨로 존재할 수는 없다.

```html
<dl>
  <div>
    <dt>Name</dt>
    <dd>Godzilla</dd>
  </div>
  <div>
    <dt>Born</dt>
    <dd>1952</dd>
  </div>
  <div>
    <dt>Birthplace</dt>
    <dd>Japan</dd>
  </div>
  <div>
    <dt>Color</dt>
    <dd>Green</dd>
  </div>
</dl>
```

