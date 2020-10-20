/*
시저암호(치환암호의 일종, 알파벳별로 일정한 거리만큼 밀어서 다른 알파벳으로 치환) 만들기
문자열과 밀게 될 일정한 거리만큼의 숫자를 입력받아 암호화된 문자열을 리턴한다
대문자는 대문자로만, 소문자는 소문자로만 치환해야 하며 공백은 공백으로 처리한다
*/

const caesarCipher = (s, n) => {
  let answer = '';
  const to65from90 = num => num > 64 && num < 91;
  const to97from122 = num => num > 96 && num < 123;
  const displacement = [...s]
    .map(str => (str !== ' ' ? str.charCodeAt() : 19))
    .map(num =>
      to65from90(num)
        ? to65from90(num + n)
          ? num + n
          : num + n - 26
        : to97from122(num + n)
        ? num + n
        : num !== 19
        ? num + n - 26
        : num,
    )
    .map(num => (num !== 19 ? String.fromCharCode(num) : ' '));
  displacement.forEach(str => {
    answer += str;
  });
  return answer;
};

console.log(caesarCipher('AB', 1)); // BC
console.log(caesarCipher('z', 1)); // a
console.log(caesarCipher('a B z', 4)); // e F d
console.log(caesarCipher('Hello World', 25)); // Gdkkn Vnqkc
