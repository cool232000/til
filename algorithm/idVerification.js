const solution = newId => {
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

console.log(solution('...!@BaT#*..y.abcdefghijklm'));
console.log(solution('z-+.^.'));
console.log(solution('=.='));
console.log(solution('123_.def'));
console.log(solution('abcdefghijklmn.p'));
