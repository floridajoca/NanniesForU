"use strict";
import { db } from "../firebase.js"
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

let Nannies = [];
let RatingStars;
const RatingActive = "fa-solid fa-star rating-active";
const RatingInactive = "fa-solid fa-star rating-inactive";

async function getNannies() {
    const nanniesList = query(collection(db, "user"), where("user_type", "==", "Nanny"));
    await getDocs(nanniesList).then(async (snapshot) => {
        const nannies = await getNannyExperience();
        snapshot.docs.forEach((doc) => {
            renderNanny(doc.id, doc.data(), nannies[doc.id]?.payrate || 0);
            Nannies.push(
                {
                    name: doc.data().full_name,
                    geolocation: {
                        lat: doc.data().location.lat,
                        lng: doc.data().location.lng,
                    }
                });
        });
        snapshot.docs.forEach((doc) => {
            document.getElementById(`${doc.id}`).addEventListener('click', () => {
                location.assign("#nannyprofiledetails");
                sessionStorage.setItem("selectedNanny", doc.id);
            }
            )
        });
    });
    addNannyMarkers();
}

async function getNannyExperience() {
    const snapshot = await getDocs(collection(db, "nanny"));
    let nanniesById = {};
    snapshot.docs.forEach((doc) => {
        nanniesById[doc.data().nanny_id] = doc.data();
    });
    return nanniesById;
}

function renderNanny(id, nanny, payrate) {
    document.querySelector(".nanny-profile-list-wrapper").innerHTML += `
        <div class="nanny-profile">
            <img src="${nanny.image}" alt="" class="profile-image">
            <h3>${nanny.full_name}</h3>  
            <p>Location: ${nanny.city}</p>
            <p>Pay rate:${payrate}</p>
            <ul id="${id}reviewsDisplay" class="reviewsDisplay">
                    <li class="rating1"><i class="fa-solid fa-star rating-inactive"></i></li>
                    <li class="rating2"><i class="fa-solid fa-star rating-inactive"></i></li>
                    <li class="rating3"><i class="fa-solid fa-star rating-inactive"></i></li>
                    <li class="rating4"><i class="fa-solid fa-star rating-inactive"></i></li>
                    <li class="rating5"><i class="fa-solid fa-star rating-inactive"></i></li>
                </ul>
            <button id="${id}" class="more-info">More info</button>
         </div>
        `
    let RatingCountDisplayID = document.getElementById(id + "reviewsDisplay");
    console.log(RatingCountDisplayID);
    RatingStars = [...RatingCountDisplayID.getElementsByClassName("fa-star")];
    renderRatings(nanny.ratings, RatingStars);
}

function renderRatings(ratings, RatingStars) {
    let starsDisplay = parseFloat(ratings.stars).toFixed(2);
    //let count=ratings.count;
    for (let i = 0; i < 5; i++) {
        if (i < parseInt(starsDisplay)) {
            RatingStars[i].className = RatingActive;
        }
        else {
            RatingStars[i].className = RatingInactive;
        }
    }
}

const currentUserLocation = JSON.parse(sessionStorage.getItem("location"));
console.log("here", JSON.stringify(JSON.parse(sessionStorage.getItem("location"))));
var currentUserSearchLocation = sessionStorage.getItem("searchPosition");

var setLocation;
setCurrentCenter();

function setCurrentCenter() {
    if (sessionStorage.getItem("searchPosition") != null) {
        currentUserSearchLocation = JSON.parse(sessionStorage.getItem("searchPosition"));
        setLocation = currentUserSearchLocation;
    }
    else {
        setLocation = currentUserLocation;
    }
}

let map = tt.map({
    key: API_KEY,
    container: 'map-div',
    center: setLocation,
    zoom: 12
});


const currentUserMarker = new tt.Marker().setLngLat(currentUserLocation).addTo(map);
const currentUserPopup = new tt.Popup({ anchor: 'top' }).setText('Me')
currentUserMarker.setPopup(currentUserPopup).togglePopup();

function addNannyMarkers() {
    Nannies.forEach(function (child) {
        const marker = new tt.Marker().setLngLat(child.geolocation).addTo(map);
        var popup2 = new tt.Popup({ anchor: 'top' }).setText(child.name)
        marker.setPopup(popup2).togglePopup();
    })
}

getNannies();
