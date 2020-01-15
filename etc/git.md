SICP(Structure and Interpretation of Computer Programs)는 자바스크립트 버전으로 개편되었다. 컴퓨터 동작 원리를 이해하는데 큰 도움이 된다.



# 리눅스

헬싱키 대학생이었던 리누스 토발즈가 미닉스 OS를 개조해서 만들었다. 리눅스는 많은 곳에서 활용되고 있는데 현재 시점에서 사용자가 가장 많이 접할 수 있는 리눅스 운영체제는 안드로이드이다.

GUI: Graphic User Interface



gitforwindows.org

git bash (터미널 or iTerm)

pwd < 현재 위치 알아내기

ls < 현재 위치의 하위 폴더/파일 나타내기

ls -l < 하위 폴더/파일 자세한 정보로 확인하기

ls -a < 숨김 파일까지 보기 (윈도우에서는 안 됨)



# git

git은 VCS(Version Control System)이다.

VSC == SCM(source Code Management) < SCM (software Configuration Management: 형상관리)





git config --global user.name "가입할 때 썼던 네임"

git config --global user.email "가입할 때 썼던 메일"

git config --global core.editor "vim"

git config --global core.pager "cat"

git config --list

수정시

git config --global --unset user.email

삭제되고 다시

git config --global user.email "가입할 때 썼던 메일" 쓰면 됨



디렉토리에 깃 연결하기

git init

디렉토리에 연결된 깃 삭제하기

rm -r .git



# repo

Repository name > 가능하면 로컬과 같은 이름으로 작성

Description > 옵션이기 때문에 무시해도 무방

Public > 깃은 어지간하면 퍼블릭으로 작성할 것 (마소가 산 뒤에 private를 무료로 풀어버림 but 기능 제한)

나머지 선택하지 말고 Create repository

https에 있는 주소를 카피한 후 터미널로 넘어옴



git remote 주소를 등록해야 함 (git remote 명령어에 아무것도 나오지 않는다면)

관습적으로 origin 이라는 이름을 써서 주소를 등록한다

git remote add origin 레포 주소



연결된 url 확인하기

git remote get-url origin



git add README.md

git commit > vim 열림

```
I added README.md with git for the first time.
I think git and GitHub is cool.

feat: feature
docs: documentations
bugfix: bug fix
conf: configurations
```

:wq

git push origin master