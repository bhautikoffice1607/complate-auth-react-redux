import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDQQEyTNuN9q57LzpiaKORhAO3l5GKKHnk",
    authDomain: "complete-auth-2915e.firebaseapp.com",
    projectId: "complete-auth-2915e",
    storageBucket: "complete-auth-2915e.appspot.com",
    messagingSenderId: "999392384569",
    appId: "1:999392384569:web:9059b836b023ec4aad5fe8",
    measurementId: "G-9PT9TX3TNW"
};

// firebase.initializeApp(config);
// firebase.firestore();

// export default firebase;

const fire = firebase.initializeApp(firebaseConfig);

export default fire;
