import React, {useEffect, useState} from 'react';
import AppRouter from './Router';
import {fbAuth} from '../fbase';

function App() {
  console.log('App()');
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(fbAuth.getAuth().currentUser);
  // console.log(authService.currentUser);
  useEffect(() => {
    fbAuth.getAuth().onAuthStateChanged((user) => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      console.log(user);
      setInit(true);
    });
  }, []);

  return <>{init ? <AppRouter isLoggedIn={isLoggedIn}></AppRouter> : 'Initializing..'}</>;
}

export default App;
