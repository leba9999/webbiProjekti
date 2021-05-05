'use strict';

const jsonDir = 'https://raw.githubusercontent.com/leba9999/webbiProjekti/master/json/webProject.json';
//const jsonDir = 'json/webProject.json';
let jsonText;

fetch(jsonDir)
    .then(function(response) {
      return response.json();
}).then(function(json) {
  showData(json, 0);
  jsonText = json;
});

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});

  const textDiv = document.querySelector('#textField');
  const menu1 = document.querySelector('#menuLi1');
  const menu2 = document.querySelector('#menuLi2');
  const menu3 = document.querySelector('#menuLi3');
  const menu4 = document.querySelector('#menuLi4');
  const aboutMenu = document.querySelector('.aboutMenu');

  menu1.addEventListener('click', showText);
  menu2.addEventListener('click', showText);
  menu3.addEventListener('click', showText);
  menu4.addEventListener('click', showText);

  const currentTopic = document.createElement('h3');
  const currentUrl = document.createElement('a');
  const description = document.createElement('a');
  const img = document.createElement('img');
  const br = document.createElement('br');
  const br2 = document.createElement('br');

  textDiv.appendChild(currentTopic);
  textDiv.appendChild(currentUrl);
  textDiv.appendChild(br);
  textDiv.appendChild(description);
  textDiv.appendChild(br2);
  textDiv.appendChild(img);

  function showText(evt) {

    evt.currentTarget === menu1 ? showData(jsonText, 0)
        : evt.currentTarget === menu2 ? showData(jsonText, 1)
          : evt.currentTarget === menu3 ? showData(jsonText, 2)
            : evt.currentTarget === menu4 ? showData(jsonText, 3)
              : currentTopic.innerText = "";
    //showData(jsonText, 0);
}

function showData(jsonData, i) {
    console.log(i);
  try {
    currentTopic.innerText = jsonData[i].name;
  } catch(error) {
    console.error(error);
    console.log('nimessä virhe');
  }

  try {
    currentUrl.href = jsonData[i].url;
    currentUrl.innerText = jsonData[i].url;
  } catch(error) {
    textDiv.removeChild(currentUrl);
    console.error(error);
    console.log('URLis virhe');
  }

  try {
    description.innerText = jsonData[i].description;
  } catch(error) {
    console.error(error);
    console.log('description virhe');
  }

  try {
    img.src = jsonData[i].img;
  } catch(error) {
    textDiv.removeChild(img);
    console.error(error);
    console.log('imagessa virhe');
  }

  setActive(jsonData[i].name);
  textDiv.style.overflow = 'hidden';
  /*switch(jsonData[i].name) {
    case 'Karttapalvelu':
      menu1.classList.add("active");
      break;
    case 'Luontoreitit':
      menu2.classList.add("active");
      break;
    case 'Sääpalvelu':
      menu3.classList.add("active");
      break;
    case 'Tekijätiedot':
      menu4.classList.add("active");
      break;
  }*/
}

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

function handleTabletChange(e) {

  if (e.matches) {
    console.log('Pieni ruutu achieved!')
    textDiv.classList.remove('col-9');
    textDiv.classList.add('col-10');

    aboutMenu.classList.remove('col-3');
    aboutMenu.classList.add('col-2');
    aboutMenu.style.padding = 0;
    textDiv.style.position = 'static';
    textDiv.style.left = '0';
  } else {

    handleMiniChange(mediaQuery2)
    /*console.log('Ison näytön tila!')
    textDiv.classList.remove('col-10');
    textDiv.classList.add('col-9');

    aboutMenu.classList.remove('col-2');
    aboutMenu.classList.add('col-3');*/
    //aboutMenu.style.padding = '0 10px 0 0';
  }
}

  mediaQuery.addListener(handleTabletChange);
  handleTabletChange(mediaQuery);

  mediaQuery2.addListener(handleMiniChange)
  handleMiniChange(mediaQuery2);

function handleMiniChange(e) {
  if (e.matches) {
    console.log('Pienin ruutu kaikista achieved!')

    textDiv.classList.remove('col-10');
    textDiv.classList.add('col-9');

    aboutMenu.classList.remove('col-2');
    aboutMenu.classList.remove('col-3');
    aboutMenu.classList.add('col-1');

    textDiv.style.position = 'relative';
    textDiv.style.left = '50px';
    aboutMenu.style.padding = '0px 10px 0px 0px';
  } else {
    console.log('Ison näytön tila!')

    textDiv.classList.remove('col-10');
    textDiv.classList.add('col-9');

    aboutMenu.classList.remove('col-1');
    aboutMenu.classList.remove('col-2');
    aboutMenu.classList.add('col-3');
    textDiv.style.position = 'static';
    textDiv.style.left = '0';
    aboutMenu.style.padding = '0px 10px 0px 0px';/*
    console.log('Pieni ruutu achieved!')
    textDiv.classList.remove('col-9');
    textDiv.classList.add('col-10');

    aboutMenu.classList.remove('col-1');
    aboutMenu.classList.add('col-2');
    textDiv.style.position = 'static';
    aboutMenu.style.left = 0;*/
    //aboutMenu.style.zIndex = 0;
  }
}