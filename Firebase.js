import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
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

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;