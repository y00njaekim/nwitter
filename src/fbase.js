import * as firebase from 'firebase/app';
import * as firebaseAuth from 'firebase/auth';
import * as firestore from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
  // apiKey: 'AIzaSyAeCcG1YDmulX-lZW2WQMk1T819L6TMXzU',
  // authDomain: 'ntwitter-ca13b.firebaseapp.com',
  // projectId: 'ntwitter-ca13b',
  // storageBucket: 'ntwitter-ca13b.appspot.com',
  // messagingSenderId: '185385454697',
  // appId: '1:185385454697:web:3478f16d251f49a1fda6f8',
};

export const firebaseInstance = firebase.initializeApp(firebaseConfig);
export const fbAuth = firebaseAuth;
export const fbStore = firestore;
// export const authService = getAuth();
