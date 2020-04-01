// array
const shuffleArr = ['빨강', '주황', '노랑', '초록', '파랑', '남색', '보라'];

// variable
const $button = document.querySelector('button');
const $shuffleText = document.querySelector('.shuffle');

// button click event
$button.addEventListener('click', () => {
  // create div to delete array
  const $container = document.createElement('div');
  const removeContainer = document.getElementById('container');
  if (removeContainer !== null) $shuffleText.removeChild(removeContainer);

  // shuffle array
  const shuffle = shuffleArr.sort(() => Math.random() - Math.random());

  // insert shuffle array into view
  [...shuffle].map((listText) => {
    $container.setAttribute('id', 'container');
    const $randomList = document.createElement('li');
    const $randomText = document.createTextNode(`${listText}`);
    $container.appendChild($randomList);
    return $randomList.appendChild($randomText);
  });
  $shuffleText.appendChild($container);
});
