'use strict';
// Asetukset paikkatiedon hakua varten (valinnainen)
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
let fileName = [
    "harakka_reititys", "kallahdenniemi_reititys", "keskuspuisto_reititys", "lauttasaari_reitiyys", "mustavuori_reititys",
    "pajaTali_reititys", "pihlajasaari_reititys", "seurasaari_reititys", "uutela_reititys", "vallisaari_reititys",
    "vanhankaupunginlahti_reititys", "vasikkasaari_reititys"
];
const lat = 60.181576782061356;
const lng = 24.939455637162748;
let latitude;
let longitude;
let accuracyDistance;
let map;

geoFindMe();

let apiurl = `https://citynature.eu/api/wp/v2/places?cityid=5`;
const apiOsoite = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

searchIDatAPI(apiurl);
createMap();
addRoutes();

function searchIDatAPI(apiurl)  {
    fetch(apiurl).then(function(response) {
        console.log("Hello there");
        return response.json();
    }).then(function(json) {
        addMarkers(json);
    });
}

function showID(json){
    for (let i = 0; i < json.length; i++){
        console.log(`ID: ${json[i].ID} Title: ${json[i].title} locationPoint[0]_LAT: ${json[i].points[0].locationPoint.lat} locationPoint[0]_LNG: ${json[i].points[0].locationPoint.lng}`);
    }
    addMarkers(json);
}
function createMap(){
    // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
    // setView asettaa näkymän näihin fixattuihin koordinaatteihin zoomilla 13
    map = L.map('map',{
        worldCopyJump: true,
    }).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
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
function addRoutes(){
    for (let i = 0; i < fileName.length; i++){
        let geojsonLayer = new L.GeoJSON.AJAX(`json/${fileName[i]}.geojson`, {
            style: function(feature) {
                return {
                    color: feature.properties['stroke'],
                    width: feature.properties['stroke-width'],
                    opacity: 0.65
                };
            }});
        geojsonLayer.addTo(map);
    }
}
// Lisätään merkit kartalle json datan avulla.
function addMarkers(json) {
    for (let i = 0; i < json.length; i++){
        for (let j = 0; j < json[i].points.length; j++){
            if (json[i].points[j].locationPoint.lat != null || json[i].points[j].locationPoint.lng != null ){
                let myPopup = L.popup({
                    maxHeight: 500,
                    closeOnClick: false,
                    keepInView: true,
                    autoPan: false
                }).setContent(json[i].points[j].locationPoint.pointInfo);
                L.marker([json[i].points[j].locationPoint.lat, json[i].points[j].locationPoint.lng], {icon: pickMarker(json[i].points[j].locationPoint)}).addTo(map)
                    .bindPopup(myPopup);
            }
        }
    }
    L.marker([latitude, longitude], {icon: pointHere}).addTo(map)
        .bindPopup(`Olet tässä noin ${accuracyDistance}m tarkuus alueella`, {autoPan: false})
        .openPopup()
}
function pickMarker(locationPoint){
    let words = locationPoint.pointInfo;
    let coordinates = locationPoint;
    // Erikois tapauksia varten voidaan asettaa tietylle koordinaatille oma merkki
    const specialLat = [60.13294372479865, 60.14060185620884, 60.14029722346168];
    const specialLng = [25.000413595300188, 24.916573762893676, 24.917185306549072];
    const specialMarker = [warning, septitankki, venevalkama];
    for (let i = 0; i < specialLng.length; i++){
        if (specialLat[i] == coordinates.lat && specialLng[i] == coordinates.lng){
            return specialMarker[i];
        }
    }
    //TODO: Jos joku keksisi paremman idean miten asetetaan merkit niin siitä vaan! :D
    const dictionary = {
        "merkki" : attraction,
        "opastus": infoPoint,
        "kartta": infoPoint,
        "opastaulu": infoPoint,
        "pääopastaulu": infoPoint,
        "info": infoPoint,
        "oleskelurajoitusalue":warning,
        "museo":attraction,
        "nähtävyys":attraction,
        "lintupiilo":birdhide,
        "lintutorni" : birdtower,
        "ulkoilumaja":shelter,
        "maja":shelter,
        "jäätelökauppa" : shelter,
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
        "levähdyspaikka": picnic,
        "leikkipaikka": playArea,
        "grillialue":firePlace,
        "grillikatos":firePlace,
        "nuotio":firePlace,
        "grilli":firePlace,
    };
    let word = words.split(/[\s,.<(>)-]+/);
    if (word.length >= 25){
        return routeMarker;
    }
    for (let s = 0; s < word.length; s++){
        word[s] = word[s].toLowerCase();
        if (dictionary.hasOwnProperty(word[s])){
            return dictionary[word[s]];
        }
    }
    return dictionary["merkki"];
}
// haetaan reitti lähtöpisteen ja kohteen avulla
function haeReitti(lahto, kohde) {
    // GraphQL haku
    const haku = `{
      plan(
        from: {lat: ${lahto.latitude}, lon: ${lahto.longitude}}
        to: {lat: ${kohde.latitude}, lon: ${kohde.longitude}}
        numItineraries: 1
      ) {
        itineraries {
          legs {
            startTime
            endTime
            mode
            duration
            distance
            legGeometry {
              points
            }
          }
        }
      }
    }`;

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({query: haku}), // GraphQL haku lisätään queryyn
    };

    // lähetetään haku
    fetch(apiOsoite, fetchOptions).then(function (vastaus) {
        return vastaus.json();
    }).then(function (tulos) {
        console.log(tulos.data.plan.itineraries[0].legs);
        const googleKoodattuReitti = tulos.data.plan.itineraries[0].legs;
        for (let i = 0; i < googleKoodattuReitti.length; i++) {
            let color = '';
            switch (googleKoodattuReitti[i].mode) {
                case 'WALK':
                    color = 'green';
                    break;
                case 'BUS':
                    color = 'red';
                    break;
                case 'RAIL':
                    color = 'cyan'
                    break;
                case 'TRAM':
                    color = 'magenta'
                    break;
                default:
                    color = 'blue';
                    break;
            }
            const reitti = (googleKoodattuReitti[i].legGeometry.points);
            const pisteObjektit = L.Polyline.fromEncoded(reitti).getLatLngs(); // fromEncoded: muutetaan Googlekoodaus Leafletin Polylineksi
            L.polyline(pisteObjektit).setStyle({
                color
            }).addTo(map);
        }
        map.fitBounds([[lahto.latitude, lahto.longitude], [kohde.latitude, kohde.longitude]]);
    }).catch(function (e) {
        console.error(e.message);
    });
}