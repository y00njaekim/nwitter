import React, {useState} from 'react';
import {fbStore} from '../fbase';
import {fbStorage} from '../fbase';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons';

const Nweet = (props) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(props.nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await fbStore.deleteDoc(fbStore.doc(fbStore.getFirestore(), 'nweets', `${props.nweetObj.id}`));
      if (props.nweetObj.attachmentUrl !== '') {
        const stgRef = fbStorage.ref(fbStorage.getStorage(), props.nweetObj.attachmentUrl);
        await fbStorage.deleteObject(stgRef);
      }
    }
  };
  const toggleEditing = () => {
    setEditing((prev) => !prev);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(newNweet);
    await fbStore.updateDoc(fbStore.doc(fbStore.getFirestore(), 'nweets', `${props.nweetObj.id}`), {text: newNweet});
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: {value},
    } = event;
    setNewNweet(value);
  };
  return (
    <div className="nweet">
      {editing ? (
        <>
          {props.isOwner && (
            <>
              <form onSubmit={onSubmit} className="container nweetEdit">
                <input type="text" placeholder="Edit your nweet" value={newNweet} required onChange={onChange} autoFocus className="formInput" />
                <input type="submit" value="Update Nweet" className="formBtn" />
              </form>
              <span onClick={toggleEditing} className="formBtn cancelBtn">
                Cancel
              </span>
            </>
          )}
        </>
      ) : (
        <>
          <h4>{props.nweetObj.text}</h4>
          {props.nweetObj.attachmentUrl && <img src={props.nweetObj.attachmentUrl} />}
          {props.isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
