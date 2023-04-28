// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXbwTxJLlVy9HG4ylfv8IF8wxgMVK5sMo",
  authDomain: "teorema-de-pick.firebaseapp.com",
  projectId: "teorema-de-pick",
  storageBucket: "teorema-de-pick.appspot.com",
  messagingSenderId: "610279028409",
  appId: "1:610279028409:web:8ce858bb9fa9dfcd9e0d68",
  measurementId: "G-50BMG71E75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
