
'use strict';
import {db} from "../firebase.js";
import { query, where, collection, documentId, getDocs, doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";
//import { getFirestore } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

const colRef = collection(db, 'events');
let currentIndex = 0;
const event_array= [];
let RatingStars = [...document.getElementsByClassName("fa-star")];;
const RatingActive= "fa-solid fa-star rating-active";
const RatingInactive= "fa-solid fa-star rating-inactive";
let parent_details;
const submitRatings= document.getElementById('submitRatings');
const cancelRatings= document.getElementById('cancelRatings');
let index=0;
let stars;
let count;
let flagRatingsChecked=false;
let ratingHistory=false;
let parentID;
index = 0;
stars = 0;
count = 0;
flagRatingsChecked=false;
ratingHistory=false;
parentID  = null;


submitRatings.addEventListener('click', () => {
 
  
  if(ratingHistory==false){
    if(flagRatingsChecked==true)
    {
      calculateRating();
      //fetch_data();
      displayRating();
      ratingHistory = true;
    }
    else
    {
      alert('select rating');
    }
  }
  else{
    alert("Your rating for this user is already saved");
  }
  
});

cancelRatings.addEventListener('click', () => {
  
  displayRating();
});


getDocs(colRef).then((snapshot) => {
    let events = [];
    snapshot.docs.forEach((doc)=>{
    event_array.push({ ...doc.data(), id: doc.id });
  })
  //console.log(event_array);
  fetch_data();
})
.catch( (err)=> {
  console.log(err.message);
})



next.addEventListener('click', () => {
  if(currentIndex < event_array.length-1)
  {
    currentIndex = currentIndex+1;
  }
  else{
    currentIndex = 0;
  }
  fetch_data();
})

prev.addEventListener('click', () => {
  if(currentIndex>0)
  {
   currentIndex = currentIndex-1;
  }
  else{
       currentIndex = event_array.length-1;
   }
   fetch_data();
   
})

function fetch_data() {
  
  // parent_details = null;
  reset_color();
  ratingHistory = false; //reset rating history flag on new profile load
  check_ratings(RatingStars);

  parentID = event_array[currentIndex].parent_id;
  get_user_details(parentID);
  console.log(parent_details);
  parentNameOutput.innerHTML=parent_details.full_name;
  stars = parent_details.ratings.stars;
  count = parent_details.ratings.count;
  
  locationOutput.innerHTML=event_array[currentIndex].location.latitude + ' "N ' + event_array[currentIndex].location.longitude+ ' "W';
  payRateOutput.innerHTML=event_array[currentIndex].pay_rate + ' $ per hour';
  startDateOutput.innerHTML=event_array[currentIndex].start_date;
  endDateOutput.innerHTML=event_array[currentIndex].end_date;
  descriptionOutput.innerHTML=event_array[currentIndex].description;
  let calendar_days= event_array[currentIndex].schedule;
  displayRating();
  if(calendar_days!=null)
  {
    for(let day of calendar_days)
    {
      let day_id= document.getElementById(""+day.toLowerCase()+"");
      day_id.style.backgroundColor = "rgba(44, 171, 128, 1)";
      day_id.style.color = "rgba(255, 255, 255, 1)";
    }
  }
  
  
}



function check_ratings(RatingStars)
{
  RatingStars.map((star) => {
    star.onclick = () => {
      index = RatingStars.indexOf(star);
      console.log(index);
      submitRatings.style.display='block';
      cancelRatings.style.display='block';
      ratingCountDisplay.style.display='none';
      if(star.className == RatingInactive)
        {
            for (let i = 0; i <=index; i++) 
            RatingStars[i].className = RatingActive;
            flagRatingsChecked = true;
            //calculateRating(index);
        }
      else{
          for (let i = 0; i <=4; i++) 
          RatingStars[i].className = RatingInactive;
          flagRatingsChecked = false;
        }
      console.log(flagRatingsChecked);   
    }
  });
}


async function get_user_details(parentID){
  
  const ParentQuery = query(collection(db, "user"), where(documentId(), "==", parentID));
  const querySnapshot2 = await getDocs(ParentQuery);
  querySnapshot2.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());
      parent_details = doc.data();
    });
  // console.log(parent_details);
}

function calculateRating(){

 
  console.log(stars);
  console.log(count);

  stars = ((stars*count+(index+1))/(count+1)).toFixed(4);
  count = count + 1;
  console.log(stars);
  console.log(count);
  setData(count, stars);
}


async function setData(setCount, setStars){
  const setRatings = doc(db, "user", parentID);

  await updateDoc(setRatings, {ratings:
    {
    stars : setStars,
    count : setCount,
    }})
    .then(function() 
    {
    console.log("Ratings updated");
    })
    .catch(()=> {
      console.log("Ratings not updated");
    });
}

function displayRating(){
  submitRatings.style.display='none';
  cancelRatings.style.display='none';
  ratingCountDisplay.style.display='inline-block';
  let starsDisplay = parseFloat(stars).toFixed(2);
  ratingCountDisplay.innerHTML= starsDisplay +' ratings by '+count+' users';
    for (let i = 0; i<5; i++)
    {
      if(i<parseInt(starsDisplay))
        RatingStars[i].className = RatingActive;
      else
        RatingStars[i].className = RatingInactive;
    }
}

function reset_color(){
  var ul = document.getElementById("scheduleOutput");
  var listItems = ul.getElementsByTagName("li");
  for(let li of  listItems){
      li.style.backgroundColor = "rgba(224, 224, 224, 1)";
      li.style.color = "rgba(0, 0, 0, 1)";
    }
  for (let i = 0; i <5; i++) 
    RatingStars[i].className = RatingInactive;
}


