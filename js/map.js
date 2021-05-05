'use strict';

// Kaikki kartan merkit säilytetään tähän jotta voidaan myöhemmin
// helmposti asettaa samat merkit takaisin tai poistaa
let allMarkers = [];
// geojson tiedostoiden nimet ilman tiedosto päätettä
let fileName = [
    "harakka_reititys", "kallahdenniemi_reititys", "keskuspuisto_reititys", "lauttasaari_reitiyys", "mustavuori_reititys",
    "pajaTali_reititys", "pihlajasaari_reititys", "seurasaari_reititys", "uutela_reititys", "vallisaari_reititys",
    "vanhankaupunginlahti_reititys", "vasikkasaari_reititys"
];
// Kartan aloituksen keskipiste
const lat = 60.181576782061356;
const lng = 24.939455637162748;
let map;
// merkkien yhdistävä ohjain
let markerClusters = L.markerClusterGroup({
    maxClusterRadius : 90,
    disableClusteringAtZoom : 14
});
let apiurl = `https://citynature.eu/api/wp/v2/places?cityid=5`;

// Laitetaan API haku päälle. Viee eniten aikaa!!
searchIDatAPI(apiurl);
// luodaan kartta API haun aikana
createMap();
// Lisätään reitit luodulle kartalle
addRoutes();
// Luodaan vasemmanpuoleinen sivupaneeli kartalle
let leftSidebar = L.control.sidebar('sidebar-left', {
    position: 'left'
});
// Luodaan oikeanpuoleinen sivupaneeli kartalle
let rightSidebar = L.control.sidebar('sidebar-right', {
    position: 'right'
});
// lisätään molemmat sivupaneelit kartalle
map.addControl(leftSidebar);
map.addControl(rightSidebar);
// Asetetaan vasemmanpuoleinen paneeli näkyviin
leftSidebar.show();
// Luodaan kartalle uusi nappi käyttäen easyButton kirjastoa
// joka pystyy avaamaan/sulkemaan vasemmanpuoleisen sivupaneelin
L.easyButton('fas fa-bars', function(btn, map){
    leftSidebar.toggle();
}).addTo( map );

let checkbox = document.querySelectorAll("input[name=filter]");

for (let i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener('change', filter);
}
// Merkkien suodatus. Eli poistetaan kartalta merkkejä ja lisätään
// jos käyttäjä valitsee checkboxeista jonkun
function filter(){
    let checked = false;
    let checkMarkers = [];
    for (let i = 0; i < checkbox.length; i++) {
        if (checkbox[i].checked){
            checked = true;
            switch (checkbox[i].value){
                case "cafeteria":
                    checkMarkers[checkMarkers.length] = cafeteria;
                    break;
                case "restaurant":
                    checkMarkers[checkMarkers.length] = restaurant;
                    break;
                case "wc":
                    checkMarkers[checkMarkers.length] = wc_1;
                    checkMarkers[checkMarkers.length] = wc_2;
                    break;
                case "parking":
                    checkMarkers[checkMarkers.length] = parking;
                    break;
                case "attraction":
                    checkMarkers[checkMarkers.length] = attraction;
                    break;
                case "picnic":
                    checkMarkers[checkMarkers.length] = picnic;
                    break;
                case "beach":
                    checkMarkers[checkMarkers.length] = beach;
                    break;
                case "routeMarker":
                    checkMarkers[checkMarkers.length] = routeMarker;
                    break;
                case "infoPoint":
                    checkMarkers[checkMarkers.length] = infoPoint;
                    break;
                case "metro":
                    checkMarkers[checkMarkers.length] = metro;
                    checkMarkers[checkMarkers.length] = ferry;
                    break;
            }
        }
    }
    // jos ei ole yhtäkään merkkiä valittu lisätään kaikki merkit takaisin
    // mutta varmistetaan nyt 100% ettei tule kopioita merkeistä poistamalla aikaisempi merkki
    // ja lisätään takaisin (on turhaa työtä mutta ennemmin varmistetaan)
    if (checked == false){
        for (let i = 0; i < allMarkers.length; i++) {
            markerClusters.removeLayer(allMarkers[i]);
            markerClusters.addLayer(allMarkers[i]);
        }
        map.addLayer( markerClusters );
        return;
    }
    for (let i = 0; i < allMarkers.length; i++) {
        map.removeLayer(allMarkers[i]);
        markerClusters.removeLayer(allMarkers[i]);
        for (let j = 0; j < checkMarkers.length; j++){
            if (allMarkers[i].options.icon == checkMarkers[j]){
                markerClusters.addLayer(allMarkers[i]);
            }
        }
    }
    map.addLayer( markerClusters );
}
// Haetaan luontoreittien tiedot
function searchIDatAPI(apiurl)  {
    fetch(apiurl).then(function(response) {
        return response.json();
    }).then(function(json) {
        addMarkers(json);
        geoFindMe();
    });
}
// Luodaan kartta
function createMap(){
    // Käytetään leaflet.js -kirjastoa näyttämään sijainti kartalla (https://leafletjs.com/)
    // setView asettaa näkymän näihin fixattuihin koordinaatteihin zoomilla 13
    map = L.map('map',{
        worldCopyJump: true,
        minZoom : 5
    }).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
}

