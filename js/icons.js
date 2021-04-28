'use strict';
const scale = 0.7;
let markerIcon = L.Icon.extend({
    options: {
        shadowUrl: 'img/svg/merkki_varjo.svg',
        iconSize:     [50 * scale, 50 * scale],
        shadowSize:   [50 * scale, 50 * scale],
        iconAnchor:   [25 * scale, 46 * scale],
        shadowAnchor: [25 * scale, 46 * scale],
        popupAnchor:  [-4 * scale, -45* scale]
    }
});
let signIcon = L.Icon.extend({
    options: {
        iconSize:     [50 * scale, 50 * scale],
        iconAnchor:   [25 * scale, 46 * scale],
        popupAnchor:  [0, -45 * scale]
    }
});
let pointHere = new markerIcon({iconUrl: 'img/svg/punainen_merkki.svg'});
let point = new markerIcon({iconUrl: 'img/svg/vihrea_merkki.svg'});
let routeMarker = new markerIcon({iconUrl: 'img/svg/vihrea_merkki.svg'});

let infoPoint = new signIcon({iconUrl: 'img/svg/info.svg'});
let attraction = new signIcon({iconUrl: 'img/svg/nahtavyys.svg'});
let shelter  = new signIcon({iconUrl: 'img/svg/kahvila_kahvikuppi_mokissa.svg'});
let unobstructed  = new signIcon({iconUrl: 'img/svg/esteeton_reitti_helppo.svg'});
let warning  = new signIcon({iconUrl: 'img/svg/warning_sign.svg'});

let cafeteria = new signIcon({iconUrl: 'img/svg/kahvila_kahvikuppi.svg'});
let restaurant = new signIcon({iconUrl: 'img/svg/ravintola.svg'});
let picnic = new signIcon({iconUrl: 'img/svg/piknik_puu_ja_penkki.svg'});
let playArea = new signIcon({iconUrl: 'img/svg/leikkipaikka.svg'});
let firePlace = new signIcon({iconUrl: 'img/svg/keittokatos.svg'});

let skiTrack = new signIcon({iconUrl: 'img/svg/hiihtaja_perinteinen.svg'});
let beach = new signIcon({iconUrl: 'img/svg/uimaranta.svg'});
let shower  = new signIcon({iconUrl: 'img/svg/suihku.svg'});
let sauna  = new signIcon({iconUrl: 'img/svg/sauna.svg'});
let changingRoom  = new signIcon({iconUrl: 'img/svg/pukuhuone.svg'});
let dogpark = new signIcon({iconUrl: 'img/svg/koira-aitaus.svg'});
let birdhide  = new signIcon({iconUrl: 'img/svg/lintupiilo.svg'});
let birdtower  = new signIcon({iconUrl: 'img/svg/lintutorni.svg'});
let horses  = new signIcon({iconUrl: 'img/svg/ratsastaja.svg'});

let water  = new signIcon({iconUrl: 'img/svg/juomavesi.svg'});
let wc_1 = new signIcon({iconUrl: 'img/svg/WC.svg'});
let wc_2 = new signIcon({iconUrl: 'img/svg/kaymala.svg'});

let ferry  = new signIcon({iconUrl: 'img/svg/lauttayhteys.svg'});
let parking = new signIcon({iconUrl: 'img/svg/p_paikka.svg'});
let metro = new signIcon({iconUrl: 'img/svg/metro_logo.svg'});