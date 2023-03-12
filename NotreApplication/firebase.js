// Firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB1-jd6AYqKNjp1V0RnW1CnJi4FMPq7acY",
    authDomain: "user-5a95c.firebaseapp.com",
    projectId: "user-5a95c",
    storageBucket: "user-5a95c.appspot.com",
    messagingSenderId: "922703610991",
    appId: "1:922703610991:web:c21c8d7460f3f8a209799a",
    measurementId: "G-JH68RF6DQ0"
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };