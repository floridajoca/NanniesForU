'use strict';
import { db } from "../firebase.js";
import { collection,getDocs, getDoc, doc, query } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

let  NannyProfileDetails = {};

const selectedNannyId = sessionStorage.getItem("selectedNanny");

function getNannyDetails() {
    console.log("Selected nanny" + selectedNannyId)
    getDoc(doc(db, "user", selectedNannyId)).then((doc) => {
        NannyProfileDetails = doc.data();
        const nannyExperience = query(collection(db, "nanny"));
         getDocs(nannyExperience).then( (snapshot) => {
             snapshot.forEach((doc) => {
                if(doc.data().nanny_id === selectedNannyId) {
                    NannyProfileDetails = {
                        ...NannyProfileDetails,
                        ...doc.data(),
                    }
                }
            });
            renderNannyDetails();
        });
    });
}

function renderNannyDetails() {
    const nannyName = document.querySelector("#nanny-name");
    const nannyLocation = document.querySelector("#nanny-location");
    const nannyDescription = document.querySelector("#nanny-description");
    const nannyRate = document.querySelector("#nanny-rate");
    const nannyAvailability =  document.querySelector("#nanny-availability");
    const nannyReviews =  document.querySelector("#nanny-reviews");

    nannyName.innerHTML += NannyProfileDetails.full_name;
    nannyLocation.innerHTML += NannyProfileDetails.city;
    nannyDescription.innerHTML += NannyProfileDetails.description ? NannyProfileDetails.description : "";
    nannyRate.innerHTML += NannyProfileDetails.payrate;
    nannyAvailability.innerHTML += NannyProfileDetails.schedule;
    nannyReviews.innerHTML += NannyProfileDetails.ratings;
}

getNannyDetails();

const contact = document.querySelector("#contactBtn");
contact.addEventListener("click", () => {
    if(!sessionStorage.getItem('LoginId')) {
        alert("You should be logged in to see contact information.");
    } else {
        console.log("here" + JSON.stringify(NannyProfileDetails))
        const contactWrapper = document.querySelector(".contact-info");
            contactWrapper.innerHTML += `
            <ul>
                <li>
                    ${NannyProfileDetails.email}
                </li>
                <li>
                    ${NannyProfileDetails.contact}
                </li>
            </ul>`;
    }
});
