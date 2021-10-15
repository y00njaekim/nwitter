import React from 'react';
import {fbAuth} from '../fbase';
import {Link, useHistory} from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  const onLogOutClick = () => {
    fbAuth.getAuth().signOut();
    history.push('/');
  };

  return (
    <>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
