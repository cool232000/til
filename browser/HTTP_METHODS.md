# HTTP METHODS

## HTTP 규약이란?

브라우저가 웹 서버와 통신하기 위한 규약으로 브라우저가 요청(request)하면 응답(reponse)하는 구조로 되어있다.
W3C, IETF 등에서 제정한 인터넷 표준(RFC-2616)으로 국제적인 약속이다.
1991년 HTTP/0.9부터 20년 이상 전세계적으로 사용되는 안정된 표준이며 2021년 현재 HTTP/3으로 메이저 업데이트를 예고한 바 있다.

## HTTP REQUEST METHODS

### GET

지정된 리소스 획득하는 방법으로, body는 존재하지 않는다. 전체 리소스에 대한 요청을 처리할 수도 있고, 대상 리소스에 대한 요청(주로 id로 요청)을 처리할 수도 있다. GET 요청은 리소스를 가져올 때만 사용해야 한다.

```http
GET /index.html
```

### HEAD

HEAD 요청의 URL이 GET으로 요청된 경우 반환되는 헤더를 요청한다. URL이 대량 다운로드를 생성하는 경우 HEAD 요청으로 실제로 파일은 다운받지 않으면서 Content-Length와 같은 헤더 정보를 통해 파일의 크기를 확인할 수 있다.
HEAD는 body가 없어야 하고, 있다 하더라도 무시한다.

```http
HEAD /index.html
```

### POST

리소스를 서버에 전송해 서버에 변화를 일으킨다. body에 대상 리소스를 담는다.
POST 요청은 일반적으로 HTML form 요소를 통해 전송한다. input 또는 button과 같은 속성을 통해 클라이언트가 문자열을 삽입하거나 선택한 데이터를 전송한다.

```http
POST /test
```

### PUT

새 리소스를 생성하거나 대상 리소스를 수정한다. PUT 요청을 할 때 body에 담아서 보낸 페이로드대로 리소스를 전체 변경한다.

```http
PUT /new.html HTTP/1.1
```

### DELETE

지정된 리소스를 삭제한다. body는 있는 경우도 있고 없는 경우도 있으나 대개 존재하지 않고, 주로 id를 통해 대상 데이터를 삭제한다.

```http
DELETE /file.html HTTP/1.1
```

### CONNECT

요청한 리소스와의 양방향 통신을 시작한다. 터널을 여는 데 사용할 수 있다. 예를 들면, SSL(HTTPS)를 사용하는 웹 사이트에 엑세스할 때 CONNECT 요청을 사용한다.
클라이언트가 HTTPS 프록시 서버에 대한 TCP 연결을 CONNECT로 요청하면 서버는 클라이언트를 대신해 연결을 진행해 연결이 완료되면 프록시 서버는 클라이언트와 TCP 스트림을 계속한다.
CONNECT는 hop by hop\* 메소드이다.

```http
CONNECT www.example.com:443 HTTP/1.1
```

### OPTIONS

지정된 URL 또는 서버에 대해 허용된 통신 옵션을 요청한다. 클라이언트는 이 방법으로 URL을 지정하거나 별표(\*)를 지정하여 전체 서버를 나타낼 수 있다.
OPTIONS로 요청할 때는 헤더에 허용되는 메소드를 포함해야 한다.

```http
OPTIONS /index.html HTTP/1.1
OPTIONS * HTTP/1.1
```

### TRACE

대상 리소스의 경로를 따라 메시지 루프백 테스트를 수행하여 유용한 디버깅 메커니즘을 제공한다. 요청의 최종 수신인인 서버(오리진 서버 혹은 요청에서 Max-Forwards 값이 0인 첫 번째 서버)는 수신된 메시지를 Content-Type of message/http와 함께 200(OK) 응답으로 클라이언트에 반영해야 한다. TRACE 요청은 body를 보내지도, 응답받지도 않는다.

```http
TRACE /index.html
```

### PATCH

리소스를 부분 수정한다. CRUD에서 업데이트에 해당하는 요청이다. body에 대상 리소스의 수정할 부분에 대한 내용을 담아서 보내면 해당 부분의 리소스만 변경된다.
서버가 PATCH를 지원하는지 여부를 확인하기 위해 서버는 Access-Control-Allow-Methods에 PATCH를 추가해서 지원 여부를 알릴 수 있다. 또한 Accept-Patch(서버에서 허용하는 패치 문서 형식) 헤더가 있으면 PATCH를 지원한다고 본다.

```http
PATCH /file.txt HTTP/1.1
```

## Safe Method

서버의 상태를 변경하지 않는 메소드를 Safe Method라고 한다. GET, HEAD, OPTIONS, TRACE가 이에 해당된다.
GET, HEAD, OPTIONS, TRACE 모두 body에 아무것도 담지 않은 채 요청되는데, 아무런 리소스도 응답받지 않는 것은 HEAD, TRACE이다. GET은 요청한 리소스를, OPTIONS는 통신 옵션에 대한 정보를 응답 받는다.

\*hop by hop: 데이타통신망에서 각 패킷이 매 노드(또는 라우터)를 건너가는 양상을 비유적으로 표현

## HTTP RESPONSE STATUS CODE

HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료되었는지 여부를 나타낸다. 응답은 5개의 클래스로 그룹화할 수 있다.

- 100-199: Informational responses
- 200-2999: Successful responses
- 300-399: Redirects
- 400-499: Client errors
- 500-599: Server errors

---

[HTTP request methods](https://developer.mozilla.org/ko/docs/Web/HTTP/Methods)
