// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use

const env = import.meta.env;

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: env.API_KEY,
    authDomain: env.AUTH_DOMAIN,
    projectId: env.PROJECT_ID,
    storageBucket: env.STORAGE_BUCKET,
    messagingSenderId: env.MASSAGING_SENDER_ID,
    appId: env.APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);