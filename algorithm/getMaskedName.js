// 개인정보 보호를 위해 앞의 두 글자를 제외한 나머지 이름 * 처리 하기
// 만약 이름이 두 글자라면 두번째 글자 * 처리 하기

const getMaskedName = name => {
  const maskedName = [...name]
    .map((n, idx) => (name.length > 2 ? (idx >= 2 ? '*' : n) : idx !== 0 ? '*' : n))
    .join('');
  return maskedName;
};

console.log(getMaskedName('이진')); // 이*
console.log(getMaskedName('YiJaeE')); // Yi****
console.log(getMaskedName('제갈공명')); // 제갈**
console.log(getMaskedName('김수한무거북이와두루미삼천갑자동방삭')); // 김수****************
