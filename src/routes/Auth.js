import React from 'react';
import {fbAuth} from '../fbase';
import AuthForm from '../components/AuthForm';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTwitter, faGoogle, faGithub} from '@fortawesome/free-brands-svg-icons';

const Auth = () => {
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
    <div className="authContainer">
      <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size="3x" style={{marginBottom: 30}} />
      <AuthForm></AuthForm>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="github" className="authBtn">
          Continue with Github <FontAwesomeIcon icon={faGithub} />
        </button>
      </div>
    </div>
  );
};
export default Auth;
