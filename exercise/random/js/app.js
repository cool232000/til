const $button = document.querySelector('button');
const $shuffleText = document.querySelector('.shuffle');

const FDS15 = [ 'FastJ', '시멘틱을 Flex 해버렸지 뭐야', '디버깅', '미소', 'CloneAble', 'V' ];

$button.addEventListener('click', () => {
  let shuffle = FDS15.sort(() => Math.random() - Math.random());
 
  [...shuffle].map((listText) => {
    const $randomList = document.createElement('li');
    $randomList.setAttribute('id', 'randomList');
    const $randomText = document.createTextNode(`${listText}`)
    $shuffleText.appendChild($randomList);
    $randomList.appendChild($randomText);
  });
});

$button.addEventListener('click', (e) => {
  if (!!document.getElementsByTagName('li')) {
    console.log(e.target.nextElementSibling);
    const hi = document.getElementById('randomList');
    console.log(hi);
  }
});
