# CORS (교차 출처 리소스 공유: Cross-Origin Resource Sharing)

CORS란 Cross-Origin Resource Sharing의 약자로 번역해서 교차 출처 리소스 공유라고 불리는 HTTP 헤더 기반 메커니즘이다. 이렇게만 봐서는 그래서 무슨 역할을 하는 것인지 알기가 쉽지 않다. 쉽게 말하면, CORS는 브라우저가 안전한 리소스만을 골라내어 웹을 사용할 수 있도록 하는 것을 말한다.

웹은 개발자 도구를 열면 html, css, Javascript까지 모든 소스를 확인할 수 있는 경우가 많다. 소스를 확인할 수 있다는 것은 그만큼 공격에 취약해진다는 뜻으로, 실제로 Javascript의 경우 CSRF(사이트간 요청 위조: Cross-Site Request Forgery)나 XSS(사이트간 스크립팅: Cross-Site Scripting)와 같은 방식으로 웹을 공격할 가능성이 크다.

이런 보안상의 이유로 브라우저는 스크립트에서 시작된 교차 출처 HTTP 요청을 제한한다. XMLHttpRequest 및 Fetch API는 동일 출처 정책(SOP)을 따르는 대표적인 예다. 즉, 교차 출처의 응답이 올바른 CORS 헤더를 포함하지 않는 경우, 상술한 API를 사용하는 웹 애플리케이션은 CORS 정책을 위반한 것으로 판단된다. 즉, 애플리케이션이 로드된 동일한 출처(SOP)에서만 리소스를 요청할 수 있다.

## 올바른 CORS 헤더?

브라우저가 서버에 리소스 요청을 보낼 때는 요청 헤더에 Origin이라는 필드에 요청을 보내는 출처를 함께 담아서 보낸다. 그러면 리소스 요청을 받은 서버에서는 응답 헤더에 Access-Control-Allow-Origin에 접근이 허용된 출처를 함께 담아서 리소스를 보낸다. 리소스를 받은 브라우저는 자신이 보냈던 Origin과 서버가 보낸 Access-Control-Allow-Origin을 비교하여 유효한 응답인지 검사하고 요청을 승인할지 거부할지 결정한다.

## 교차 출처 구분하기

같은 출처와 교차 출처를 구분하는 방법은 브라우저가 요청을 보냈던 출처와 서버로부터 받은 접근이 허용된 출처를 비교하여 scheme, host, port가 동일한 것을 기준으로 둔다.
다만 scheme과 host가 다르면 무조건 교차 출처로 간주되지만 port가 다른 경우는 대상 브라우저의 정책에 따른다.

- scheme: http, https
- host: google.com 등
- port: 80, 3000 등

## CORS 에러 해결하기

1. Access-Control-Allow-Origin 세팅
   서버에서 Access-Control-Allow-Origin에 출처를 명시해준다. \*를 사용하면 모든 출처를 허용할 수 있으나 보안상 권장되지 않는 방식이다.

2. Webpack Dev Server 프록시 설정
   로컬에서 프론트엔드 개발을 하는 경우 프록시로 CORS 정책을 우회할 수 있다. CORS 정책을 지킨 것처럼 브라우저를 속이면서 개발을 하는 방법인데, 개발 단계에서는 사용하기 용이한 방법이지만 빌드 후에도 이 방법을 사용할 수는 없다.
