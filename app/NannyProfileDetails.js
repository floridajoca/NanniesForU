'use strict';
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
const colRef = collection(db, 'user');

const user_array = [];
getDocs(colRef)
    .then((snapshot) => {

        let user_array1 = [];
        //console.log(snapshot.docs);

        snapshot.docs.forEach((doc) => {
            user_array.push({...doc.data(), id: doc.id });
        })
        console.log(user_array);

    })


let currentIndex = 0;

next.addEventListener('click', () => {


    if (currentIndex < user_array.length - 1) {

        currentIndex = currentIndex + 1;

    } else {
        currentIndex = 0;
    }
    fetch_data();


})

prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
    } else {
        currentIndex = user_array.length - 1;
    }
    fetch_data();


})

// ---------------------- Color ---------------

function fetch_data() {
    reset_color();
    nannyName.innerHTML = user_array[currentIndex].full_name;
    nannyLocation.innerHTML = user_array[currentIndex].city;
    nannyRate.innerHTML = user_array[currentIndex].pay_rate + ' $ per hour';
    nannyDescription.innerHTML = user_array[currentIndex].description;
    payRate.value = user_array[currentIndex].pay_rate;

    // tax_5.value = "";
    // tax_7.value = "";
    total.value = "";
    duration.value = "";
    let calendar_days = user_array[currentIndex].schedule;
    console.log(calendar_days);
    if (calendar_days != null) {
        for (let day of calendar_days) {
            console.log(day);
            let day_id = document.getElementById("" + day.toLowerCase() + "");
            console.log(day_id);
            day_id.style.backgroundColor = "rgba(44, 171, 128, 1)";
            day_id.style.color = "rgba(255, 255, 255, 1)";
        }
    }

}

function reset_color() {

    var ul = document.getElementById("scheduleOutput");
    var listItems = ul.getElementsByTagName("li");
    for (let li of listItems) {
        li.style.backgroundColor = "rgba(224, 224, 224, 1)";
        li.style.color = "rgba(0, 0, 0, 1)";
    }
}
// -------------------- Rate Calculation -------------------

calculate.addEventListener('click', () => {

    const tx5 = duration.value * user_array[currentIndex].pay_rate * 5 / 100;
    const tx7 = duration.value * user_array[currentIndex].pay_rate * 7 / 100;
    const ttl = duration.value * user_array[currentIndex].pay_rate;

    // tax_5.value = tx5;
    // tax_7.value = tx7;
    total.value = (ttl + tx5 + tx7).toFixed(2);

    event.preventDefault();

})