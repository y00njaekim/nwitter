import React, {useState} from 'react';
import {authService} from '../fbase';
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
        data = await createUserWithEmailAndPassword(authService, email, password);
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
      </form>
      <div>
        <button>Continue with Google</button>
      </div>
    </div>
  );
};
export default Auth;
