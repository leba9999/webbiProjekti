'use strict';

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
});

  const textDiv = document.querySelector('#textField');
  const menu1 = document.querySelector('#menuLi1');
  const menu2 = document.querySelector('#menuLi2');
  const menu3 = document.querySelector('#menuLi3');
  const menu4 = document.querySelector('#menuLi4');

  let topic = ['Karttapalvelu:', 'Luontoreitit:', 'Sääpalvelu:', 'Tekijät:'];

  menu1.addEventListener('click', showText);
  menu2.addEventListener('click', showText);
  menu3.addEventListener('click', showText);
  menu4.addEventListener('click', showText);

  const currentTopic = document.createElement('h3');
  currentTopic.innerText = topic[0];
  textDiv.appendChild(currentTopic);

  function showText(evt) {
    evt.currentTarget === menu1 ? currentTopic.innerText = topic[0]
        : evt.currentTarget === menu2 ? currentTopic.innerText = topic[1]
          : evt.currentTarget === menu3 ? currentTopic.innerText = topic[2]
            : evt.currentTarget === menu4 ? currentTopic.innerText = topic[3]
              : currentTopic.innerText = topic[0];
    //textDiv.appendChild(article);
}
