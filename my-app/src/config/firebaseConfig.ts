import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCdH_Y6ubkcqECLsWJ-DBAyYA7FtqggRRw",
  authDomain: "projeto-1-c7102.firebaseapp.com",
  projectId: "projeto-1-c7102",
  storageBucket: "projeto-1-c7102.firebasestorage.app",
  messagingSenderId: "258440549920",
  appId: "1:258440549920:web:ea182279835b120ac3ce45",
  measurementId: "G-VDKY79HFDL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
