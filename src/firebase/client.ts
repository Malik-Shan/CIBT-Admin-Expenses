import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB29g3vMJWT6mFWPsc8QeQL9obmaErVJAI",
  authDomain: "cibt-admin.firebaseapp.com",
  projectId: "cibt-admin",
  storageBucket: "cibt-admin.appspot.com",
  messagingSenderId: "726856839028",
  appId: "1:726856839028:web:05418e3d62f2bc5f760621"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
