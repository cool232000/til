const $button = document.querySelector('button');
const $shuffleText = document.querySelector('.shuffle');

const shuffleArr = ['빨강', '주황', '노랑', '초록', '파랑', '남색', '보라'];

$button.addEventListener('click', () => {
  const $container = document.createElement('div');
  const removeContainer = document.getElementById('container');
  if (removeContainer !== null) $shuffleText.removeChild(removeContainer);

  const shuffle = shuffleArr.sort(() => Math.random() - Math.random());

  [...shuffle].map((listText) => {
    $container.setAttribute('id', 'container');
    const $randomList = document.createElement('li');
    const $randomText = document.createTextNode(`${listText}`);
    $container.appendChild($randomList);
    return $randomList.appendChild($randomText);
  });
  $shuffleText.appendChild($container);
});
