// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEGh4iTnMSOhojxuUSjY6aaSrUYNXeEDI",
  authDomain: "newone-370b4.firebaseapp.com",
  projectId: "newone-370b4",
  storageBucket: "newone-370b4.appspot.com",
  messagingSenderId: "603390698166",
  appId: "1:603390698166:web:3796573ff802a9afeb7c17",
  measurementId: "G-76QPQZVBQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
