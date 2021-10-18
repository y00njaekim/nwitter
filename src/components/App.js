import React, {useEffect, useState} from 'react';
import AppRouter from './Router';
import {fbAuth} from '../fbase';

function App() {
  // console.log('App()');
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(fbAuth.getAuth().currentUser);
  const [userObj, setUserObj] = useState(null);
  // console.log(authService.currentUser);
  useEffect(() => {
    const updateProfile = async (user) => {
      if (user.displayName == null) {
        const ind = user.email.indexOf('@');
        const end = user.email.substring(0, ind);
        await fbAuth.updateProfile(user, {displayName: end});
      }
    };

    fbAuth.getAuth().onAuthStateChanged(async (user) => {
      if (user) {
        await updateProfile(user);
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          // updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      // console.log(user);
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = fbAuth.getAuth().currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      // updateProfile: (args) => user.updateProfile(args),
    });
  };

  return <>{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser}></AppRouter> : 'Initializing..'}</>;
}

export default App;
