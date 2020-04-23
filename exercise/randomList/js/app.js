// array
const shuffleArr = ['빨강', '주황', '노랑', '초록', '파랑', '남색', '보라'];

// variable
const $section = document.querySelector('section');
const $button = document.querySelector('button');

// button click event
$button.addEventListener('click', ({ target }) => {
  // create ul to delete array
  target.textContent = '다시 뽑기';
  const $listContainer = document.createElement('ul');
  const $removeContainer = document.getElementById('container');
  if ($removeContainer !== null) $section.removeChild($removeContainer);

  // shuffle array
  const shuffle = shuffleArr.sort(() => Math.random() - Math.random());

  // insert shuffle array into view
  [...shuffle].map((listText) => {
    $listContainer.setAttribute('id', 'container');
    const $randomList = document.createElement('li');
    $randomList.setAttribute('class', 'swing');
    const $randomText = document.createTextNode(`${listText}`);
    $randomList.appendChild($randomText);
    return $listContainer.appendChild($randomList);
  });
  $section.appendChild($listContainer);
});
