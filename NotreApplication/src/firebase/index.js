import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref as dbRef } from "firebase/database";
import { getAuth } from 'firebase/auth/react-native';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1-jd6AYqKNjp1V0RnW1CnJi4FMPq7acY",
    authDomain: "user-5a95c.firebaseapp.com",
    projectId: "user-5a95c",
    storageBucket: "user-5a95c.appspot.com",
    messagingSenderId: "922703610991",
    appId: "1:922703610991:android:90c76c5564dca85809799a",
    measurementId: "G-JH68RF6DQ0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Initialize Storage
const storage = getStorage(app);
const storageMovie = getStorage(app, 'gs://user-5a95c.appspot.com');

// Use Storage
const reference = ref(storage, '/pictures/couleurs.jpg');
const referenceMovie = ref(storageMovie, '/movies/Sade.mp4');

// Initialize Database
const database = getDatabase(app, 'https://user-5a95c-default-rtdb.europe-west1.firebasedatabase.app');

// Use Database
const refDatabase = dbRef(database, 'my/position/to/value');

// Initialize Firestore
const db = getFirestore(app);

export {
  reference,
  referenceMovie,
  database,
  refDatabase,
  auth
};