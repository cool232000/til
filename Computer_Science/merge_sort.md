# Merge Sort

가장 작은 단위까지 쪼갠 원소를 기준을 중심으로 비교해 정렬하는 방법이다.

따라서 merge sort를 하기 위해 필요한 원소는 start, mid, mid+1, end이다.

start와 mid가 같은 위치에, mid+1과 end가 올 때까지 merge sort를 쪼갠다.

이 경우 기준은 mid와 mid+1라고 보고 이것을 중심으로 비교를 시작한다.



비교는 가장 앞에 있는 인덱스 즉, start값을 mid+1값을 비교해 정렬하는 것으로 시작한다.

예를 들어 `5, 2, 3, 4`라는 배열이 있을 때, 5 / 2 / 3 / 4 로 원소를 쪼갠 다음,

5와 2를 비교해서 2가 작으니 merged라는 이름으로 만들어놓은 빈 배열에 2를 넣어주고, right가 배열을 탈출한 상태이므로 left에 있는 5를 merged에 넣어 `2, 5` 라는 배열을 만든다. 이것을 실제 배열에 넣어준 후 5와 2를 비교했던 스택 프레임은 소멸한다.



이제 3과 4를 비교한다.

3과 4를 비교하면 3이 작고, 4가 크기 때문에 3을 merged에 넣어주고 left가 탈출했기 때문에 남은 right를 merged에 넣어준다. 그러면 merged는 `3, 4`가 되면서 이것을 실제 배열에 넣어주면 스택 프레임은 소멸하고 배열의 상황은 `2, 5, 3, 4`가 된다.



이제 mid값은 5, mid+1 값은 3이 된다. 이것을 다시 merge 한다.

2와 3을 비교해 2가 작으므로 merged에 2를 넣어준다. left가 배열을 탈출하지 않았으므로 start+1로 넘어가 5와 3을 비교한다. 3이 더 작으므로 3을 merged에 넣어준다. right가 배열을 탈출하지 않았으므로 mid+1+1이 되고 5와 4를 비교한다. 4가 5보다 작으므로 4를 merged에 넣어주고 right는 배열을 탈출한다. 배열을 탈출하지 못한 left는 merged에 넣어주면 merged의 배열은 `2, 3, 4, 5`이고 이것을 실제 배열에 넣어주면 해당 스택 프레임이 사라지고 merge sort가 완료된다.



## Merge Sort 계산

```python
def merge(li, start, mid, end):
    merged=[]
    left=start
    right=mid+1
    while left <= mid and right <= end:
        if li[left] < li[right]:
            merged.append(li[left])
            left+=1
        else:
            merged.append(li[right])
            right+=1
            
    while left <= mid:
        merged.append(li[left])
        left+=1
        
    while right <= end:
        merged.append(li[right])
        right+=1
        
    li[start : end+1]=merged
#     다른 언어로 포팅할 때 아래를 응용해서 사용
#     for idx in range(start, end):
#         li[idx]=merged.pop(0)

def merge_sort(li, start, end):
    #기저조건: start가 end보다 크거나 같다면
    if start >= end:
        return
    
    mid=(start+end)//2
    merge_sort(li, start, mid)
    merge_sort(li, mid+1, end)
    
    merge(li, start, mid, end)
```

