'use strict';
// source: https://css-tricks.com/working-with-javascript-media-queries/
// luodaan mediasääntö classien vaihtoa varten - sama, joka muutenkin käytössä
const mediaQuery = window.matchMedia('(max-width: 750px)');

// etsitään etusivun sääwidget ja tekstikentät
const weather = document.querySelector('#weather');
const textF1 = document.querySelector('#textField1');
const textF2 = document.querySelector('#textField2');

// syötetään mediasääntö käsittelijäfunktioon
handleChange(mediaQuery);

function handleChange(e) {
// jos mediasääntö toteutuu tehdään näkymästä parempi pienelle näytölle
// siirretään jokainen omaksi rivikseen ja kerroksittain
  if (e.matches) {
  weather.classList.remove('col-3');
  weather.classList.add('col-11');
  weather.style.margin = '10px 0px 10px 15px';

  textF1.classList.remove('col-8');
  textF1.classList.add('col-11');
  textF1.style.margin = '10px 0px 10px 15px';

  textF2.classList.remove('col-8');
  textF2.classList.add('col-11');
  textF2.style.margin = '10px 0px 10px 15px';
  }
  // jos mediasääntö ei toteudu palautetaan arvot siihen mitä
  // css -tyyleissä alun perin laitettu
  else {
  weather.classList.remove('col-11');
  weather.classList.add('col-3');
  weather.style.margin = '10px 10px 0px 50px';

  textF1.classList.remove('col-11');
  textF1.classList.add('col-8');
  textF1.style.margin = '10px 0 0 0';

  textF2.classList.remove('col-11');
  textF2.classList.add('col-8');
  textF2.style.margin = '10px 0 0 0';
  }

// tarkistetaan mediasäännön toteutumista
  mediaQuery.addListener(handleChange);
}