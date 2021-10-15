## Syntax

> src/routes/Auth.js > `onSubmit()`

🚩 `event.preventDefault();`

 기본으로 정의된 이벤트를 작동하지 못하게 하는 메서드

<br/>

> src/router.js

🚩 `{props.isLoggedIn && <Navigation /> }`

`Navigation` 이 존재하려면 `isLoggedIn` 이 `true` 여야 한다.

<br/>

로그인

local 브라우져 닫혀도 기억

session tap 떠 있는 동안 기억

none 기억 x 새로고침 하면 바로 로그아웃 됨

 <br/>

## Questions

❓ 2.4. Why setInterval() called twice at an interval ?

✋ 다음 [링크](https://stackoverflow.com/questions/69581697/setinterval-called-twice-at-an-interval-react-js)를 참고하자 * Keyword : StrictMode, useEffect(), class based component

❓ 2.4  `App.js` 에서 `useEffect` 의 역할? 기능?

❓ 2.4 `App.js`  `useEffect` 안의 `onAuthStateChanged` 는 왜 user 값이 null 을 반환할 때, 즉 log in / sign in / log out 중 어떤 기능도 수행되지 않았을 때조차 실행되는가?

❓ `<form>` 이랑 `<input type="submit">` 에 대해서 잘 알아보자

❓ 아래 코드 js ES6 잘 파악하자

```react
  const onChange = (e) => {
    const {
      target: {name, value},
    } = e;
```

❓ 3.1 Home > `onSubmit()` 서브밋 할 때 clear 안되는데 원래 그런건가? 그렇다면 어떻게 클리어 하지?

❓`setState((prev) => !prev) 같이 인자로 함수 전달하는 경우 잘 살펴보자





<br/>

## To Do

❗ Auth, Routes, Init 등 `App.js` -> `Routers.js` -> ... 등으로 넘어가는 Flow 그리기 (state 상태와 조건문, `useEffect` 등을 적극적으로 고려하며 그리기)

