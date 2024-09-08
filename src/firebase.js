// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD3uKHvlx5jwXe0Hqicn08nMvPCS5v2cW4",
    authDomain: "myportfolio-ef883.firebaseapp.com",
    databaseURL: "https://myportfolio-ef883-default-rtdb.firebaseio.com",
    projectId: "myportfolio-ef883",
    storageBucket: "myportfolio-ef883.appspot.com",
    messagingSenderId: "394188612629",
    appId: "1:394188612629:web:569ea83736c8c4eeb91a1c",
    measurementId: "G-NH2VNRSDFJ"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Database
const database = getDatabase(app);

// Optional: Initialize Firebase Analytics
getAnalytics(app);
export { app, database };

