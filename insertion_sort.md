# Insertion Sort

삽입정렬은 자료 배열의 모든 요소를 앞에서부터 차례대로 이미 정렬된 배열과 비교하여 자신의 위치를 찾아 삽입하는 방법이다.

```python
def insertion_sort(li):
    n=len(li)
    
    for i in range(1, n):
        temp=li[i]
        for j in range(i-1, -2, -1):
            if j==-1:
                break
                
            if li[j] > temp:
                li[j+1]=li[j]
            else:
                break
        li[j+1]=temp
```

1. 첫번째 for 문에서 i는 1부터 n번까지 진행되는 반복문이며 temp라는 변수에 i의 값을 삽입한다.
2. 두번째 for 문은 j는 i-1부터 -2까지, -1만큼씩 이동하는 반복문이다.
3. 만약 j가 -1이면 반복문을 탈출하고, 그게 아니라 temp보다 크면 j+1 위치에 j를 삽입한다.
4. 반복문을 탈출한 후 temp에 저장된 값을 3에서 삽입된 j보다 1자리 큰 위치에 삽입한다.
