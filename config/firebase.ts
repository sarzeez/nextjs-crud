import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBcoXRs5fQBSjRimg0CSzvb_7IbbsMeApY",
  authDomain: "nextjs-crud-cca8f.firebaseapp.com",
  projectId: "nextjs-crud-cca8f",
  storageBucket: "nextjs-crud-cca8f.appspot.com",
  messagingSenderId: "827924922932",
  appId: "1:827924922932:web:54b7036b75cb3059a0c061"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth()