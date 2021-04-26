'use strict';

let latitude = 61.951180799999996;
let longitude = 28.2066944;
let distance = 10;

geoFindMe();

let apiurl = `http://lipas.cc.jyu.fi/api/sports-places?closeToLon=${longitude}&closeToLat=${latitude}&closeToMatch=any-point&closeToDistanceKm=${distance}`;
apiurl = `https://citynature.eu/api/wp/v2/places?cityid=5`;

searchIDatAPI(apiurl);

function searchIDatAPI(apiurl)  {

    /*const myRequest = new Request(apiurl, {
        method: 'GET',
        dataType: "jsonp",
        headers: {'Accept': 'application/json'},
        mode: 'cors',
        cache: 'default',
    });
    console.log(`Sending request to: \n${apiurl}`);
    fetch(myRequest).then(function(response) {
        console.log(response);
        return response.json();
    }).then(function(json) {
        showID(json);				// siirrytään varsinaisen datan käsittelyyn.
    });*/

    fetch(apiurl).then(function(response) {
        return response.json();
    }).then(function(json) {
        showID(json);				// siirrytään varsinaisen datan käsittelyyn.
    });
}

function showID(json){
    for (let i = 0; i < json.length; i++){
        console.log(`ID: ${json[i].ID} Title: ${json[i].title}`);
    }
}

function geoFindMe() {

    function success(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;

        console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    }

    function error() {
        console.error('Unable to retrieve your location');
    }

    if(!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
    } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);
    }

}