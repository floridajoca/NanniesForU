'use strict';

class Page {
    constructor(name, htmlName, jsName) {
        this.name = name;
        this.htmlName = htmlName;
        this.jsName = jsName;

        this.jsName = jsName ? jsName : htmlName.substring(0, htmlName.lastIndexOf(".")) + "js";
    }
}

class Router {
    static init(mainAreaId, pages) {
        Router.pages = pages;
        Router.rootElem = document.getElementById(mainAreaId);
        window.addEventListener('hashchange', function (e) {
            Router.handleHashChange();
        });
        Router.handleHashChange();
    }

    static handleHashChange() {
        const urlHash = window.location.hash;
        if (urlHash.length > 0) {
            for (let i = 0; i < Router.pages.length; i++) {
                if (urlHash === Router.pages[i].name) {
                    Router.goToPage(Router.pages[i]);
                    break;
                }
            }
        } else {
            Router.goToPage(Router.pages[0])
        }
    }

    static async goToPage(page) {
        try {
            const response = await fetch(page.htmlName);
            const txt = await response.text();
            Router.rootElem.innerHTML = txt;

            const script = document.createElement(script);
            script.setAttribute("src", page.jsName);
            script.setAttribute('type', "text/javascript");
            Router.rootElem.appendChild(script);
        } catch (err) {
            console.error(err);
        }
    }


}
