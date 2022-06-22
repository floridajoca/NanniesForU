'use strict';
import { db } from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";



const colRef = collection(db, 'user');

const user_array = [];
getDocs(colRef)
    .then((snapshot) => {

        let user_array = [];
        //console.log(snapshot.docs);

        snapshot.docs.forEach((doc) => {
            user_array.push({...doc.data(), id: doc.id });
        })
        console.log(user_array);
    })
    // .catch(err) {
    //     console.log(err.message);
    // }




// nannyName.innerHTML = "Jess"
// nannyLocation.innerHTML = 'Ontario';
// scheduleOutput.innerHTML = 'MTWTFSS';
// nannyRate.innerHTML = '35$ per hour';
// startDateOutput.innerHTML = '22-June-2022';
// endDateOutput.innerHTML = '31-Dec-2022';
// descriptionOutput.innerHTML = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam deleniti cupiditate vero! Natus consequatur magnam ex autem illo neque quam!';

let currentIndex = 0;

next.addEventListener('click', () => {
    alert("yes");
    if (currentIndex < user_array.length - 1) {

        currentIndex = currentIndex + 1;

    } else {
        currentIndex = 0;
    }
    nannyName.innerHTML = user_array[currentIndex].first_name;
    nannyLocation.innerHTML = user_array[currentIndex].city;

    nannyRate.innerHTML = user_array[currentIndex].pay_rate + ' $ per hour';

    // descriptionOutput.innerHTML = user_array[currentIndex].description;

})

prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex = currentIndex - 1;
    } else {
        currentIndex = user_array.length - 1;
    }
    nannyName.innerHTML = user_array[currentIndex].first_name;
    nannyLocation.innerHTML = user_array[currentIndex].city

    nannyRate.innerHTML = user_array[currentIndex].pay_rate + ' per hour';

    // descriptionOutput.innerHTML = user_array[currentIndex].description;
})