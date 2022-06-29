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

// .catch(err) {
//     console.log(err.message);
// }






let currentIndex = 0;

next.addEventListener('click', () => {


    if (currentIndex < user_array.length - 1) {

        currentIndex = currentIndex + 1;

    } else {
        currentIndex = 0;
    }
    nannyName.innerHTML = user_array[currentIndex].full_name;
    nannyLocation.innerHTML = user_array[currentIndex].city;

    nannyRate.innerHTML = user_array[currentIndex].pay_rate + ' $ per hour';

    // descriptionOutput.innerHTML = user_array[currentIndex].description;

    payRate.value = user_array[currentIndex].pay_rate;
    tax_5.value = "";
    tax_7.value = "";
    total.value = "";
    duration.value = "";







})

prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
    } else {
        currentIndex = user_array.length - 1;
    }
    nannyName.innerHTML = user_array[currentIndex].full_name;
    nannyLocation.innerHTML = user_array[currentIndex].city;

    nannyRate.innerHTML = user_array[currentIndex].pay_rate + ' per hour';

    payRate.value = user_array[currentIndex].pay_rate;

    tax_5.value = "";
    tax_7.value = "";
    total.value = "";
    duration.value = "";




    // descriptionOutput.innerHTML = user_array[currentIndex].description;
})





// -------------------- Rate Calculation -------------------

calculate.addEventListener('click', () => {

    const tx5 = duration.value * user_array[currentIndex].pay_rate * 5 / 100;
    const tx7 = duration.value * user_array[currentIndex].pay_rate * 7 / 100;
    const ttl = duration.value * user_array[currentIndex].pay_rate;

    tax_5.value = tx5;
    tax_7.value = tx7;
    total.value = (ttl + tx5 + tx7).toFixed(2);

    event.preventDefault();

})