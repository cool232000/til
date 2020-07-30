# Selection Sort

Selection sort는 배열을 돌면서 가장 작은 값부터 앞으로 하나씩 옮기는 방법이다.

이 방법을 사용하기 위해서는 먼저 가장 작은 값을 알아야 한다. 그런데 가장 작은 값을 확인하려면 배열을 비교해야 하기 때문에 비교하기 전에는 찾고자 하는 가장 작은 값을 알 수 없다. 따라서 0번 인덱스의 값을 min_idx라고 선언한 변수에 임의로 넣고 비교를 시작한다.

비교는 순차적으로 인덱스를 거듭해 올라가는데, 임의로 설정한 min_idx를 다음 인덱스와 비교해 min_idx가 더 작으면 그 다음 인덱스로 넘어가고, 만약 그렇지 않다면 min_idx 값을 변경한다.

배열을 한 번 돌고 나면 min_idx 값이 정해진다. 이 정해진 min_idx를 0번 인덱스로 옮겨준다.

이렇게 되면 첫 정렬이 끝난다.

이후에도 같은 방식으로 1번 인덱스를 임의의 가장 작은 값 즉, min_idx라는 변수에 넣고 배열을 한 바퀴 돌며 진짜로 가장 작은 값을 찾는다. 그렇게 해서 찾은 가장 작은 값은 1번 인덱스에 넣어준다.

이 방법을 배열의 길이보다 한 번 적게 반복하면 결국 가장 큰 값은 비교하지 않아도 제일 끝자리에 배치된다. Selection sort는 Bubble sort와 마찬가지로 단순 정렬이기 때문에 시간복잡도가 O(n<sup>2</sup>)이다.



## Selection sort 계산

1. 첫번째 for 문으로 n-1번 도는 반복문에서 min_idx 값에 i 값을 넣는다.
2. 두번째 for 문으로 i+1부터 n까지 도는 반복문에서 만약 j 값이 min_idx 값보다 작으면 min_idx를 j 값으로 교체한다.
3. 반복문을 탈출한 후 i값과 j값이 들어간 min_idx 값의 위치를 바꿔준다.

파이썬
```python
def selection_sort(li):
    n=len(li)
    
    for i in range(n-1):
        min_idx=i
        for j in range(i+1, n):
            if li[j] < li[min_idx]:
                min_idx=j
                
        li[i], li[min_idx]=li[min_idx], li[i]
```

자바스크립트
```javascript
function selectionSort(array) {
  const sortArr = array;
  const arrLength = sortArr.length;
  for (let i = 0; i < arrLength - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arrLength; j++) {
      if (sortArr[j] < sortArr[minIdx]) {
        minIdx = j;
      }
    }
    const temp = sortArr[minIdx];
    sortArr[minIdx] = sortArr[i];
    sortArr[i] = temp;
  } return sortArr;
}
```
