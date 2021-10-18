import React, {useEffect, useState} from 'react';
import {fbAuth, fbStore} from '../fbase';
import {useHistory} from 'react-router-dom';
import Nweet from '../components/Nweet';

const Profile = (props) => {
  const [myNweets, setMyNweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(props.userObj.displayName);
  const history = useHistory();

  const onLogOutClick = () => {
    fbAuth.getAuth().signOut();
    history.push('/');
    props.refreshUser();
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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input type="text" placeholder="Display name" onChange={onChange} value={newDisplayName} autoFocus className="formInput" />
        <input
          type="submit"
          value="Update Profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span>Profile</span>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
      <div>
        {myNweets.map((nweetObj) => {
          return <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === props.userObj.uid}></Nweet>;
        })}
      </div>
    </div>
  );
};

export default Profile;
