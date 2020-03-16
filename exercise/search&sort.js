// Linear search
// 선형 검색은 배열의 각 요소를 한 인덱스씩 순차적으로 접근하면서 동작한다.
// 선형 검색은 배열의 정렬 여부와 상관없이 동작하는 장점이 있지만, 배열의 모든 요소를 확인해야 하는 단점이 있다.
// 시간 복잡도: O(n)

function linearSearch(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (target === array[i]) return i;
  } return -1;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(linearSearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(linearSearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 7)); // 2


// Binary search
// 이진 검색은 선형 검색과는 달리 정렬된 배열에서만 동작한다.
// 선형 검색은 배열의 모든 요소를 확인해야 하지만 이진 검색은 중간값과 검색 대상 값을 비교하여 검색 범위를 매번 반으로 줄여 나간다.
//  1. 검색 대상 값이 중간값보다 작은 경우 중간값보다 작은 쪽(왼쪽)을 검색 범위로 한정한다.
//  2. 검색 대상 값이 중간값보다 큰 경우 중간값보다 큰 쪽(오른쪽)을 검색 범위로 한정한다.
//  3. 검색 대상 값을 검색할 때까지 이와 같은 처리를 반복한다.
// 시간 복잡도: O(log n)

// while문
function binarySearch(array, target) {
  let start = 0;
  let end = array.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    if (target > array[mid]) {
      start = mid + 1;
    } else if (target < array[mid]) {
      end = mid - 1;
    } else return mid;
  } return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7)); // -1

// for문
function binarySearch2(array, target) {
  let start = 0;
  let end = array.length - 1;
  for (let i = start; i <= end; i++) {
    const mid = Math.floor((start + end) / 2);
    if (target > array[mid]) {
      start = mid + 1;
    } else if (target < array[mid]) {
      end = mid - 1;
    } else return mid;
  } return -1;
}

console.log(binarySearch2([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(binarySearch2([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(binarySearch2([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(binarySearch2([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch2([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch2([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch2([1, 2, 3, 4, 5, 6], 7)); // -1


// Bubble sort
// 거품 정렬은 순차적으로 배열을 순회하면서 인접한 두 요소를 비교하여 작은 요소를 왼쪽으로, 큰 요소를 오른쪽으로 교환한다.
// 거품 정렬은 가장 간단하지만 가장 느린 정렬 알고리즘이다.
// 시간 복잡도: O(n2)

function bubbleSort(array) {
  const arrLength = array.length - 1;
  for (let i = 0; i < arrLength; i++) {
    for (let j = 0; j < arrLength - i; j++) {
      if (array[j] > array[j + 1]) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  } return array;
}

console.log(bubbleSort([2, 4, 5, 1, 3])); // [1, 2, 3, 4, 5]
console.log(bubbleSort([5, 2, 1, 3, 4, 6])); // [1, 2, 3, 4, 5, 6]
console.log(bubbleSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(bubbleSort([1, 3, 0, -1, 4, 2, -2])); // [-2, -1, 0, 1, 2, 3, 4]
console.log(bubbleSort([4, 1, 100, 3, -1, -100, -2, 0])); // [-100, -2, -1, 0, 1, 3, 4, 100]


// Selection Sort
// 선택 정렬은 배열의 최소값을 검색하여 배열의 왼쪽부터 순차적으로 정렬을 반복하는 정렬 알고리즘이다.
// 배열이 미정렬 상태이므로 최소값 검색에는 이진 검색이 아닌 선형 검색 알고리즘을 사용한다.
// 선택 정렬은 버블 정렬보다 빠르다.
// 시간 복잡도: O(n2)

function selectionSort(array) {
  const arrLength = array.length;
  for (let i = 0; i < arrLength - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arrLength; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    const temp = array[minIdx];
    array[minIdx] = array[i];
    array[i] = temp;
  } return array;
}

console.log(selectionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(selectionSort([2, 4, 5, 1, 3])); // [1, 2, 3, 4, 5]
console.log(selectionSort([5, 2, 1, 3, 4, 6])); // [1, 2, 3, 4, 5, 6]


// Insertion Sort
// 삽입 정렬(insertion sort)은 인덱스 1부터 왼쪽과 비교하면서 순차적으로 정렬을 반복하는 정렬 알고리즘이다.
// 정렬이 진행됨에 따라 왼쪽에는 정렬이 종료된 값이 모이게 되고, 오른쪽에는 아직 정렬되지 않은 값이 남게 된다.
// 선택 정렬은 최소값 검색이 필요하지만 삽입 정렬은 필요없다.
// 삽입 정렬은 평균 시나리오에서 선택 정렬과 유사하고(데이터 정렬 유형에 따라 차이가 있다) 거품 정렬보다 빠르다.
// 시간 복잡도: O(n2)

// 이중for문
function insertionSort(array) {
  for (let i = 1; i < array.length; i++) {
    let temp = array[i];
    let prev = i - 1;
    for (prev; prev > -1; prev--) {
      if (array[prev] > temp) {
        array[prev + 1] = array[prev]
      } else break;
    } array[prev + 1] = temp;
  } return array;
}

console.log(insertionSort([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(insertionSort([2, 4, 5, 1, 3])); // [1, 2, 3, 4, 5]
console.log(insertionSort([5, 2, 1, 3, 4, 6])); // [1, 2, 3, 4, 5, 6]

// for - while문
function insertionSort2(array) {
  for (let i = 1; i < array.length; i++) {
    let temp = array[i];
    let prev = i - 1;
    while (array[prev] > temp) {
      array[prev + 1] = array[prev];
      prev--;
    } array[prev + 1] = temp;
  } return array;
}

console.log(insertionSort2([3, 1, 0, -1, 4, 2])); // [-1, 0, 1, 2, 3, 4]
console.log(insertionSort2([2, 4, 5, 1, 3])); // [1, 2, 3, 4, 5]
console.log(insertionSort2([5, 2, 1, 3, 4, 6])); // [1, 2, 3, 4, 5, 6]


// Quick Sort
function quickSort() {

}

console.log(quickSort());


// Merge Sort
function mergeSort() {

}

console.log(mergeSort());


// Counting Sort
function countingSort() {

}

console.log(countingSort());
