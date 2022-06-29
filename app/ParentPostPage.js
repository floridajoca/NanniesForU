'use strict';
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";



const colRef = collection(db, 'events');

const event_array = [];
getDocs(colRef)
    .then((snapshot) => {

        let events = [];
        //console.log(snapshot.docs);

        snapshot.docs.forEach((doc) => {
            event_array.push({...doc.data(), id: doc.id });
        })

        console.log(event_array);
    })
    // .catch(err ()=> {
    //   console.log(err.message);
    // })






// let currentIndex = 0;

// next.addEventListener('click', () => {
//     if (currentIndex < event_array.length - 1) {

//         currentIndex = currentIndex + 1;

//     } else {
//         currentIndex = 0;
//     }
//     fetch_data();

// })

// prev.addEventListener('click', () => {
//     if (currentIndex > 0) {
//         currentIndex = currentIndex - 1;
//     } else {
//         currentIndex = event_array.length - 1;
//     }
//     fetch_data();
// })




// function fetch_data() {
//     reset_color();
//     parentNameOutput.innerHTML = event_array[currentIndex].parent_name;
//     locationOutput.innerHTML = event_array[currentIndex].location.latitude + ' "N ' + event_array[currentIndex].location.longitude + ' "W';
//     payRateOutput.innerHTML = event_array[currentIndex].pay_rate + ' $ per hour';
//     startDateOutput.innerHTML = event_array[currentIndex].start_date;
//     endDateOutput.innerHTML = event_array[currentIndex].end_date;
//     descriptionOutput.innerHTML = event_array[currentIndex].description;
//     //scheduleOutput.innerHTML=event_array[currentIndex].schedule;
//     let calendar_days = event_array[currentIndex].schedule;
//     console.log(calendar_days);
//     if (calendar_days != null) {
//         for (let day of calendar_days) {
//             console.log(day);
//             let day_id = document.getElementById("" + day.toLowerCase() + "");
//             console.log(day_id);
//             day_id.style.backgroundColor = "rgba(44, 171, 128, 1)";
//             day_id.style.color = "rgba(255, 255, 255, 1)";
//         }
//     }

// }

// function reset_color() {

//     var ul = document.getElementById("scheduleOutput");
//     var listItems = ul.getElementsByTagName("li");
//     for (let li of listItems) {
//         li.style.backgroundColor = "rgba(224, 224, 224, 1)";
//         li.style.color = "rgba(0, 0, 0, 1)";
//     }
// }