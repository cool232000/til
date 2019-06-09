# Multi-threading

os가 하는 역할은 Job scheduling이다. 스케줄러가 하는 가장 중요한 역할은 context switching이다. 이것 때문에 프로세스 상태(process status)를 thread로 쪼갰다.



## 프로그램과 프로세스의 차이

프로그램은 하드 디스크에 저장되어 있는 하나의 "이미지"이고, 프로세스는 실행을 명령했을 때 "메인 메모리에 올라와서" 실행을 시작하는 프로그램이다.

프로그램은 하나지만 실행은 동시적으로 여러 번 할 수도 있다. 프로그램이 프로세스에 pid를 줘서 실행되도록 한다.

함수를 실행하는 쓰레드가 많으면, 스택만 가지고 있어도 각자 독립적인 연산이 가능하다.


## 동시성 프로그래밍(concarrency programming)과 병렬 프로그래밍(parallel programming)

동시성 프로그래밍은 CPU가 하나지만 쓰레드를 여러 개 나눠서 멀티로 동작시킨다. 그러나 CPU가 하나이기 때문에 사람은 인지하지 못하지만 쓰레드 하나가 CPU를 점유해 실행되고 있을 때 나머지 쓰레드는 웨이팅 영역에서 기다리고 있기 때문에 실제로 엄밀한 의미에서 동시적으로 실행되고 있지는 않다.

병렬 프로그래밍은 아예 하드웨어가 여러 개 있는 것이다. 한 task를 CPU 2개가 동시에 작업한다.

따라서 single core의 multithreading은 concurrency이고 multi core의 multithreading은 parallel + concurrency이다.

싱글 코어는 싱글 스레드나 멀티 스레드나 실행 시간이 거의 같다.



```python
import threading

# 1부터 1000까지의 연산을 할 때 순차적으로 계산하지 않고 멀티스레드로 네 조각을 나눠서 각자 계산을 하도록 하는 표현식

n=1000
offset=n//4

def thread_main(li, i):
    for idx in range(offset*i, offset*i+1):
        li[idx]*=2

li=[i  for i in range(1, 1001)]
threads=[]

# 스레드를 생성만 한 것
for i in range(4):
    th=threading.Thread(target=thread_main, args=(li, i))
threads.append(th)

# 멀티 스레딩
for th in threads:
    th.start()

# 메인 스레드에서 나머지 스레드들이 모든 실행이 끝날 대까지 기다린다.
for th in threads:
    th.join()

    print(li)
```



멀티 스레딩이 강력할 때는 공유자원(shared resource)이 없을 때를 가정한 것이다. 공유자원이 있는 상태에서 멀티 스레딩이 같이 걸리면 race condition이라는 치명적인 약점이 생긴다.

race condition은 일련의 인스트럭션이 보장되지 않는 것이다. 이것을 경쟁조건이라고 한다. 이걸 해결하기 위해서는 서로가 서로를 배제하는 상호 배제(mutual exclusion)을 하면 된다.



```python
import threading

# 공유 자원
# 모든 스레드에서 접근이 가능한 자원
# 전역 변수
g_num=0

# Lock 객체
# 전역 변수에 접근하지 못하도록 락을 거는 법
lock=threading.Lock()

def thread_main():
    global g_num

# critical section
# 임계영역: 어떤 스레드에서 공유 자원에 접근한 후 수정/변경하려는 코드 영역
# 락을 걸고, 풀어주는 코드를 추가한다.
    lock.acquire()
    for _ in range(100000):
        g_num+=1
    lock.release()

threads=[]

for _ in range(50):
    th=threading.Thread(target=thread_main)
    threads.append(th)

for th in threads:
    th.start()

for th in threads:
    th.join()

print(f'g_num : {g_num}')
```

락 개체를 만들면 어떤 작업이 진행되고 있을 때 크리티컬 섹션에 진입한 한 스레드 외에 다른 스레드들은 기다려야 한다. 이렇게 하면 속도는 느려지지만 계산은 정확하게 할 수 있다. 따라서 이것을 너무 많이 쓰게 되면 멀티스레딩을 하는 것이 오히려 나쁜 방법일 수 있다.



## context switching

멀티 프로세스 환경에서 CPU가 하나의 프로세스를 실행하고 있는 상태에서 요청에 의해 다음 우선 순위의 프로세스가 실행되어야 할 때 기존 프로세스의 상태 또는 레지스터 값을 PCB에 저장하고 CPU가 다음 프로세스를 수행하도록 새로운 프로세스의 상태 또는 레지스터 값을 교체하는 방법을 뜻한다.



선점형 스케줄링을 하는 context switching의 경우 PCB에 작업을 저장하고 위치가 교체된다.

context swiching은 어쩔 수 없이 일어나지만 많이 사용하면 시스템에 무리를 준다.

이를 대비해 time slice를 하는데 time slice를 너무 짧게 잡으면 context swithing이 너무 많이 일어나고 time slice를 너무 길게 잡으면 그것은 멀티태스킹이 아니게 된다.
