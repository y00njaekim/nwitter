import React, {useEffect, useState} from 'react';
import {fbAuth, fbStore} from '../fbase';
import {useHistory} from 'react-router-dom';

const Profile = (props) => {
  const [myNweets, setMyNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(props.userObj.displayName);
  const history = useHistory();

  const onLogOutClick = () => {
    fbAuth.getAuth().signOut();
    history.push('/');
  };

  const getMyNweets = async () => {
    const q = fbStore.query(fbStore.collection(fbStore.getFirestore(), 'nweets'), fbStore.where('creatorId', '==', props.userObj.uid), fbStore.orderBy('createdAt', 'desc'));
    const unsubscribe = fbStore.onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        console.log(doc.data());
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setMyNweets(newArray);
      // console.log('Current nweets in CA: ', newArray);
    });
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (props.userObj.displayName !== newDisplayName) {
      await fbAuth.updateProfile(fbAuth.getAuth().currentUser, {displayName: newDisplayName});
      props.refreshUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} />
        <input type="submit" value="Update Profile" />
      </form>
      <span>Profile</span>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
