'use strict';
import { db } from "../firebase.js";
import { collection,getDocs, getDoc, doc, query,updateDoc } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-firestore.js";

let  NannyProfileDetails = {};

const selectedNannyId = sessionStorage.getItem("selectedNanny");

let RatingStars = [...document.getElementsByClassName("fa-star")];
const RatingActive= "fa-solid fa-star rating-active";
const RatingInactive= "fa-solid fa-star rating-inactive";
const submitRatings= document.getElementById('submitRatings');
const cancelRatings= document.getElementById('cancelRatings');
let index=0; //RatingIndex
let stars;
let count;
let flagRatingsChecked=false;
let ratingHistory=false;
index = 0;
stars = 0;
count = 0;
flagRatingsChecked=false;
ratingHistory=false;

function getNannyDetails() {
    console.log("Selected nanny" + selectedNannyId)
    getDoc(doc(db, "user", selectedNannyId)).then((doc) => {
        NannyProfileDetails = doc.data();
        const nannyExperience = query(collection(db, "nanny"));
         getDocs(nannyExperience).then( (snapshot) => {
             snapshot.forEach((doc) => {
                if(doc.data().nanny_id === selectedNannyId) {
                    NannyProfileDetails = {
                        ...NannyProfileDetails,
                        ...doc.data(),
                    }
                }
            });
            renderNannyDetails();
        });
    });
}

function renderNannyDetails() {
    const nannyName = document.querySelector("#nanny-name");
    const nannyLocation = document.querySelector("#nanny-location");
    const nannyDescription = document.querySelector("#nanny-description");
    const nannyRate = document.querySelector("#nanny-rate");
    let calendar_days= NannyProfileDetails.schedule;

    nannyName.innerHTML += NannyProfileDetails.full_name;
    nannyLocation.innerHTML += NannyProfileDetails.city;
    nannyDescription.innerHTML += NannyProfileDetails.description ? NannyProfileDetails.description : "";
    nannyRate.innerHTML += NannyProfileDetails.payrate;

    ratingHistory = false; //reset rating history flag on new profile load
    check_ratings(RatingStars);
    stars = NannyProfileDetails.ratings.stars;
    count = NannyProfileDetails.ratings.count;
    displayRating();
    //Render schedule
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

const contact = document.querySelector("#contactBtn");
const contactWrapper = document.querySelector(".contact-info");
let contactShowFlag = false;
contact.addEventListener("click", () => {

  if(contactShowFlag===false)
  {
      if(!sessionStorage.getItem('LoginId')) {
            alert("You should be logged in to see contact information.");
        } else {
            contactShowFlag = true;
            const contactWrapper = document.querySelector(".contact-info");
                contactWrapper.innerHTML = `
                <ul class="contact-info-details">
                    <li>
                      Email:<span> ${NannyProfileDetails.email}</span>
                    </li>
                    <li>
                      Contact:<span>${NannyProfileDetails.contact}</span>
                    </li>
                </ul>`;
        }
  }
  else{
    contactWrapper.innerHTML = "";
    contactShowFlag=false;
  }
});


//Ratings................................................................//

//Display the ratings
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

  //function to set the ratings color on click
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
        }
    });
  }

  function calculateRating(){

    stars = ((stars*count+(index+1))/(count+1)).toFixed(4);
    count = count + 1;
    setRatingsData(count, stars);
  }

  //function to save the ratings on submit
  async function setRatingsData(setCount, setStars){

    const setRatings = doc(db, "user", selectedNannyId);
    await updateDoc(setRatings, {ratings:
      {
      stars : setStars,
      count : setCount,
      }})
      .catch(()=> {
        console.log("Ratings not updated");
      });
    //location.reload();
  }

  submitRatings.addEventListener('click', () => {
    if(ratingHistory===false){
     if(flagRatingsChecked===true)
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

  //..........End Ratings.........//

 const calculateButton = document.querySelector(".calcBtn");

 calculateButton.addEventListener("click", () => {
    if(!NannyProfileDetails.schedule || NannyProfileDetails.schedule.length < -1) {
        alert("This nanny is not available this week!")
    } else {
        calculatePayment(NannyProfileDetails.schedule.length, NannyProfileDetails.payrate);
    }
 });

function calculatePayment(days, payRate) {
 const duration = document.querySelector("#duration").value;
 const hours = document.querySelector(".hours").value;
 const output = document.querySelector(".total-output");

    const wage = (days * duration) * payRate * hours;
    const GST =(wage * 0.05);
    const PST = (wage * 0.07);

    const total = (wage + GST + PST).toFixed(2);
    output.innerHTML = `
    <ul> 
        <li>The total is CAD${total}.</li>
        <li>GST is CAD${Math.ceil(GST)}</li>
        <li>PST is CAD${Math.ceil(PST)}</li>
    </ul>`
}

getNannyDetails();
