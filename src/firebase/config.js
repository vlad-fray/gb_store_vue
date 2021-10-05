import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDJ8C-bKwo69DlhWp7E1P-GWG2QmKBcdus',
  authDomain: 'burger-store-36fe4.firebaseapp.com',
  projectId: 'burger-store-36fe4',
  storageBucket: 'burger-store-36fe4.appspot.com',
  messagingSenderId: '69253542657',
  appId: '1:69253542657:web:fb17205698978dd5416100',
  measurementId: 'G-9ZFRX8V215',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
// const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// init timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectFirestore, projectStorage, timestamp };
