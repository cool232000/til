최근 electron에서 파일을 로컬에 저장하고 읽어들이는 작업을 했다. 주로 JavaScript에서 작업했던 나에게 filesystem을 직접 건드리는 작업이 좀 생소했기 때문에 기록으로 남겨두려고 한다.

내가 테스트한 환경은 macOS, electron + react, 그리고 node 14이다.



## electron

## app.getPath()



## 로컬 시스템에 파일 저장

먼저 electron은 파일을 저장하는 경로를 `~/Library/Application Support` 라는 위치에 저장한다. 이건 macOS에서의 경로이고 리눅스와 윈도우의 경우 경로가 달라진다. 어디에 저장되는지 확인해보려면 다음과 같이 코드를 작성해본다.

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
  
  fs.writeFile(text, 'test', (err) => {
    if (err) console.err(err);
  });
}

export default electronTest;
```

이렇게 작성한 뒤 앱을 실행하면 `~/Library/Application Support`에 test 라는 폴더가 생겼고, 그 폴더 내부로 들어가면 `test`라는 문자열이 적힌 test.txt 파일이 생성된 것을 확인할 수 있다.



## 저장한 파일 읽기

파일을 읽어들이는 건 더욱 간단하다. `fs.readFile`을 사용하고, 불러올 txt를 `toString()`으로 풀어주면 된다.

```react
import React from 'react';
import electron from 'electron';
import fs from "fs";

const electronTest = () => {
  const app = electron.app || electron.remote.app;
  const direactoryPath = `${app.getPath('appData')}/electronTest/test`;
  
  const text = `${direactoryPath}/test.txt`;
  
  fs.readFile(text, (err, data) => {
    if (err) console.error(err);
    console.log(data.toString());
  });
}

export default electronTest;
```

여기까지 작성하고 실행하면 콘솔에 `test`라는 문자열이 찍히는 걸 확인할 수 있다.

---

* [app.getPath(name)](https://github.com/electron/electron/blob/master/docs/api/app.md#appgetpathname)
* [Electron 1 일렉트론뷰로 우아한 데스크탑 앱 만들기 데이터 다루기](https://fkkmemi.github.io/electron/electron-01-data/)

* [[Electron] Electron 운영체제에 따른 디버깅과 app.getPath()](https://velog.io/@minidoo/Electron-Electron-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C%EC%97%90-%EB%94%B0%EB%A5%B8-%EB%94%94%EB%B2%84%EA%B9%85%EA%B3%BC-app.getPath)


  const pathCheck = () => {
    !fs.existsSync(directoryPath) && fs.mkdirSync(directoryPath);
    !fs.existsSync(directoryCompanyPath) && fs.mkdirSync(directoryCompanyPath);
  };

useEffect(() => {
    pathCheck();
    if (fs.readdirSync(directoryCompanyPath).includes('syncCompanyInfo.json')) {
      setNowCompany(JSON.parse(fs.readFileSync(syncCompanyInfoData)));
    } else {
      if (companyInfo.length !== 0) {
        fs.writeFileSync(
          syncCompanyInfoData,
          JSON.stringify(companyInfo, null, 2)
        );
        setNowCompany(JSON.parse(fs.readFileSync(syncCompanyInfoData)));
      }
    }
  }, [companyInfo]);
