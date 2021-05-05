'use strict';

// etsitään itsetehty .json ja luodaan yleismuuttuja sitä varten
const jsonDir = 'json/webProject.json';
let jsonText;

// haetaan json fetchillä ja siirretään muuttujaan sen tiedot
// haetaan samalla showData funktiosta oletusikkunan tiedot (i=0)
fetch(jsonDir)
    .then(function(response) {
      return response.json();
}).then(function(json) {
  showData(json, 0);
  jsonText = json;
});

// konsoliin merkki, kun DOM täysin ladattu.
document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});

// haetaan tietoa.html tarvittavat kentät eli menulista ja suuri tekstikenttä
  const textDiv = document.querySelector('#textField');
  const menu1 = document.querySelector('#menuLi1');
  const menu2 = document.querySelector('#menuLi2');
  const menu3 = document.querySelector('#menuLi3');
  const menu4 = document.querySelector('#menuLi4');
  const aboutMenu = document.querySelector('.aboutMenu');

// lisätään listan 'napeille' kuuntelijat klikkauksiin
  menu1.addEventListener('click', showText);
  menu2.addEventListener('click', showText);
  menu3.addEventListener('click', showText);
  menu4.addEventListener('click', showText);

// luodaan tarvittavat elementit
  const currentTopic = document.createElement('h3');
  const currentUrl = document.createElement('a');
  const description = document.createElement('p');
  const img = document.createElement('img');
  const br = document.createElement('br');
  const br2 = document.createElement('br');

// asetetaan ne järjestyksessä tekstikentän sisään
  textDiv.appendChild(currentTopic);
  textDiv.appendChild(currentUrl);
  textDiv.appendChild(br);
  textDiv.appendChild(description);
  textDiv.appendChild(br2);
  textDiv.appendChild(img);

// funktio, jolla katsotaan mistä listan kohdasta klikkaus tulee eli
// tarkistaa mitä listeneriä klikattiin ja antaa i muuttujalle arvon sen mukaan
// ja vie sen ja .json datan showData funktioon
  function showText(evt) {

    evt.currentTarget === menu1 ? showData(jsonText, 0)
        : evt.currentTarget === menu2 ? showData(jsonText, 1)
          : evt.currentTarget === menu3 ? showData(jsonText, 2)
            : evt.currentTarget === menu4 ? showData(jsonText, 3)
              : currentTopic.innerText = "";
}

// ottaa vastaan edellä mainitun json datan ja muuttujan parametreinä
function showData(jsonData, i) {
    console.log(i);

// tekee jokaiselle kohdalle erikseen try ja catch, jotta saadaan tarkat errorit
// esiin ja tarvittaessa erillinen toimenpide joka kohdalle. Hakee json datasta
// muuttuja i mukaisen kohdan ja siten oikeat tiedot näkyviin
  try {
    currentTopic.innerText = jsonData[i].name;
  } catch(error) {
    console.error(error);
    console.log('nimessä virhe');
  }

  try {
    currentUrl.href = jsonData[i].url;
    currentUrl.innerText = jsonData[i].urlText;
    currentUrl.target = "_blank";
  } catch(error) {
    textDiv.removeChild(currentUrl);
    console.error(error);
    console.log('URLis virhe');
  }

  try {
    description.innerHTML = jsonData[i].description;
  } catch(error) {
    console.error(error);
    console.log('description virhe');
  }

  try {
    img.src = jsonData[i].img;
    img.alt = "logo";
  } catch(error) {
    textDiv.removeChild(img);
    console.error(error);
    console.log('imagessa virhe');
  }
// asettaa 'aktiivisen' statuksen sille kohdalle, joka tällä hetkellä auki
// ei varsinaisesti käytössä nyt, mutta antaa helpot kustomointi mahdollisuudet
  setActive(jsonData[i].name);
  textDiv.style.overflow = 'hidden';
}

// set active funktio, ottaa parametrinä nimen edeltä ja poistaa kaikilta ensin
// aktiivisen statuksen ja lisää sen sitten kyseisen nimen omaavalle.
function setActive(active) {

  menu1.classList.remove('active');
  menu2.classList.remove('active');
  menu3.classList.remove('active');
  menu4.classList.remove('active');

  active === menu1.textContent ? menu1.classList.add("active")
    : active === menu2.textContent ? menu2.classList.add("active")
      : active === menu3.textContent ? menu3.classList.add("active")
          : active === menu4.textContent ? menu4.classList.add("active")
              : active;
  }

// tämän osuuden source: https://css-tricks.com/working-with-javascript-media-queries/
// ensiksi haetaan mediasäännöt
  const mediaQuery = window.matchMedia('(max-width: 750px)');
  const mediaQuery2 = window.matchMedia('(max-width: 450px)');

// lisätään mediasäännöille kuuntelijat
  mediaQuery.addListener(handleTabletChange);
  handleTabletChange(mediaQuery);
  mediaQuery2.addListener(handleMiniChange)
  handleMiniChange(mediaQuery2);

// Tiedostetaan ongelmat, jos veivataan 'mini'-modesta takaisin ylös ei palaudu optimaalisesti
// mutta käytännön ongelmaa siitä ei varmasti tule. Ainoastaan itse tietää sen olevan siellä
// ja front-end velhona pystyy sen löytämään! :)

// katsotaan toteutuuko mediasäännöt ja reagoidaan niihin vaihtamalla kolumni-
// luokkia, marginaaleja, paddingeja ja sijaintia ja täten muuttaen elementtien leveyttä
function handleTabletChange(e) {

  // jos ensmimmäinen sääntö toteutuu siirrytään 'tablettimodeen'
  if (e.matches) {
    console.log('Pieni ruutu achieved!')
    textDiv.classList.remove('col-8');
    textDiv.classList.add('col-9');

    aboutMenu.classList.remove('col-1');
    aboutMenu.classList.remove('col-3');
    aboutMenu.classList.add('col-2');
    aboutMenu.style.padding = '0';
    textDiv.style.position = 'static';
    textDiv.style.left = '0';
  } else {
    // jos ei siirrytään normaalin ison näytön tilaan
    console.log('Ison näytön tila!')

    textDiv.classList.remove('col-9');
    textDiv.classList.add('col-9');

    aboutMenu.classList.remove('col-1');
    aboutMenu.classList.remove('col-2');
    aboutMenu.classList.add('col-3');
    textDiv.style.position = 'static';
    textDiv.style.left = '0';
    aboutMenu.style.padding = '0px 10px 0px 0px';
    handleMiniChange(mediaQuery2)
  }
}

function handleMiniChange(e) {

// jos toinen sääntö toteutuu siirtyy 'pienen näytön tilaan'
  if (e.matches) {
    console.log('Pienin ruutu kaikista achieved!')

    textDiv.classList.remove('col-8');
    textDiv.classList.add('col-9');

    aboutMenu.classList.remove('col-2');
    aboutMenu.classList.remove('col-3');
    aboutMenu.classList.add('col-1');

    textDiv.style.position = 'relative';
    textDiv.style.left = '50px';
    aboutMenu.style.padding = '0px 10px 0px 0px';
  } else {
    // jos ei toteudu siirrytään ison näytön tilaan
    console.log('Ison näytön tila!')

    textDiv.classList.remove('col-9');
    textDiv.classList.add('col-9');

    aboutMenu.classList.remove('col-1');
    aboutMenu.classList.remove('col-2');
    aboutMenu.classList.add('col-3');

    textDiv.style.position = 'static';
    textDiv.style.left = '0';
    aboutMenu.style.padding = '0px 10px 0px 0px';
  }
}