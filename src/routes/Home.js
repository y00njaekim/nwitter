import {collection} from '@firebase/firestore';
import React, {useState, useEffect} from 'react';
import {fbStore} from '../fbase';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const getNweets = async () => {
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
  };
  useEffect(() => {
    getNweets();
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await fbStore.addDoc(fbStore.collection(fbStore.getFirestore(), 'nweets'), {
      nweet,
      createdAt: Date.now(),
    });
    setNweet('');
  };
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNweet(value);
  };
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => {
          return (
            <div key={nweet.id}>
              <h4>{nweet.nweet}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Home;
