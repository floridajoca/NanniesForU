
document.addEventListener("DOMContentLoaded", function () {
    updateOnlineStatus();
    window.addEventListener('offline', updateOnlineStatus);
});

function updateOnlineStatus() {
    const main = document.querySelector('main');
    if (!navigator.onLine) {
        main.innerHTML = "";
        const p = document.createElement('p');
        const div = document.createElement('div');
        var img = document.createElement("img");
        img.src = "app/img/logo_proposal_final.png";
        div.append(img);
        div.classList.add('offline-wrapper');
        p.classList.add('offline-message');
        p.innerText = "Sorry, No nannies for you! You're offline. Please reconnect and refresh the page!"
        div.appendChild(p)
        main.appendChild(div)
        main.style.cssText = 'display: block';
    }
}