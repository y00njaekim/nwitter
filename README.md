## Syntax

> src/routes/Auth.js > `onSubmit()`

π© `event.preventDefault();`

κΈ°λ³ΈμΌλ‘ μ μλ μ΄λ²€νΈλ₯Ό μλνμ§ λͺ»νκ² νλ λ©μλ

<br/>

> src/router.js

π© `{props.isLoggedIn && <Navigation /> }`

`Navigation` μ΄ μ‘΄μ¬νλ €λ©΄ `isLoggedIn` μ΄ `true` μ¬μΌ νλ€.

<br/>

λ‘κ·ΈμΈ

local λΈλΌμ°μ Έ λ«νλ κΈ°μ΅

session tap λ  μλ λμ κΈ°μ΅

none κΈ°μ΅ x μλ‘κ³ μΉ¨ νλ©΄ λ°λ‘ λ‘κ·Έμμ λ¨

 <br/>

npm install uui

μ΄λ€ μλ³μλ₯Ό λλ€μΌλ‘ μμ±ν΄μ€

<br/>

userobj λΌλ state λ‘ μ λ³΄ν΅μΌ μ΄ν νΉμ  component μμ currentUser profile update ν μ΄ν μμ μ»΄ν¬λνΈμμ λ°μμ¨ refresh ν¨μ μ¨μ userobj = currentuser ν΄μ£Όλ©΄ μ λΆλ€ λ¦¬λ λλ§

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

β 2.4. Why setInterval() called twice at an interval ?

β λ€μ [λ§ν¬](https://stackoverflow.com/questions/69581697/setinterval-called-twice-at-an-interval-react-js)λ₯Ό μ°Έκ³ νμ \* Keyword : StrictMode, useEffect(), class based component

β 2.4 `App.js` μμ `useEffect` μ μ­ν ? κΈ°λ₯?

β³ (on Scrum) β 2.4 `App.js` `useEffect` μμ `onAuthStateChanged` λ μ user κ°μ΄ null μ λ°νν  λ, μ¦ log in / sign in / log out μ€ μ΄λ€ κΈ°λ₯λ μνλμ§ μμμ λμ‘°μ°¨ μ€νλλκ°?

β³ (on Scrum) β 2.4 What is the reason that `onAuthStateChanged`(in the `App.js` `useEffect`) runs even if when `user` value equals to `null`? I think `user` value equals to 'null' indicate that none of the tasks(log in / sign in / log out) were not perforemd, then I think that since `onAuthStateChanged` is a listener for login/ sign in/ log out, it should not be implemented but actually it runs even if so.

β `<form>` μ΄λ `<input type="submit">` μ λν΄μ μ μμλ³΄μ

β μλ μ½λ js ES6 μ νμνμ. λ΄ [λΈλ‘κ·Έ](https://y00njaekim.github.io/react/input/) μ λΉκ΅ν΄λ³΄μ.

```react
  const onChange = (e) => {
    const {
      target: {name, value},
    } = e;
```

β³ (on Scrum) β 3.1 Home > `onSubmit()` μλΈλ° ν  λ clear μλλλ° μλ κ·Έλ°κ±΄κ°? κ·Έλ λ€λ©΄ μ΄λ»κ² ν΄λ¦¬μ΄ νμ§?

β³ (on Scrum) β 3.1 about: Home > `onSubmit()`. When click submit, my <input> texts in a remain intact. Is this supposed to be like that? Or is it just for my case? What is the solution to clear that

β value κ° μ€μ ν΄μ λ°μν΄μ£Όλ©΄ λ¨. `<input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName}`

β`setState((prev) => !prev) κ°μ΄ μΈμλ‘ ν¨μ μ λ¬νλ κ²½μ° μ μ΄ν΄λ³΄μ

β4.0 Home.js μμ

```react
  const onFileChange = (event) => {
    console.log(event.target.files);
  };
```

λΌκ³  μ°λ©΄ νμΌμ΄ μΆλ ₯ λλλ°

```react
  const onFileChange = (event) => {
    console.log(event.target);
  };
```

μ΄λΌκ³  μΉλ©΄ νμΌμ΄ λκΌ½λ§νΌλ μλ³΄μ΄λκ² μ΄ν΄κ° μκ°λ€

β`promise` λ₯Ό λ¦¬ν΄νλ€λ κ²μ λ  μ’ κΈ°λ€λ €λ¬λΌλ μλ―Έλ‘ await λ₯Ό ν΄μ€μΌν¨??

<br/>

## To Do

β Auth, Routes, Init λ± `App.js` -> `Routers.js` -> ... λ±μΌλ‘ λμ΄κ°λ Flow κ·Έλ¦¬κΈ° (state μνμ μ‘°κ±΄λ¬Έ, `useEffect` λ±μ μ κ·Ήμ μΌλ‘ κ³ λ €νλ©° κ·Έλ¦¬κΈ°)

β typescript, proptypes μ¬μ©νκΈ°
