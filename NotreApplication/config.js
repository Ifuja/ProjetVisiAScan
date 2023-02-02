import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    // API key sur le site firebase
}

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };