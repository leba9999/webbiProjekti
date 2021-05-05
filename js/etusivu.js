'use strict';

const mediaQuery = window.matchMedia('(max-width: 750px)');

const weather = document.querySelector('#weather');
const textF1 = document.querySelector('#textField1');
const textF2 = document.querySelector('#textField2');

handleChange(mediaQuery);

function handleChange(e) {

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

  } else {
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

  mediaQuery.addListener(handleChange);
}