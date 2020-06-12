* RDS (데이터 베이스)

  * 표준생성 -> MySQL
  * DB 인스턴스 식별자 / 마스터 사용자 이름 => 동일하게 구성
  * 마스터 암호
  * 추가 연결 구성 -> 퍼블릭 액세스 기능 -> 예
  * MySQL Work bench 접속시 Hostname -> 앤드포인트 값

* EC2

  * Ubuntu Server 선택
  * 검토 및 시작 -> 보안 그룹 편집
  * SSH 소스: 위치 무관
  * 규칙 추가 -> HTTP 소스: 위치 무관
  * 새 키 페어 생성

* 터미널에서 Ubuntu server로 접속하기

  * `ssh -i 보안키.pem ubuntu@인스턴스퍼블릭IP `
    * 보안키 권한 얻는 방법 `chmod 600 보안키.pem`
  * Ubuntu server 접속 후 `cd home/`으로 가서 `mkdir www` 생성
    * www 폴더가 생성 안 될 경우 관리자 권한 얻기: `sudo -s`

* nginx 배포

  ```shell
  sudo -s
  
  sudo apt-get update
  sudo apt-get install
  sudo apt-get install nginx
  
  //노드 설치
  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo apt-get install build-essential
  
  //cra 설치
  npm install -g create-react-app
  
  //혹시 yarn이 안된다면
  sudo apt remove cmdtest
  sudo apt remove yarn
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
  sudo apt-get update  
  sudo apt-get install yarn
  
  //https://stackoverflow.com/questions/46013544/yarn-install-command-error-no-such-file-or-directory-install
  
  
  //nginx 기본 설정 제거
  sudo rm /etc/nginx/sites-available/default
  sudo rm /etc/nginx/sites-enabled/default
  
  
  //리액트 build 결과물을 연결시켜줄 설정 파일
  sudo touch /etc/nginx/sites-available/myapp.conf
  
  vi /etc/nginx/sites-available/myapp.conf
  i
  server {
    listen 80;
    location / {
      root   /home/www/movie-react/build;
      index  index.html index.htm;
      try_files $uri /index.html;
    }
  }
  :wq
  
  cd /home
  mkdir www
  cd www
  
  git clone https://github.com/gunheekim90/movie-react
  cd movie-react
  yarn install
  yarn add react-scripts
  yarn build
  
  //초기 nginx 설정에서 sites-available에 대한 심볼링 링크를 생성해야 작동합니다
  //그 다음 nginx 재실행
  sudo ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/myapp.conf
  sudo systemctl stop nginx
  sudo systemctl start nginx
  sudo systemctl status nginx
  ```

  

