/*
입력되는 아이디 검증
1. 아이디는 3자 ~ 15자 내외여야 한다.
2. 아이디는 소문자여야 한다
3. 특수문자는 -_.만 입력 가능하다
4. 마침표는 맨 앞과 맨 뒤에 있으면 안 되고 연달아 있어도 안 된다
5. 모든 검사를 마친 아이디가 3자 이하라면 마지막 문자와 같은 문자를 3자가 될 때까지 붙인다
*/

const idVerification = newId => {
  let answer = newId;
  answer = newId.toLowerCase();
  const regexr = /[\{\}\[\]\/?,;:|\)*~`!^\+<>@\#$%&\\\=\(\'\"]/gi;
  answer = answer.split(regexr).join('');
  answer = answer.split('').filter((str, idx) => !(str === '.' && answer[idx + 1] === '.'));

  answer[0] === '.' && answer.shift();
  answer[answer.length - 1] === '.' && answer.pop();
  if (answer.length === 0) {
    answer.push('a');
  }

  answer = answer.join('').substr(0, 15);

  answer = answer.split('');
  answer[answer.length - 1] === '.' && answer.pop();

  while (answer.length < 3) {
    answer.push(answer[answer.length - 1]);
  }

  answer = answer.join('');
  return answer;
};

console.log(idVerification('...!@BaT#*..y.abcdefghijklm')); // bat.y.abcdefghi
console.log(idVerification('z-+.^.')); // z--
console.log(idVerification('=.=')); // aaa
console.log(idVerification('123_.def')); // 123_.def
console.log(idVerification('abcdefghijklmn.p')); // abcdefghijklmn
