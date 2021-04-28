'use strict';
// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
const lat = 60.181576782061356;
const lng = 24.939455637162748;
let latitude;
let longitude;
let accuracyDistance;

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
// Paikannetaan laite. Ei ole välttämätön mutta kartalle saadaan merkki!
function geoFindMe() {
    function success(position) {
        latitude  = position.coords.latitude;
        longitude = position.coords.longitude;
        accuracyDistance = position.coords.accuracy;
        // Tulostetaan paikkatiedot konsoliin
        console.log(`Latitude: ${latitude} °, Longitude: ${longitude} ° \nMore or less ${accuracyDistance} meters.`);
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
// Lisätään merkit kartalle json datan avulla.
function addMarkers(json) {

    // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
    // setView asettaa näkymän näihin fixattuihin koordinaatteihin zoomilla 13
    const map = L.map('map').setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    for (let i = 0; i < json.length; i++){
        for (let j = 0; j < json[i].points.length; j++){
            if (json[i].points[j].locationPoint.lat != null || json[i].points[j].locationPoint.lng != null ){
                L.marker([json[i].points[j].locationPoint.lat, json[i].points[j].locationPoint.lng], {icon: pickMarker(json[i].points[j].locationPoint.pointInfo)}).addTo(map)
                    .bindPopup(json[i].points[j].locationPoint.pointInfo)
                    .openPopup();
            }
        }
    }
    L.marker([latitude, longitude], {icon: pointHere}).addTo(map)
        .bindPopup(`Olet tässä noin ${accuracyDistance}m tarkuus alueella`)
        .openPopup();
}
function pickMarker(words){
    //TODO: Jos joku keksisi paremman idean miten asetetaan merkit niin siitä vaan! :D
    const dictionary = {
        "merkki" : point,
        "opastus": infoPoint,
        "kartta": infoPoint,
        "opastaulu": infoPoint,
        "info": infoPoint,
        "oleskelurajoitusalue":warning,
        "museo":attraction,
        "nähtävyys":attraction,
        "lintupiilo":birdhide,
        "lintutorni" : birdtower,
        "ulkoilumaja":shelter,
        "maja":shelter,
        "esteetön":unobstructed,
        "kahvila" : cafeteria,
        "kioskikahvila" : cafeteria,
        "jäätelökahvila" : cafeteria,
        "kioski" : cafeteria,
        "ravintola" : restaurant,
        "grill": restaurant,
        "uimaranta" : beach,
        "uimapaikka" : beach,
        "uintipaikka" : beach,
        "uimalaitos" : beach,
        "naturistiuimaranta" : beach,
        "maauimala" : beach,
        "lauttayhteys":ferry,
        "yhteysvenelaituri":ferry,
        "vesibussiliikenne":ferry,
        "metro" : metro,
        "metroasema" : metro,
        "koira" : dogpark,
        "koirapuisto": dogpark,
        "hiihtoladut":skiTrack,
        "hiihtolatu":skiTrack,
        "vesipiste":water,
        "wc": wc_1,
        "vessa": wc_1,
        "käymälä": wc_2,
        "ulkovessa": wc_2,
        "sauna" : sauna,
        "suihku": shower,
        "pukukoppi":changingRoom,
        "pukuhuone":changingRoom,
        "ratsastuskenttä":horses,
        "ratsastushalli":horses,
        "pysäköintipaikka": parking,
        "pysäköintialue": parking,
        "parkkialue": parking,
        "piknikpaikka": picnic,
        "piknik": picnic,
        "leikkipaikka": playArea,
        "grillialue":firePlace,
        "grillikatos":firePlace,
        "nuotio":firePlace,
        "grilli":firePlace,
    };
    let word = words.split(/[\s,.<(>)-]+/);
    for (let s = 0; s < word.length; s++){
        word[s] = word[s].toLowerCase();
        if (dictionary.hasOwnProperty(word[s])){
            return dictionary[word[s]];
        }
    }
    return dictionary["merkki"];
}