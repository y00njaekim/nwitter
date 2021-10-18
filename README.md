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

npm install uui

어떤 식별자를 랜덤으로 생성해줌

<br/>

userobj 라는 state 로 정보통일 이후 특정 component 에서 currentUser profile update 한 이후 상위 컴포넌트에서 받아온 refresh 함수 써서 userobj = currentuser 해주면 전부다 리렌더링

```react
const onSubmit = async (event) => {
    event.preventDefault();
    if (props.userObj.displayName !== newDisplayName) {
      await fbAuth.updateProfile(fbAuth.getAuth().currentUser, {displayName: newDisplayName});
      props.refreshUser();
    }
  };
```

## Questions

❓ 2.4. Why setInterval() called twice at an interval ?

✋ 다음 [링크](https://stackoverflow.com/questions/69581697/setinterval-called-twice-at-an-interval-react-js)를 참고하자 \* Keyword : StrictMode, useEffect(), class based component

❓ 2.4 `App.js` 에서 `useEffect` 의 역할? 기능?

⛳ (on Scrum) ❓ 2.4 `App.js` `useEffect` 안의 `onAuthStateChanged` 는 왜 user 값이 null 을 반환할 때, 즉 log in / sign in / log out 중 어떤 기능도 수행되지 않았을 때조차 실행되는가?

⛳ (on Scrum) ❓ 2.4 What is the reason that `onAuthStateChanged`(in the `App.js` `useEffect`) runs even if when `user` value equals to `null`? I think `user` value equals to 'null' indicate that none of the tasks(log in / sign in / log out) were not perforemd, then I think that since `onAuthStateChanged` is a listener for login/ sign in/ log out, it should not be implemented but actually it runs even if so.

❓ `<form>` 이랑 `<input type="submit">` 에 대해서 잘 알아보자

❓ 아래 코드 js ES6 잘 파악하자. 내 [블로그](https://y00njaekim.github.io/react/input/) 와 비교해보자.

```react
  const onChange = (e) => {
    const {
      target: {name, value},
    } = e;
```

⛳ (on Scrum) ❓ 3.1 Home > `onSubmit()` 서브밋 할 때 clear 안되는데 원래 그런건가? 그렇다면 어떻게 클리어 하지?

⛳ (on Scrum) ❓ 3.1 about: Home > `onSubmit()`. When click submit, my <input> texts in a remain intact. Is this supposed to be like that? Or is it just for my case? What is the solution to clear that

✋ value 값 설정해서 반영해주면 됨. `<input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName}`

❓`setState((prev) => !prev) 같이 인자로 함수 전달하는 경우 잘 살펴보자

❓4.0 Home.js 에서

```react
  const onFileChange = (event) => {
    console.log(event.target.files);
  };
```

라고 쓰면 파일이 출력 되는데

```react
  const onFileChange = (event) => {
    console.log(event.target);
  };
```

이라고 치면 파일이 눈꼽만큼도 안보이는게 이해가 안가네

❓`promise` 를 리턴한다는 것은 날 좀 기다려달라는 의미로 await 를 해줘야함??

<br/>

## To Do

❗ Auth, Routes, Init 등 `App.js` -> `Routers.js` -> ... 등으로 넘어가는 Flow 그리기 (state 상태와 조건문, `useEffect` 등을 적극적으로 고려하며 그리기)
