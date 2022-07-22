'use strict';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
import { db } from "../firebase.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";
import {isEmailValid} from "./utils/email.js";
import {isPasswordSecure} from "./utils/password.js";
import { isValidPostalCode}  from "./utils/postalCode.js"

let fullName;
let email;
let phoneNumber;
let password;
let confirmPassword;
let zipCode;
let address;
let city;
let state;
let country;
let userType;

function validateInput() {
    fullName = document.getElementById("fname").value;
    email = document.getElementById("email").value;
    phoneNumber = document.getElementById("phone number").value;
    password = document.getElementById("password").value;
    confirmPassword = document.getElementById("confirm password").value;
    zipCode = document.getElementById("zip-code").value;
    address = document.getElementById("address").value;
    city = document.getElementById("city").value;
    state = document.getElementById("state").value;
    country = document.getElementById("country").value;
    userType = document.querySelector('input[name="user type"]:checked').value;

    if(!fullName || fullName === "") {
        alert("Full name is required.");
        return false;
    } else if (!isEmailValid(email) || !email || email === "") {
        alert("Email is required.")
        return false;
    } else if (!phoneNumber || phoneNumber === "") {
        alert("Phone number is required");
        return false;
    } else if (!password || password === "" || !isPasswordSecure(password)) {
        alert("Password is required and should not be empty!");
        return false;
    } else if (password !== confirmPassword) {
        alert("Password and confirm password should match.");
        return false;
    } else if (!zipCode || zipCode === "" || !isValidPostalCode(zipCode)) {
        alert("Zipcode is required.");
        return false;
    } else if (!userType) {
        alert("You should choose if you want to register as a parent and as a nanny.");
        return false;
    } else {
        return true;
    }

}

function init() {
    const signup = document.getElementById("register");
    signup.addEventListener("click", async (e) => {
        e.preventDefault();
        if(validateInput()) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password).then(async () => {
              const docRef =  await addDoc(collection(db, "user"), {
                    full_name: fullName,
                    contact: phoneNumber,
                    email: email,
                    password: password,
                    confirm_password: password,
                    zip_code: zipCode,
                    city,
                    state,
                    country,
                    user_type: userType,
                });
                location.replace("#login");
                console.log("Document written with ID: ", docRef.id);
                console.log(docRef.data());
            }).catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        } else {
            const error = document.getElementById("error-output");
            error.innerHTML = "Registration failed! Try again!";
        }
    });
}

init();
