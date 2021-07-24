import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAG_pIyr16hpgcna8-A-75sEagov6nimyA',
  authDomain: 'vue-chat-52dd6.firebaseapp.com',
  projectId: 'vue-chat-52dd6',
  storageBucket: 'vue-chat-52dd6.appspot.com',
  messagingSenderId: '974174396488',
  appId: '1:974174396488:web:3445fa53824f260fae387d',
};

firebase.initializeApp(firebaseConfig);

export const fb = firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
