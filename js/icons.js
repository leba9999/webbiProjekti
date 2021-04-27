'use strict';
const scale = 0.7;
let markerIcon = L.Icon.extend({
    options: {
        shadowUrl: 'img/merkki_varjo.svg',
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

let cafeteria = new signIcon({iconUrl: 'img/svg/kahvila_kahvikuppi.svg'});
let restaurant = new signIcon({iconUrl: 'img/svg/ravintola.svg'});
let picnic = new signIcon({iconUrl: 'img/svg/piknik_puu_ja_penkki.svg'});

let beach = new signIcon({iconUrl: 'img/svg/uimaranta.svg'});
let dogpark = new signIcon({iconUrl: 'img/svg/koira-aitaus.svg'});

let metro = new signIcon({iconUrl: 'img/svg/metro_logo.svg'});

let wc_1 = new signIcon({iconUrl: 'img/svg/WC.svg'});
let wc_2 = new signIcon({iconUrl: 'img/svg/kaymala.svg'});
let parking = new signIcon({iconUrl: 'img/svg/p_paikka.svg'});

let sing = {
    "kahvila": cafeteria,
    "ravintola": restaurant,
};