/*
25. 최단 거리 1차원 점의 쌍 구하기 (DAUM)
1차원의 점들이 주어졌을 때, 그 중 가장 거리가 짧은 것(들)의 쌍을 배열로 반환하는 함수를 작성하라. (단 점들의 배열은 모두 정렬되어있다고 가정한다.) 예를들어 [1, 3, 4, 8, 13, 17, 20, 23, 24]이 주어졌다면, 결과값은 [[3, 4], [23, 24]]가 될 것이다.
*/

const findMinDistance = array => {
  const comparativeArr = [];
  let comparativeNum = 0;
  for (let i = 0; i < array.length; i++) {
    const comparativeCalc = array[i + 1] - array[i];
    const answerArr = [array[i], array[i + 1]];
    if (comparativeArr.length === 0 || comparativeNum === comparativeCalc) {
      comparativeNum = comparativeCalc;
      comparativeArr.push(answerArr);
    } else if (comparativeNum > comparativeCalc) {
      comparativeNum = comparativeCalc;
      comparativeArr.splice(0, 0).push(answerArr);
    }
  }
  return comparativeArr;
};

// 1차원 점의 배열
const array = [1, 3, 4, 8, 13, 17, 20, 23, 24];
console.log(findMinDistance(array)); // [[3, 4], [23, 24]]
