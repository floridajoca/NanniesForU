// 'use strict';
// import { db } from "../firebase.js";
// import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";



// const colRef = collection(db, 'user');

// const user_array = [];
// getDocs(colRef)
//     .then((snapshot) => {

//         let events = [];
//         //console.log(snapshot.docs);

//         snapshot.docs.forEach((doc) => {

//             user_array.push({...doc.data(), id: doc.id });
//             console.log(JSON.stringify(doc));
//             // let currentIndex = 2;

//             // pname.innerHTML = doc.data().full_name;
//             // console.log(doc.data().full_name);


//             mainContent.innerHTML = `<div class="parent-image"><img src="https://picsum.photos/800/800?rand=111" alt="parent-image"></div>
//         <div class="parent-desc">
//             <h4 class="name" id="pname">${doc.data().full_name}</h4>
//             <div class="for-section">
//                 <p>For:</p>
//                 <p> ${doc.data().child}</p>
//             </div>

//             <div class="avail-section">
//                 <p>When:</p>
//                 <ul id="scheduleOutput" class="schedule-display">
//                     <li id="sunday">S</li>
//                     <li id="monday">M</li>
//                     <li id="tuesday">T</li>
//                     <li id="wednesday">W</li>
//                     <li id="thursday">T</li>
//                     <li id="friday">F</li>
//                     <li id="saturday">S</li>
//                 </ul>
//             </div>
//             <div class="pay-section">
//                 <p>Pay Rate:</p>
//                 <p id="pay"> ${doc.data().pay_rate}</p>
//             </div>



//         </div>`

//             reset_color();
//             let calendar_days = doc.data().schedule;
//             console.log(calendar_days);
//             if (calendar_days != null) {
//                 for (let day of calendar_days) {
//                     console.log(day);
//                     let day_id = document.getElementById("" + day.toLowerCase() + "");
//                     console.log(day_id);
//                     day_id.style.backgroundColor = "rgba(44, 171, 128, 1)";
//                     day_id.style.color = "rgba(255, 255, 255, 1)";
//                 }
//             }


//         })

//         function reset_color() {

//             var ul = document.getElementById("scheduleOutput");
//             var listItems = ul.getElementsByTagName("li");
//             for (let li of listItems) {
//                 li.style.backgroundColor = "rgba(224, 224, 224, 1)";
//                 li.style.color = "rgba(0, 0, 0, 1)";
//             }
//         }



//     })

// .catch(err ()=> {
//   console.log(err.message);
// })





//  new codeeeee-------


"use strict";
import { db } from "../firebase.js"
import { collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";



window.onload = async function getParentExperience() {
    console.log("hello");
    const parentExperience = collection(db, "nanny");
    await getDocs(parentExperience).then((snapshot) => {
        snapshot.forEach((doc) => {
            console.log(doc.id, "=>", JSON.stringify(doc.data()));
        });
    })
}

function renderParent(parent, id) {

    console.log("hello");
    document.querySelector(".main-container").innerHTML += `
    <div class="parent-image"><img src="https://picsum.photos/800/800?rand=111" alt="parent-image"></div>
        <div class="parent-desc">
            <h4 class="name" id="pname">${parent.full_name}</h4>
            <div class="for-section">
                <p>For:</p>
                <p> </p>
            </div>

            <div class="avail-section">
                <p>When:</p>
                <ul id="scheduleOutput" class="schedule-display">
                    <li id="sunday">S</li>
                    <li id="monday">M</li>
                    <li id="tuesday">T</li>
                    <li id="wednesday">W</li>
                    <li id="thursday">T</li>
                    <li id="friday">F</li>
                    <li id="saturday">S</li>
                </ul>
            </div>
            <div class="pay-section">
                <p>Pay Rate:</p>
                <p id="pay"> ${parent.pay_rate}</p>
            </div>



        </div>
        
        `
        // reset_color();
        // let calendar_days = doc.data().schedule;
        // console.log(calendar_days);
        // if (calendar_days != null) {
        //     for (let day of calendar_days) {
        //         console.log(day);
        //         let day_id = document.getElementById("" + day.toLowerCase() + "");
        //         console.log(day_id);
        //         day_id.style.backgroundColor = "rgba(44, 171, 128, 1)";
        //         day_id.style.color = "rgba(255, 255, 255, 1)";
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
}

window.onload = async function getParent() {
    console.log("hello");
    const parentList = query(collection(db, "user"), where("user_type", "==", "Parent"));
    await getDocs(parentList).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            const parent = doc.data();
            renderParent(parent, doc.id);
        });
        snapshot.docs.forEach((doc) => {
            document.querySelector(`#${doc.id}`).addEventListener('click', () => alert(doc.id))
        });
    });

    await getParentExperience();
}