import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyBYt_BW2MAeLT0zOP8wioZ1upM7qTsgsCw",
    authDomain: "echo-panda-auth.firebaseapp.com",
    projectId: "echo-panda-auth",
    storageBucket: "echo-panda-auth.firebasestorage.app",
    messagingSenderId: "391590449195",
    appId: "1:391590449195:web:05dcf7ab4b8d51ab991a6e",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
