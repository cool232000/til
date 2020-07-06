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
