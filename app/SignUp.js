'use strict';
import {collection, addDoc} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
import {db} from "../firebase.js";

let firstName;
let lastName;
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
    firstName = document.getElementById("fname").value;
    lastName = document.getElementById("lname").value;
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

    //  if (!firstName ) {
    //      alert("Firstname is required.");
    //  } else if (firstName === " ") {
    //      alert("Firstname should not be empty");
    // } else if (!lastName ) {
    //      alert("Lastname is required.");
    //  } else if (email === " ") {
    //      alert("Lastname should not be empty");
    //  } else if (!lastName ) {
    //      alert("Lastname is required.");
    //  } else if (lastName === " ") {
    //      alert("Lastname should not be empty");
    //  }
}

function init() {
    const signup = document.getElementById("register");
    signup.addEventListener("click", async (e) => {
        e.preventDefault();
        validateInput();
        try {
            const docRef = await addDoc(collection(db, "user"), {
                first_name: firstName,
                last_name: lastName,
                contact: phoneNumber,
                email: email,
                password,
                confirm_password: confirmPassword,
                zip_code: zipCode,
                city,
                state,
                country,
                user_type: userType,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            alert(e)
        }

    });
}

init();
