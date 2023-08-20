import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  GoogleAuthProvider
} from 'firebase/auth/react-native';
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Replace this with your Firebase SDK config snippet
const firebaseConfig = {
    apiKey: "AIzaSyB1-jd6AYqKNjp1V0RnW1CnJi4FMPq7acY",
    authDomain: "user-5a95c.firebaseapp.com",
    projectId: "user-5a95c",
    storageBucket: "user-5a95c.appspot.com",
    messagingSenderId: "922703610991",
    appId: "1:922703610991:android:90c76c5564dca85809799a",
    measurementId: "G-JH68RF6DQ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Storage
export const storage = getStorage(app);
export const storageMovie = getStorage(app);

// Use Storage
export const reference = ref(storage, '/pictures/couleurs.jpg');
export const referenceMovie = ref(storageMovie, '/movies/Sade.mp4');

// Initialize db
const db = getFirestore(app);

// Initialize provider
export const provider = new GoogleAuthProvider(app);

export default { db };