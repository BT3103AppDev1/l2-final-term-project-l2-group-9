
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9vuIi1DZhbAYg4R8QQpC6JvRvuXzWftE",
    authDomain: "inturn-d9b53.firebaseapp.com",
    projectId: "inturn-d9b53",
    storageBucket: "inturn-d9b53.appspot.com",
    messagingSenderId: "1074015507217",
    appId: "1:1074015507217:web:a818768f7c0d784ca172b0",
    measurementId: "G-RHVWP7GREH",
  }

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;