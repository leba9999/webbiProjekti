'use strict'

const nav = document.querySelector("nav");
const body = document.querySelector("body");

let filename = location.href.split('/').pop();

let files = ["etusivu.html", "kartta.html", "tietoa.html"];
let activefile = ["", "", "", ""];
for(let i = 0; i < files.length; i++){
    if(filename == files[i]){
        activefile[i] = "active";
    }
}
const html =
    `
    <nav>
        <ul class="navul">
            <li class="navli">
                <a class="${activefile[0]} nava" href=${files[0]}>etusivu</a>
            </li>
            <li class="navli">
                <a class="${activefile[1]} nava" href=${files[1]}>kartta</a>
            </li>
            <li class="navli">
                <a class="${activefile[2]} nava"href=${files[2]}>tietoa</a>
            </li>
        </ul>
    </nav>
    `;
if(nav != null){
    nav.innerHTML = html;
} 
else{
    body.innerHTML = (html + body.innerHTML);
}