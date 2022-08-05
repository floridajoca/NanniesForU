import { signoutClick } from "./signout.js";
export function userTypeValidation() {

    const links = document.getElementById('main-site-links');
    const menuItem1 = document.createElement("li");
    menuItem1.innerHTML = '<a href="#home">Home</a>';
    links.append(menuItem1);
    const menuItem2 = document.createElement("li");
    menuItem2.innerHTML = '<a href="#about">About</a>';
    links.append(menuItem2);
    const menuItem3 = document.createElement("li");
    menuItem3.innerHTML = '<a href="#help">How it works</a>';
    links.append(menuItem3);

    if (sessionStorage.getItem('LoginId')) {
        if (sessionStorage.getItem('User_Type') == 'Parent') {
            console.log(sessionStorage.getItem('User_Type'), links);
            const menuItem4 = document.createElement("li");
            menuItem4.innerHTML = '<a href="#nannyprofilelist">Nanny profile List</a>';
            links.append(menuItem4);
        }
        else if (sessionStorage.getItem('User_Type') == 'Nanny') {
            const menuItem5 = document.createElement("li");
            menuItem5.innerHTML = '<a href="#parentprofilelist">Parent Profile List</a>';
            links.append(menuItem5);
        }

        const menuItemSignOut = document.createElement("li");
        menuItemSignOut.innerHTML = '<a href="#" id="sign-out-page">Sign Out</a>';
        links.append(menuItemSignOut);
        const signOutId = document.getElementById('sign-out-page');
        signOutId.addEventListener('click', function () { signoutClick(); }, false);
    }
    else {
        const menuItemSignIN = document.createElement("li");
        menuItemSignIN.innerHTML = '<a href="#login">Login</a> / <a href="#signup">Sign Up</a>';
        links.append(menuItemSignIN);
    }

}


