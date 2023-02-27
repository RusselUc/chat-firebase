import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDFNhEEJYejeLyQBoGmkuayZcuSAtRojEA",
  authDomain: "chat-61321.firebaseapp.com",
  projectId: "chat-61321",
  storageBucket: "chat-61321.appspot.com",
  messagingSenderId: "336186964018",
  appId: "1:336186964018:web:41cb722b8fa0e7b1bd242b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()