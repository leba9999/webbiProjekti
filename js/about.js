'use strict';

const jsonDir = 'https://raw.githubusercontent.com/leba9999/webbiProjekti/master/json/webProject.json';
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

  let topic = ['Karttapalvelu', 'Luontoreitit', 'Sääpalvelu', 'Tekijät'];

  menu1.addEventListener('click', showText);
  menu2.addEventListener('click', showText);
  menu3.addEventListener('click', showText);
  menu4.addEventListener('click', showText);

  const currentTopic = document.createElement('h3');
  const currentUrl = document.createElement('a');
  let description = document.createElement('p');
  const img = document.createElement('img');

  textDiv.appendChild(currentTopic);
  textDiv.appendChild(currentUrl);
  textDiv.appendChild(description);
  textDiv.appendChild(img);

  function showText(evt) {
  let i = 0;

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
    console.error(error);
    console.log('URLis virhe');
  }

  try {
    description = jsonData[i].description;
  } catch(error) {
    console.error(error);
    console.log('description virhe');
  }

  try {
    img.src = jsonData[i].img;
  } catch(error) {
    console.error(error);
    console.log('imagessa virhe');
  }
}
