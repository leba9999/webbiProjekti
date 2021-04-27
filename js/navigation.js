'use strict';

const body = document.querySelector('body');
const nav = document.createElement('nav');
const ul = document.createElement('ul');

let filename = location.href.split('/').pop();
filename = filename.split('?')[0];
console.log(`navigation.js: ${filename}`);

let siteTopic = ['Etusivu', 'Kartta', 'Tietoa'];
let files = ["etusivu.html", "kartta.html", "tietoa.html"];

body.appendChild(nav);
nav.appendChild(ul);
ul.classList.add('navul');

for(let j = 0; j < files.length; j++) {

    const li = document.createElement('li');
    const article = document.createElement('a');

    ul.appendChild(li);
    li.classList.add('navli');
    li.appendChild(article);
    article.classList.add('nava');
    article.href = files[j];
    article.textContent = siteTopic[j];

    if(filename === files[j]){
        article.classList.add("active");
    }
}