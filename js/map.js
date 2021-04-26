'use strict';

// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

let latitude = 61.951180799999996;
let longitude = 28.2066944;
let accuracyDistance = 10;

geoFindMe();

let apiurl = `https://citynature.eu/api/wp/v2/places?cityid=5`;

searchIDatAPI(apiurl);

function searchIDatAPI(apiurl)  {
    fetch(apiurl).then(function(response) {
        return response.json();
    }).then(function(json) {
        showID(json);
    });
}

function showID(json){
    for (let i = 0; i < json.length; i++){
        console.log(`ID: ${json[i].ID} Title: ${json[i].title} locationPoint[0]_LAT: ${json[i].points[0].locationPoint.lat} locationPoint[0]_LNG: ${json[i].points[0].locationPoint.lng}`);
    }
    addMarkers(json);
}

function geoFindMe() {

    function success(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        accuracyDistance = position.coords.accuracy;
        console.log(`Latitude: ${latitude} °, Longitude: ${longitude} °`);
    }
    function error() {
        console.error('Unable to retrieve your location');
    }
    if(!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

}
// Funktio, joka ajetaan, kun paikkatiedot on haettu
function addMarkers(json) {

    // Tulostetaan paikkatiedot konsoliin
    console.log('Your current position is:');
    console.log(`Latitude : ${latitude}`);
    console.log(`Longitude: ${longitude}`);
    console.log(`More or less ${accuracyDistance} meters.`);

    // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
    const map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    for (let i = 0; i < json.length; i++){
    L.marker([json[i].points[0].locationPoint.lat, json[i].points[0].locationPoint.lng]).addTo(map)
        .bindPopup(json[i].points[0].locationPoint.pointInfo)
        .openPopup();
    }
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup('Olet tässä')
        .openPopup();
}