import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1-jd6AYqKNjp1V0RnW1CnJi4FMPq7acY",
  authDomain: "user-5a95c.firebaseapp.com",
  projectId: "user-5a95c",
  storageBucket: "user-5a95c.appspot.com",
  messagingSenderId: "922703610991",
  appId: "1:922703610991:web:2e3c5d8f23ddc2c409799a",
  measurementId: "G-FMJNMD1YRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);