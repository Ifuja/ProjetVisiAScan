import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence
} from 'firebase/auth/react-native';

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };