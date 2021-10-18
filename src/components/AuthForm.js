import React, {useState} from 'react';
import {fbAuth} from '../fbase';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: {name, value},
    } = event;
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
        data = await fbAuth.createUserWithEmailAndPassword(fbAuth.getAuth(), email, password);
      } else {
        data = await fbAuth.signInWithEmailAndPassword(fbAuth.getAuth(), email, password);
      }
      console.log('In Auth.js > onSubmit()');
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} className="authInput" />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput" />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} className="authInput authSubmit" />
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? 'Log In' : 'Sign in'}
      </span>
    </>
  );
};

export default AuthForm;
