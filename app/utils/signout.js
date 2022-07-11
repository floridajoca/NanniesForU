import { getAuth, signOut  } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js";

export function signoutClick(){
    location.replace("#login");
    location.reload();
    console.log('Here');
    sessionStorage.clear();
    
    const auth = getAuth();
    

   
    
    signOut(auth).then(() => {
        console.log('Sign-out successful.');
    }).catch((error) => {
        console.log('An error happened');
    });
    let signOutMessage = document.getElementById('signout-msg');
    signOutMessage.innerHTML = 'Signout Successful. Login again to search';
    console.log(signOutMessage);
    //links.append(menuItem2);
}