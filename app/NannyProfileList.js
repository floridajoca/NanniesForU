"use strict";
import {db} from "../firebase.js"
import {collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";


window.onload = async function getNannyExperience() {
    const nannyExperience = collection(db, "nanny");
    await getDocs(nannyExperience).then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, "=>", JSON.stringify(doc.data()));
        });
    })
}

function renderNanny(nanny, id) {
    document.querySelector(".nanny-profile-list-wrapper").innerHTML += `
        <div class="nanny-profile">
            <img src="https://picsum.photos/40/40" alt="" class="profile-image">
            <p>${nanny.full_name}</p>  
            <p>Location: ${nanny.city}</p>
            <p>Pay rate:${nanny.pay_rate}</p>
            <p>ratings:</p>
            <button id="${id}" class="more-info">More info</button>
         </div>
        `
}

window.onload = async function getNanny() {
    const nanniesList = query(collection(db, "user"), where("user_type", "==", "Nanny"));
    await getDocs(nanniesList).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            const nanny = doc.data();
            renderNanny(nanny, doc.id);
        });
        snapshot.docs.forEach((doc) => {
            document.querySelector(`#${doc.id}`).addEventListener('click', () => {
                if(!sessionStorage.getItem('LoginId')) {
                    alert("you should be logged in to learn more!");
                } else {
                    location.replace("#nannyprofiledetails");
                }
                }
            )
        });
    });

    await getNannyExperience();
}