// Paikannetaan laite. Ei ole välttämätön mutta kartalle saadaan merkki!
function geoFindMe() {
    // Asetukset paikkatiedon hakua varten (valinnainen)
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    function success(position) {
        // Tulostetaan paikkatiedot konsoliin
        console.log(`Latitude: ${position.coords.latitude} °, Longitude: ${position.coords.longitude} ° \nMore or less ${position.coords.accuracy} meters.`);

        L.marker([position.coords.latitude, position.coords.longitude], {icon: pointHere}).addTo(map)
            .bindPopup(`Olet tässä noin ${position.coords.accuracy}m tarkuus alueella`, {autoPan: false})
            .openPopup();
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
// Reittien geojson tiedostot ladataan ja asetetaan kartalle
function addRoutes(){
    // Käydään fileName lista läpi
    for (let i = 0; i < fileName.length; i++){
        // asetetaan GeoJSON tasolle reitti ja tyyli.
        let geojsonLayer = new L.GeoJSON.AJAX(`json/${fileName[i]}.geojson`, {
            style: function(feature) {
                return {
                    // feature.properties tarvitaan jotta voidaan käyttää geojson tiedostossa esiintyviä arvoja värille ja leveydelle
                    color: feature.properties['stroke'],
                    width: feature.properties['stroke-width'],
                    opacity: 0.65
                };
            }});
        // lisätään geojson taso kartalle
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
                let m;
                if (json[i].points[j].locationPoint.pointInfo.length >= 60){
                    m =  L.marker([json[i].points[j].locationPoint.lat, json[i].points[j].locationPoint.lng], {icon: pickMarker(json[i].points[j].locationPoint)})
                        .on('click', function () {
                            rightSidebar.show();
                            rightSidebar.setContent(json[i].points[j].locationPoint.pointInfo);
                        });
                }
                else {
                    m =  L.marker([json[i].points[j].locationPoint.lat, json[i].points[j].locationPoint.lng], {icon: pickMarker(json[i].points[j].locationPoint)})
                        .bindPopup(myPopup);
                    //if (m.options.icon === cafeteria)
                    //if (m.options.icon === cafeteria)
                        //m.hide();
                }
                allMarkers[allMarkers.length] = m;
                markerClusters.addLayer(m);
            }
        }
    }
    map.addLayer( markerClusters );
    map.on('click', function(e) {
        rightSidebar.hide();
    });
}
// valitaan kuvaukseen sopiva merkki ja palauttaa sen.
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
        "kaffeliiteri" : cafeteria,
        "ravintola" : restaurant,
        "grill": restaurant,
        "kesäravintola": restaurant,
        "uimaranta" : beach,
        "uimapaikka" : beach,
        "uintipaikka" : beach,
        "uimalaitos" : beach,
        "naturistiuimaranta" : beach,
        "maauimala" : beach,
        "lauttayhteys":ferry,
        "yhteysvenelaituri":ferry,
        "vesibussiliikenne":ferry,
        "reittiliikennelaituri": ferry,
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
    // koitetaan kiertää ongelma jäätelö-kahvila. Slitillä saadaan heitettyä - merkki irti ja kahvila erikseen
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