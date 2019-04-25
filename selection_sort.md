# Selection Sort

선택정렬은 제자리 정렬 알고리즘의 하나이다.

첫번째 순서에는 첫번째 위치에 최솟값을 넣는다.

두번째 순서에는 두번째 위치에 남은 값 중에서 최솟값을 넣는다.



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

1. 첫번째 for 문으로 n-1번 도는 반복문에서 min_idx 값에 i 값을 넣는다.
2. 두번째 for 문으로 i+1부터 n까지 도는 반복문에서 만약 j 값이 min_idx 값보다 작으면 min_idx를 j 값으로 교체한다.
3. 반복문을 탈출한 후 i값과 j값이 들어간 min_idx 값의 위치를 바꿔준다.
