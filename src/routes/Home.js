import React, {useState, useEffect} from 'react';
import {fbStore} from '../fbase';
import Nweet from '../components/Nweet';
import NweetFactory from '../components/NweetFactory';

const Home = (props) => {
  const [nweets, setNweets] = useState([]);
  /*const getNweets = async () => {
    // 특정 collection 이름을 가지고 docs 가져오기
    const dbNweets = await fbStore.getDocs(fbStore.collection(fbStore.getFirestore(), 'nweets'));
    dbNweets.forEach((document) => {
      const nweetObject = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetObject, ...prev]);
      // console.log(document.data())
    });
    console.log(dbNweets);
  };*/
  useEffect(() => {
    // getNweets();
    const q = fbStore.query(
      fbStore.collection(fbStore.getFirestore(), 'nweets'),
      // fbStore.where('text' '==', 'hehe')
      fbStore.orderBy('createdAt', 'desc')
    );
    const unsubscribe = fbStore.onSnapshot(q, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((doc) => {
        // console.log(doc.data());
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setNweets(newArray);
      // console.log('Current nweets in CA: ', newArray);
    });
  }, []);

  return (
    <div className="container">
      <NweetFactory userObj={props.userObj}></NweetFactory>
      <div style={{marginTop: 30}}>
        {nweets.map((nweetObj) => {
          return <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === props.userObj.uid}></Nweet>;
        })}
      </div>
    </div>
  );
};
export default Home;
