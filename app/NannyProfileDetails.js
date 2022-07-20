'use strict';
import { db } from "../firebase.js";
import { collection,getDocs, getDoc, doc, query } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


let  NannyProfileDetails = {};

window.onload = async function getNannyDetails(nannyId) {
    await getDoc(doc(db, "user", "BYtcnnXnKKpMZ4dPMZpE")).then((doc) => {
            NannyProfileDetails = doc.data();
            console.log("her" + NannyProfileDetails)
    });


    const nannyExperience = query(collection(db, "nanny"));
    await getDocs(nannyExperience).then((snapshot) => {
        snapshot.forEach((doc) => {
            if(doc.data().nanny_id == "BYtcnnXnKKpMZ4dPMZpE") {
                NannyProfileDetails = {
                    ...NannyProfileDetails,
                    ...doc.data(),
                }
            }
        });
    });

    renderNannyDetails(NannyProfileDetails);
    console.log(NannyProfileDetails)
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
