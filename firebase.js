import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBv5fr52TAXHGSwsDRFOkpReE8pA4bHzTg",
    authDomain: "nanniesforu-df4ef.firebaseapp.com",
    projectId: "nanniesforu-df4ef",
    storageBucket: "nanniesforu-df4ef.appspot.com",
    messagingSenderId: "441149930025",
    appId: "1:441149930025:web:e7259bb612343b961aba38",
    measurementId: "G-Q9XLFLW70P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db =  getFirestore(app);

