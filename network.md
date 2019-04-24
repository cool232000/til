<h1>Network</h1>
<h2>NIC(network interface card)</h2>
<p>NIC는 16진수로 된 일련번호가 부여되어 있다. 이것을 mac address(물리주소)라고 한다. 이것은 전세계에서 유니크하게 각각 부여되어 있는 번호다.</p>
<p>mac address는 00-00-00-00-00-00 으로 되어있는데, 앞의 세 자리는 제조사 ID이고 뒤의 세 자리는 제조사가 NIC에 부여한 일련번호이다.</p>
<p>&nbsp;</p>
<h2>Ethernet Protocol</h2>
<p>라우터가 하나 있고, 라우터에 연결된 호스트들이 있다. 밖으로 나가는 네트워크는 끊겨있고 내부 네트워크는 열려있다면 유투브 접속은 안 되지만 같은 라우터에 접속되어 있는 호스트들끼리는 네트워킹이 가능하다. 이 범위를 LAN(Local area network)라고 한다. LAN에서 네트워킹을 할 때는 mac 주소만 가지고 있으면 된다.</p>
<p>즉, 같은 로컬 안에 있고 서로의 mac 주소를 알고 있으면 외부 네트워크가 끊겨 있어도 네트워킹이 가능하다. 이것을 Ethernet protocol 이라고 한다.</p>
<p>&nbsp;</p>
<h2>ARP</h2>
<ol>
<li>상대방의 mac 주소를 모를 때 Request packet(송신자의 IP와 mac주소 // 수신자의 IP와 0으로 적은 mac주소)을 꾸려 라우터(로컬 네트워크)로 보낸다.</li>

</ol>
<ol start='2' >
<li>라우터는 브로드캐스트로 해당 정보를 각 호스트에게 보낸다.</li>

</ol>
<ol start='3' >
<li>브로드캐스트한 라우터와 해당되지 않는 호스트는 요청을 무시하고, 해당 IP를 갖고 있는 호스트가 Response packet을 꾸려 mac 주소를 알고 있는 리퀘스트 호스트에 바로 통신한다.</li>

</ol>
<p>이러한 과정을 거쳐 IP 주소를 가지고 mac 주소를 알아내는 것을 ARP 라고 한다.</p>
<p>&nbsp;</p>
<h2>IP</h2>
<p>IP주소는 4byte로 구성되어 0~255까지의 숫자를 사용할 수 있다. 보통 마지막 숫자인 255는 브로드캐스트 주소로 예약되어 있다.</p>
<p>&nbsp;</p>
<h3>IP Class</h3>
<p>000.000.000.000 &lt;&lt;라고 구성되는 IP 주소의 맨 앞 자리가 무엇이냐에 따라 class가 A, B, C로 나뉜다.</p>
<p><img src='https://imgur.com/virQ1T7.jpg' alt='' referrerPolicy='no-referrer' /></p>
<p>Class A는 2<sup>8</sup>개의 Network ID와 2<sup>24</sup>개의 Host ID를 사용할 수 있다. 범위는 0~127이고 0으로 시작한다.</p>
<p>Class B는 2<sup>16</sup>개의 Network ID와 2<sup>16</sup>개의 Host ID를 사용할 수 있다. 범위는 128~191이고 10으로 시작한다.</p>
<p>Class C는 2<sup>24</sup>개의 Network ID와 2<sup>8</sup>개의 Host ID를 사용할 수 있다. 범위는 192~223이고 110으로 시작한다.</p>
<p>&nbsp;</p>
<h3>서브넷</h3>
<p>Host ID에 할당된 bit를 쪼개어 서브넷을 만들 수 있다.</p>
<p>Class C는 2<sup>8</sup>개의 Host ID를 사용할 수 있는데, 2개의 bit를 빌려 2<sup>2</sup>개를 subnet ID로 만들면 Host ID는 2<sup>6</sup>개가 된다. 따라서 접속할 수 있는 호스트의 수는 줄어들 게 되지만 그룹을 여러 개로 나누어 각자의 LAN으로 활용할 수 있다는 장점이 있다.</p>
<p>&nbsp;</p>
<h4>공인 IP와 사설 IP</h4>
<p>공인 IP는 전세계적으로 유니크하다. 전세계 어디에 있더라도 공인 IP주소만 알면 통신이 가능하다.</p>
<p>반면 사설 IP는 Private network 상에 존재하고 같은 주소로 다수의 Private network를 만들 수 있기 때문에 IP 주소를 안다고 해서 해당 컴퓨터와 통신할 수 없다. 또한 공인 IP를 사용하는 라우터는 DHCP(Dynamic Host Configuration Protocol)로 동작하기 때문에 동적으로 IP를 할당한다. 항상 같은 IP를 할당받을 수 없다.</p>
