최근 electron에서 파일을 로컬에 저장하고 읽어들이는 작업을 했다. 주로 JavaScript에서 작업했던 나에게 filesystem을 직접 건드리는 작업이 좀 생소했기 때문에 기록으로 남겨두려고 한다.

내가 테스트한 환경은 macOS, electron + react, 그리고 node 14이다.

## app.getPath()

electron이 제공하는 내장 메소드가 꽤 많은데, 그중 app.getPath()는 운영체제에 따라 다른 경로를 제공하는 메소드이다.  
쉽게 말해, 맥과 윈도우, 그리고 리눅스는 각기 다른 운영체제를 갖고 있고, 접근할 수 있는 사용자 데이터 경로도 다르다. 이걸 일일이 지정해주지 않고 app.getPath()를 사용하면 운영체제에 따라 electron이 알아서 경로를 찾아준다. 이 경로는 `appData`라는 매개변수로 확인할 수 있는데, 운영체제별 경로는 다음과 같다.

Windows: %APPDATA%  
Linux: $XDG_CONFIG_HOME or ~/.config  
macOS: ~/Library/Application Support

나는 macOS를 기준으로 설명하려고 한다.

## 로컬 시스템에 파일 저장

위에서 macOS는 파일 저장 경로가 `~/Library/Application Support` 라고 했다. 다음의 코드를 통해 이 경로를 확인할 수 있다.

```react
import React from 'react';
import electron from 'electron';

const electronTest = () => {
  const app = electron.app || electron.remote.app;

  console.log(app.getPath('appData'));
  // ~/Library/Application Support
}

export default electronTest;
```

이제 파일을 저장해보자.

나의 경우 파일이 저장될 폴더를 생성하고 거기에 test.txt라는 파일을 저장하려고 한다.

node.js의 filesystem 동작에는 동기 동작과 비동기 동작이 있다.

```react
import React from 'react';
import electron from 'electron';
import fs from "fs";

const electronTest = () => {
  const app = electron.app || electron.remote.app;
  const direactoryPath = `${app.getPath('appData')}/electronTest/test`;
  const text = `${direactoryPath}/test.txt`;

  // direactoryPath에 해당하는 폴더가 있는지 확인하고, 없는 경우 생성
  !fs.existsSync(direactoryPath) && fs.mkdirSync(direactoryPath);

  // 동기 쓰기
  fs.writeFileSync(text, 'test');

  // 비동기 쓰기
  fs.writeFile(text, 'test', (err) => {
    if (err) console.err(err);
  });
}

export default electronTest;
```

이렇게 작성한 뒤 앱을 실행하면 `~/Library/Application Support`에 test 라는 폴더가 생겼고, 그 폴더 내부로 들어가면 `test`라는 문자열이 적힌 test.txt 파일이 생성된 것을 확인할 수 있다.

## 저장한 파일 읽기

파일을 읽어들이는 건 더욱 간단하다. 동기일 경우 `fs.readFileSync`, 비동기일 경우 `fs.readFile`을 사용하고, 불러올 txt를 `toString()`으로 풀어주면 된다.

```react
import React from 'react';
import electron from 'electron';
import fs from "fs";

const electronTest = () => {
  const app = electron.app || electron.remote.app;
  const direactoryPath = `${app.getPath('appData')}/electronTest/test`;

  const text = `${direactoryPath}/test.txt`;

  fs.readFileSync(text.toString());

  fs.readFile(text, (err, data) => {
    if (err) console.error(err);
    console.log(data.toString());
  });
}

export default electronTest;
```

여기까지 작성하고 실행하면 콘솔에 `test`라는 문자열이 찍히는 걸 확인할 수 있다.

## 파일 저장 경로에 폴더 또는 파일이 있는지 확인하기

만약 특정 파일을 생성하는 쓰기 동작과 그 파일을 읽는 동작을 하는 컴포넌트가 있다고 가정했을 때, 컴포넌트가 열릴 때마다 무작정 어떤 내용이 담긴 파일을 생성하거나 파일의 존재 유무는 모른 채 무작정 파일을 읽어들이려고 했다간 에러가 발생하게 될 것이다.  
또한 한 번 쓰고 말 데이터가 아니라 꾸준히 누적한 데이터를 사용하는 경우라면 미리 폴더나 파일을 확인하고 다음 동작을 하도록 만들어야겠다.  
기존에 작성된 파일이 있는지 확인할 때는 `fs.existsSync`, `fs.exists`를 사용하고, 결과는 boolean 값으로 확인할 수 있다.

```react
import React from 'react';
import electron from 'electron';
import fs from "fs";

const electronTest = () => {
  const app = electron.app || electron.remote.app;
  const direactoryPath = `${app.getPath('appData')}/electronTest/test`;

  fs.existsSync(directoryPath);
  fs.exists(directoryPath, (exists) => {
    console.log(exists);
  });

export default electronTest;
```

## 폴더 생성하기

app.getPath()로 경로를 직접 지정해서 폴더를 생성할 수 있지만, 폴더가 있는지 확인해보고 없으면 폴더를 생성하려면 `fs.mkdirSync`, `fs.mkdir`을 사용한다.

```react
import React from 'react';
import electron from 'electron';
import fs from "fs";

const electronTest = () => {
  const app = electron.app || electron.remote.app;
  const direactoryPath = `${app.getPath('appData')}/electronTest/test`;

    !fs.existsSync(directoryPath) && fs.mkdirSync(directoryPath);

    !fs.existsSync(directoryPath) && fs.mkdir(directoryPath, (err) => {
      console.error(err);
    });

export default electronTest;
```

## 파일 삭제

파일을 삭제하려면 fs.unlinkSync, fs.unlink 메소드를 사용한다.

```react
import React from 'react';
import electron from 'electron';
import fs from "fs";

const electronTest = () => {
  const app = electron.app || electron.remote.app;
  const direactoryPath = `${app.getPath('appData')}/electronTest/test`;
    const text = `${direactoryPath}/test.txt`;

  fs.unlinkSync(text);

  fs.unlink(text, (err) => {
    if (err) console.error(err);
  });
}

export default electronTest;
```

## 마무리

JavaScript에는 filesystem을 건드리는 메소드가 제공되지 않았기 때문에 처음 기능을 구현하려고 했을 때는 막막했지만 node.js에서 파일 생성, 저장, 읽기 등의 동작이 아주 잘 구현되어 있어 쉽게 filesystem과 관련된 동작들을 구현할 수 있었다.  
또한 electron에서도 getPath()와 같은 내장 메소드가 잘 제공되었기 때문에 운영체제를 고민하지 않고 프로그램을 짤 수 있다는 점이 좋았다.  
늘 인터넷에 연결되어 있는 상태를 기준으로 프로그램을 하던 것에서 벗어나 인터넷이 단절된 환경에서 로컬 시스템을 어떻게 활용하면 좋을지 생각할 수 있는 좋은 경험이었다.

---

- [app.getPath(name)](https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname)
- [Electron 1 일렉트론뷰로 우아한 데스크탑 앱 만들기 데이터 다루기](https://fkkmemi.github.io/electron/electron-01-data/)

- [[Electron] Electron 운영체제에 따른 디버깅과 app.getPath()](https://velog.io/@minidoo/Electron-Electron-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C%EC%97%90-%EB%94%B0%EB%A5%B8-%EB%94%94%EB%B2%84%EA%B9%85%EA%B3%BC-app.getPath)
