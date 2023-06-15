// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDfnAY2Y_kAaqWPasi_EApb_MJStOm5a-k",
    authDomain: "learnhub-a3bd7.firebaseapp.com",
    projectId: "learnhub-a3bd7",
    storageBucket: "learnhub-a3bd7.appspot.com",
    messagingSenderId: "423354683728",
    appId: "1:423354683728:web:c5e1ee1ed09169bee19c55",
    measurementId: "G-8S1TRQW4SS"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)