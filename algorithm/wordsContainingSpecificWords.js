// 특정 단어가 포함된 단어 찾기

const includesWord = array => {
  let answer = true;
  let comparison = [];
  let result = [];
  for (let i = 0; i < array.length; i++) {
    comparison = array.filter(word => word !== array[i]);
    for (let j = 0; j < comparison.length; j++) {
      result.push(array[i].includes(comparison[j]));
    }
  }
  answer = result.includes(true) ? true : false;
  return answer;
};

console.log(includesWord(['호랑이', '사자', '쥐', '닭', '주머니쥐'])); // true
console.log(includesWord(['딸기', '사과', '복숭아', '수박'])); // false
console.log(includesWord(['엄마', '아빠', '딸', '아들'])); // false
