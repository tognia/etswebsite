// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCMpx-4V9fSkamY470HIzcaIzqm4M1eVKw",
  authDomain: "shiny-e5b1f.firebaseapp.com",
  projectId: "shiny-e5b1f",
  storageBucket: "shiny-e5b1f.firebasestorage.app",
  messagingSenderId: "1084688554990",
  appId: "1:1084688554990:web:037ac36003ab37827dccff"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);