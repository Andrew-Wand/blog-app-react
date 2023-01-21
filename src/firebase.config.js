// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSC60YTV4-hGMh9V_M7K_vBZZR0jOdmBg",

  authDomain: "blog-app-411df.firebaseapp.com",

  projectId: "blog-app-411df",

  storageBucket: "blog-app-411df.appspot.com",

  messagingSenderId: "15501864114",

  appId: "1:15501864114:web:b2a16b01daaffcf14eadab",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
