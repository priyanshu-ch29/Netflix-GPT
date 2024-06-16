// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSXfIu6jroxv4xZnxb-0ffOxbgKlw5sxw",
  authDomain: "netflixgpt-a15af.firebaseapp.com",
  projectId: "netflixgpt-a15af",
  storageBucket: "netflixgpt-a15af.appspot.com",
  messagingSenderId: "745492032575",
  appId: "1:745492032575:web:bc875fb5ff2b577e699c8a",
  measurementId: "G-34KQXGJQ9R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
