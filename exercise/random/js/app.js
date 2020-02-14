const button = document.querySelector('button');
const shuffleText = document.querySelector('.shuffle');

const FDS15 = [ 'FastJ', '시멘틱을 Flex 해버렸지 뭐야', '디버깅', '미소', 'CloneAble', 'V' ];

button.addEventListener('click', function() {
  let shuffle = FDS15.sort(function() {
    return Math.random() - Math.random();
  });
  [...shuffle].map((text) => {
    shuffleText.innerHTML += `<li>${text}</li>`;
  });
});