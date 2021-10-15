import React, {useState} from 'react';
import {firebaseInstance} from '../fbase';
import {fbAuth} from '../fbase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const onChange = (e) => {
    const {
      target: {name, value},
    } = e;
    if (name === 'email') {
      setEmail(value);
      console.log('email');
    } else if (name === 'password') {
      setPassword(value);
      console.log('password');
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await createUserWithEmailAndPassword(fbAuth.getAuth(), email, password);
      } else {
        data = await signInWithEmailAndPassword(fbAuth.getAuth(), email, password);
      }
      console.log('In Auth.js > onSubmit()');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const onSocialClick = async (event) => {
    const auth = fbAuth.getAuth();
    const {
      target: {name},
    } = event;
    let provider;
    if (name === 'google') {
      // console.log('google');
      provider = new fbAuth.GoogleAuthProvider();
    } else if (name === 'github') {
      // console.log('github');
      provider = new fbAuth.GithubAuthProvider();
    }
    const data = await fbAuth.signInWithPopup(auth, provider);
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
