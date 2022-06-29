import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

const auth = getAuth();
 

const loginButton = document.getElementById('login-button');

let email;
let password;

loginButton.addEventListener("click", (e) =>{
    e.preventDefault();
    password=document.getElementById('password1').value;
    email=document.getElementById('email1').value;
    console.log(password);
    console.log(email);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert('successful login');
// ...
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    });

});


