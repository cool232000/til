const $id = document.querySelector('.id');
const $pw = document.querySelector('.pw');
const $pwCheck = document.querySelector('.pw-check');
const $button = document.querySelector('button');

const regExpPW = value => {
  const regExp = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{8,20}$/;
  return regExp.test(value) ? 1 : 0;
};

const inputId = ({ target }) => {};

const inputPw = ({ target }) => {
  if (!regExpPW(target.value)) {
    $pwCheck.textContent = '비밀번호는 영어, 숫자 포함 8자에서 20자입니다';
  } else {
    if (target.value !== '') {
      $pwCheck.textContent = '';
      $button.disabled = false;
    }
  }
};

const submit = () => {
  alert(`${$id.value}님 어서오세요`);
};

$id.addEventListener('keypress', inputId);
$pw.addEventListener('keypress', inputPw);
$button.addEventListener('click', submit);
