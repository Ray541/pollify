import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7BMR9U5xOKsOXh95Rh3A1KqYgTi2reOs",
  authDomain: "polling-website-1493c.firebaseapp.com",
  projectId: "polling-website-1493c",
  storageBucket: "polling-website-1493c.appspot.com",
  messagingSenderId: "217148584136",
  appId: "1:217148584136:web:523f5da4dfbd2c79d1b5fd",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
