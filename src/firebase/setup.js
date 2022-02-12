import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCnj_kZXWHc-3xrBGciaWREzPCBKA7uums",
  authDomain: "react-introduction-10f12.firebaseapp.com",
  databaseURL: "https://react-introduction-10f12-default-rtdb.firebaseio.com",
  projectId: "react-introduction-10f12",
  storageBucket: "react-introduction-10f12.appspot.com",
  messagingSenderId: "803538879175",
  appId: "1:803538879175:web:22f438e8440656b1c034e2",
  measurementId: "G-S7868KEEWJ"
};

export const app = initializeApp(firebaseConfig);
