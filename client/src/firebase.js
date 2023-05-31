import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6DsLIVEHiihqqf7CrciSkpl_kPThJdh0",
  authDomain: "notes-app-d6e87.firebaseapp.com",
  projectId: "notes-app-d6e87",
  storageBucket: "notes-app-d6e87.appspot.com",
  messagingSenderId: "853635016545",
  appId: "1:853635016545:web:a516c8ab73399819b54720",
  measurementId: "G-P3MDXD0V4D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
