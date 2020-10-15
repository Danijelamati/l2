import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA23B-en-w2v6m5FxqZH-cTv6IfVpUf6wQ',
  authDomain: 'l2-zad.firebaseapp.com',
  databaseURL: 'https://l2-zad.firebaseio.com',
  projectId: 'l2-zad',
  storageBucket: 'l2-zad.appspot.com',
  messagingSenderId: '925076172143',
  appId: '1:925076172143:web:aca48902ff473ad0418c9a',
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
