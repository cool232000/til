# AWS로 서비스 배포하기
AWS로 서비스를 배포할 때 사용하는 메뉴
- S3
  - 작업한 파일 업로드
  - 정적 웹 사이트 호스팅
- CloudFront
  - https 배포
  - 속도 개선 (S3 사용 대비)
  - 비용 절감 (S3 사용 대비)
- Route53
  - AWS가 제공하는 DNS 서비스
- AWS Certification
  - SSL 인증서 무료 제공  

## S3와 CloudFront를 같이 사용하는 이유
S3는 호스팅을 한 번에 완료할 수 있다는 장점이 있으나 다른 서비스에 비해 비용이 비싸고 직접 배포시 S3 버킷을 설정한 저장소에 직접 요청하는 구조로 되어있다. 만약 S3 버킷을 한국으로 설정하고 서비스를 배포했을 경우 미국이나 유럽 같은 물리적 거리가 먼 곳에서 서비스를 요청하면 한국에 있는 버킷에 직접 요청을 하기 때문에 속도가 느려진다.  
CloudFront는 엣지로케이션에 캐싱해두고 사용자와 가까운 위치에 있는 엣지로 요청을 보내기 때문에 물리적으로 가까운 엣지로 서비스를 요청하게 되므로 직접 요청하는 S3보다 속도가 빠르다.

## https (Hyper Text Transfer Protocol over Secure soket layer)
https는 기존에 사용하던 http(Hyper Text Transfer Protocol)보다 보안이 강화된 버전이다. https는 소켓 통신에서 일반 텍스트를 이용하는 대신 SSL이나 TLS 프로토콜을 통해서 세션 데이터를 암호화한다.
AWS의 CloudFront 서비스를 사용하면 https를 사용할 수 있으나 암호화를 위해서는 SSL 인증서가 필요하므로 https로 서비스를 배포하고자 할 경우 AWS에서 SSL 인증서를 무료 제공하는 메뉴인 AWS Certification를 사용하면 된다.
