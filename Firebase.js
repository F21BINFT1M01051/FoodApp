// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCq1aLzHPY4i9AdMl59hRG2O-OKlxyUOEw",
  authDomain: "food-app-8cb54.firebaseapp.com",
  projectId: "food-app-8cb54",
  storageBucket: "food-app-8cb54.appspot.com",
  messagingSenderId: "522380942024",
  appId: "1:522380942024:web:bf6985c63caeff096823fd",
  measurementId: "G-XLBW12TZ4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;