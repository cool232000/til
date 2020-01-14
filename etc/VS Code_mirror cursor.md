#VS Code에서 mirror cursor 옵션 조정하기

VS Code 1.41 이상 버전부터 mirror cursor가 채택되었다. 기존 VS Code에서 동작하던 Auto Rename tag 익스텐션과 거의 비슷하게 동작한다. 그런데 mirror cursor는 단점이 하나 있는데 단순히 태그 자체를 수정하는 것이 아니라 다중커서로 클래스를 넣거나 할 때 닫힘 태그 부분까지 같이 움직인다는 것이다.

![mirror cursor](https://im7.ezgif.com/tmp/ezgif-7-32bf1e32a840.gif)

VS Code에서는 원래 태그를 변경하고 mirror cursor 기능을 무력화시키려면 스페이스바를 누르면 된다고 한다. 이 경우 단일 커서일 때는 문제가 해결되지만 다중 커서일 때는 다중 커서가 해제되는 문제가 생긴다.

mirror cursor는 조정 가능한 옵션이기 때문에 설정에서 `HTML: Mirror Cursor On Matching Tag`를 체크해제하고 Auto Rename tag 익스텐션을 사용하면 해당 문제가 발생하지 않는다.



#####[VS Code: mirror cursor](https://code.visualstudio.com/updates/v1_41#_html-mirror-cursor)