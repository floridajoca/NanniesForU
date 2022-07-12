import { signoutClick }  from "./signout.js";
export function userTypeValidation(){

    const links = document.getElementById('main-site-links');
    const menuItem1 = document.createElement( "li" );
    menuItem1.innerHTML = '<a href="#home">Home</a>';
    links.append(menuItem1);
    const menuItem2 = document.createElement( "li" );
    menuItem2.innerHTML = '<a href="#about">About</a>';
    links.append(menuItem2);
    const menuItem3 = document.createElement( "li" );
    menuItem3.innerHTML = '<a href="#howItWorks">How it works</a>';
    links.append(menuItem3);

    if(sessionStorage.getItem('LoginId')) {
        console.log(sessionStorage.getItem('LoginId'));
        if(sessionStorage.getItem('User_Type') == 'Parent')
        {
            console.log(sessionStorage.getItem('User_Type'),links);
            const menuItem4 = document.createElement( "li" );
            menuItem4.innerHTML = '<a href="#nannyprofiles">Search Nanny</a>';
            links.append(menuItem4);
            const menuItem5 = document.createElement( "li" );
            menuItem5.innerHTML = '<a href="#parentprofiledetails">Profile</a>';
            links.append(menuItem5);
        }
        else if(sessionStorage.getItem('User_Type') == 'Nanny')
        {
            console.log(sessionStorage.getItem('User_Type'),links);
            const menuItem4 = document.createElement( "li" );
            menuItem4.innerHTML = '<a href="#parentjobpost">Job Posts</a>';
            links.append(menuItem4);
            const menuItem5 = document.createElement( "li" );
            menuItem5.innerHTML = '<a href="#nannyprofiledetails">Profile</a>';
            links.append(menuItem5);
        }

        const menuItemSignOut = document.createElement( "li" );
        menuItemSignOut.innerHTML = '<a href="#" id="sign-out-page">Sign Out</a>';
        links.append(menuItemSignOut);        
        const signoutID = document.getElementById('sign-out-page');
        signoutID.addEventListener('click',function() { signoutClick();},false);
    }
    else {
        console.log('No login');
        const menuItemSignIN = document.createElement( "li" );
        menuItemSignIN.innerHTML = '<a href="#login">Login</a> / <a href="#signup">Sign Up</a>';
        links.append(menuItemSignIN);
    }

}


