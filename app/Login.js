import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
import { db } from "../firebase.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import { query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const auth = getAuth();
const loginButton = document.getElementById('login-button');
let emailId;
let userPassword;

loginButton.addEventListener("click",  (e) =>{
    e.preventDefault();
    userPassword=document.getElementById('password').value;
    emailId=document.getElementById('email').value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, emailId, userPassword)
        .then(async(userCredential) =>
        {
            signIn(userCredential);
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        });
});

async function signIn(userCredential){
            const user= userCredential.user;
            let userID;
            let userDetails;
            const q = query(collection(db, "user"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            userID = doc.id;
            userDetails = doc.data();
            console.log(doc.id, " => ", doc.data());
            });
            sessionStorage.setItem('email', user.email);
            sessionStorage.setItem('LoginId', user.uid);
            sessionStorage.setItem('UserId', userID);
            sessionStorage.setItem('User_Type', userDetails.user_type);
            sessionStorage.setItem('location', JSON.stringify(userDetails.location));
            location.replace("#home");
            location.reload();
}




