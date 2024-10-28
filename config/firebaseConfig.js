// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, //"AIzaSyAs-bhImYt9stqm4tqezlN4VOyCtsmhyWY",
  authDomain: "ai-room-redesign-be7fa.firebaseapp.com",
  projectId: "ai-room-redesign-be7fa",
  storageBucket: "ai-room-redesign-be7fa.appspot.com",
  messagingSenderId: "288378069785",
  appId: "1:288378069785:web:fa931d06cbfe93e92c5b88",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
