# 언어에서의 추상화

low level language와 high level language의 차이는 하드웨어에 대해 추상화되었냐, 아니냐의 차이에 있다.



어셈블러 언어(assembly language)는 하드웨어(CPU) 의존적인 low level language이다.



C언어는 하드웨어를 몰라도 C언어만 알면 소프트웨어를 짤 수 있다. 이것을 하드웨어에 대해 추상화되었다고 한다.

그러나 C언어를 상대적으로 low level language라고 보는 것은 메모리를 직접 할당, 해체하는 언어이기 때문이다. 이것을 메모리에 대해 추상화가 이루어지지 않았다고 한다.



java나 C#은 언어 자체가 메모리를 할당하고 해제(garbage collection)한다. 따라서 메모리에 대해 추상화가 이루어졌으므로 C언어보다 high level language이다. 그러나 java와 C#까지는 자료형을 직접 할당해줘야 한다.



python과 javascript와 같은 인터프리터 언어는 자료형에 대해서도 추상화가 된다. 로직만 설계하면 된다. 추상화 계층에서 가장 high level language이다.
