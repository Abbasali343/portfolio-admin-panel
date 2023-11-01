import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDxIX2RioW57jy5W7z7LeEud62Q3Eq1gaE",
  authDomain: "portfolio-23a34.firebaseapp.com",
  databaseURL: "https://portfolio-23a34-default-rtdb.firebaseio.com",
  projectId: "portfolio-23a34",
  storageBucket: "portfolio-23a34.appspot.com",
  messagingSenderId: "545884626489",
  appId: "1:545884626489:web:7c709a03a129a5849677e8"
};


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);