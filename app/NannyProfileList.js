"use strict";
import {db} from "../firebase.js"
import {collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

let Nannies = [];

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
                    lat: doc.data().location.latitude,
                    lng: doc.data().location.longitude,
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
            <img src="https://picsum.photos/40/40" alt="" class="profile-image">
            <p>${nanny.full_name}</p>  
            <p>Location: ${nanny.city}</p>
            <p>Pay rate:${payrate}</p>
            <p>ratings:</p>
            <button id="${id}" class="more-info">More info</button>
         </div>
        `
}

const currentUserLocation = JSON.parse(sessionStorage.getItem("location"));

let map = tt.map({
    key: API_KEY,
    container: 'map-div',
    center: currentUserLocation,
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
})}

getNannies();
