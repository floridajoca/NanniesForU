var searchResult;

var options =
{
    searchOptions: {
        key: 'kYGmHbZH56aXwA7ioTsuEdAvcVCx34KI',
        language: 'en-GB',
        limit: 5
    },
    autocompleteOptions: {
        key: 'kYGmHbZH56aXwA7ioTsuEdAvcVCx34KI',
        language: 'en-GB'
    }
};
var ttSearchBox = new tt.plugins.SearchBox(tt.services, options);
var searchBoxHTML = ttSearchBox.getSearchBoxHTML();
document.body.append(searchBoxHTML);


function setSearch() {
    if (sessionStorage.getItem('LoginId')) {
        console.log('Here and now');
        const userWrapper = document.querySelector(".main-button-radio");
        if (sessionStorage.getItem('User_Type') == 'Parent') {
            userWrapper.innerHTML = `
            <div class="radio-button">
                <input type="radio" class="inputButton" name="search-button-select" value="nanny-search" checked>
                <label for="parent-search" class="InputLabel">Find Nanny</label>
            </div>
            `;
        }
        else if (sessionStorage.getItem('User_Type') == 'Nanny') {
            userWrapper.innerHTML = `
            <div class="radio-button">
                <input type="radio" class="inputButton" name="search-button-select" value="job-search" checked>
                <label for="nanny-search" class="InputLabel">Search Job as Nanny</label>
            </div>
            `;
        }
    }
}






function handleResultSelection(event) {
    var result = event.data.result;
    console.log(result);
    console.log(result.position.lat, result.position.lng);

    searchResult = { "lng": `${result.position.lng}`, "lat": `${result.position.lat}` };

    sessionStorage.setItem('searchPosition', JSON.stringify(searchResult));
    console.log((sessionStorage.getItem('searchPosition', searchResult)));
    let searchType = document.querySelector('input[name="search-button-select"]:checked').value;
    if (searchType === 'nanny-search') {
        console.log('Nanny search searches');
        location.assign("#nannyprofilelist");
    }
    else {
        console.log('Job search searches');
        location.assign("#parentprofilelist");
    }
    console.log('Glory glory' + searchType);

    // var result = event.data.result;
    // if (result.type === 'category' || result.type === 'brand') {
    //     return;
    // }
    //searchMarkersManager.draw([result]);
    //fitToViewport(result);
}



export function init() {
    setSearch();
    //var searchBoxHTML = "<h3>power</h3>";
    document.querySelector(".search-form").append(searchBoxHTML);

    //ttSearchBox.on('tomtom.searchbox.resultsfound', handleResultsFound);
    ttSearchBox.on('tomtom.searchbox.resultselected', handleResultSelection);
    ttSearchBox.on('tomtom.searchbox.resultfocused', handleResultSelection);
    //ttSearchBox.on('tomtom.searchbox.resultscleared', handleResultClearing);
}
