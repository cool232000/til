# 자바스크립트와의 코드 비교

다음과 같은 자바스크립트 코드가 있다.

```javascript
const person = {
  favoriteLanguages: [ 'TypeScript', 'JavaScript', 'Python', 'Rust', 'Haskell' ]
}

function preferTypeScript(person) {
  return person.favoriteLanguages.includes('TypeScript');
}
```

**코드 해석**

1. preferTypeScript 함수는 person을 매개변수로 받는다.
2. preferTypeScript 함수는 매개변수로 받은 person의 프로퍼티인 favoriteLanguages의 값으로 'TypeScript'가 포함되어 있는지 여부에 대해 불리언 값으로 리턴한다.



이것은 타입스크립트 코드로 다음과 같이 바뀔 수 있다.

```typescript
type Language = 'TypeScript' | 'JavaScript' | 'Python' | 'Rust' | 'Haskell';
interface Person {
  favoriteLanguages: Array<Language>;
}
function preferTypeScript(person: Person): boolean {
  return person.favoriteLanguages.includes('TypeScript');
}
```

**코드 해석**

1. 'Typescript'의 등의 값을 갖는 Language 타입을 생성한다.
2. Person 인터페이스의 favoriteLanguages 키는 Array 타입이고 Language 타입에 포함된 값만을 갖는다.
3. preferTypeScript 함수는 Person 타입의 person 매개변수를 받아 불리언 값을 리턴하는 함수이다.
4. 리턴하는 값은 person 매개변수의 favoriteLanguages 프로퍼티에 'TypeScript'라는 문자열이 포함되었는지를 판단한다.



> 코드 참조 자료: https://ahnheejong.gitbook.io/ts-for-jsdev/01-introducing-typescript/intro