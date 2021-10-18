import React, {useState, useEffect} from 'react';
import Nweet from '../components/Nweet';
import {v4 as uuidv4} from 'uuid';
import {fbStore} from '../fbase';
import {fbStorage} from '../fbase';

const Home = (props) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState('');
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
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = fbStorage.ref(fbStorage.getStorage(), `${props.userObj.uid}/${uuidv4()}`);
      const response = await fbStorage.uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await fbStorage.getDownloadURL(response.ref);
    }
    await fbStore.addDoc(fbStore.collection(fbStore.getFirestore(), 'nweets'), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: props.userObj.uid,
      attachmentUrl,
    });
    setNweet('');
    setAttachment('');
  };
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNweet(value);
  };
  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: {files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: {result},
      } = finishedEvent;
      console.log(finishedEvent);
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachment = () => {
    setAttachment('');
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} placeholder="What's on your mind?" maxLength={120} value={nweet} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} alt="attachment" width="50px" height="50px"></img>
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweetObj) => {
          return <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === props.userObj.uid}></Nweet>;
        })}
      </div>
    </div>
  );
};
export default Home;
