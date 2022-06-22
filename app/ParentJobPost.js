
'use strict';
import {db} from "../firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";



const colRef = collection(db, 'events');

const event_array= [];
getDocs(colRef)
.then((snapshot) => {
  
  let events = [];
  //console.log(snapshot.docs);

  snapshot.docs.forEach((doc)=>{
    event_array.push({ ...doc.data(), id: doc.id });
  })
  console.log(event_array);
})
// .catch(err ()=> {
//   console.log(err.message);
// })




parentNameOutput.innerHTML = "Jess"
locationOutput.innerHTML='Ontario';
scheduleOutput.innerHTML='MTWTFSS';
payRateOutput.innerHTML='35$ per hour';
startDateOutput.innerHTML='22-June-2022';
endDateOutput.innerHTML='31-Dec-2022';
descriptionOutput.innerHTML='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam deleniti cupiditate vero! Natus consequatur magnam ex autem illo neque quam!';

let currentIndex = 0;

next.addEventListener('click', () => {
  if(currentIndex<event_array.length-1){

  currentIndex = currentIndex+1;

  }
  else{
      currentIndex = 0;
  }
  parentNameOutput.innerHTML=event_array[currentIndex].parent_name;
  locationOutput.innerHTML=event_array[currentIndex].location.latitude + ' "N ' +event_array[currentIndex].location.longitude+ ' "W';
  scheduleOutput.innerHTML=event_array[currentIndex].schedule;
  payRateOutput.innerHTML=event_array[currentIndex].pay_rate + ' $ per hour';
  startDateOutput.innerHTML=event_array[currentIndex].start_date;
  endDateOutput.innerHTML=event_array[currentIndex].end_date;
  descriptionOutput.innerHTML=event_array[currentIndex].description;
})

prev.addEventListener('click', () => {
  if(currentIndex>0)
  {
   currentIndex = currentIndex-1;
  }
  else{
       currentIndex = event_array.length-1;
   }
   parentNameOutput.innerHTML=event_array[currentIndex].parent_name;
   locationOutput.innerHTML=event_array[currentIndex].location.latitude + ' "N ' +event_array[currentIndex].location.longitude+ ' "W';
   scheduleOutput.innerHTML=event_array[currentIndex].schedule;
   payRateOutput.innerHTML=event_array[currentIndex].pay_rate + ' per hour';
   startDateOutput.innerHTML=event_array[currentIndex].start_date;
   endDateOutput.innerHTML=event_array[currentIndex].end_date;
   descriptionOutput.innerHTML=event_array[currentIndex].description;
})
