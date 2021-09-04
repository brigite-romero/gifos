//variables

const urlresultados = 'https://api.giphy.com/v1/gifs/search';
const urlsugerencias = 'https://api.giphy.com/v1/gifs/search/tags';
const api_key = 'GWh43EKcmjngwSbGuEUebGNcgiQmDelI';
let word = document.getElementById('inp-search');
let wordTwo = document.getElementById('inp-search-header');
const okBanner = document.getElementById('search');
const okHeader = document.getElementById('search-header');
const titulo = document.getElementById('titulo');
const banner = document.getElementById('cont-img');
const title = document.getElementById('title');
const resultados = document.getElementById('resultados');
const noResultados = document.getElementById('noResultados');
const vermas = document.getElementById('ver-mas');
let element =  document.getElementById('contResul');
let elementSug = document.getElementById('sugerencias');
let contResultados = document.getElementById('div-resultados');
let contSugerencias = document.getElementById('div-sugerencias');
let gif = document.getElementsByClassName('gif');
const buscar = document.getElementById('searchHeader');
const imgSugerencias = document.getElementById('img-search-active');
const closeSugerencias = document.getElementById('close-search');
const lineSugerencias = document.getElementById('line');
let limitcont = 1;

//Search header

function activarBuscador() {
	if (document.documentElement.scrollTop > 350) {
        buscar.style.display = "flex";
    }else{
        buscar.style.display = "none";
    }
}
window.addEventListener('scroll', activarBuscador);

//sugerencia de busquedas

async function sugerencias(){
    const wordBanner = word.value;
    const wordHeader = wordTwo.value;
    contSugerencias.removeChild(elementSug);
    elementSug = document.createElement("div");
    elementSug.className = "sugerencias";
    element.id = "sugerencias"
    contSugerencias.appendChild(elementSug);
    await fetch(`${urlsugerencias}?q=${wordBanner || wordHeader }&api_key=${api_key}&limit=5`)
    .then(response => response.json())
    .then(data => {
        for (i = 0; i < 4; i++){
            let resultados = data.data[i].name;
            let sugerencia = document.createElement("div");
            sugerencia.id = `sugerencia`;
            sugerencia.className = "sugerencia";
            elementSug.appendChild(sugerencia);
            sugerencia.innerHTML = `<img class="img" src="./assets/icon-search-gray.svg" alt="search">
                                    <p class="text" id="resultadoSugerencia${i}">${resultados}</p>`;
            okBanner.style.display = "none";
            imgSugerencias.style.display = "block";
            word.style.padding = "0 0 0 13px";
            closeSugerencias.style.display = "block";
            lineSugerencias.style.display = "block";
            elementSug.style.display = "block";
        }
    });
}  

word.addEventListener('keyup', sugerencias);

//buscar sugerencia
let wordthree = '';
document.onclick = captura_click;
	
function captura_click(e) {
	let idElement = e.target.id;
    let classElement = e.target.className;
    if (classElement === "text"){
        let mostrar = document.getElementById(`${idElement}`)
        wordthree = mostrar.innerHTML;
        word = '';
        traer(12);
    }
}

//Cerrar sugerencias

function close(){
    word = document.getElementById('inp-search');
    okBanner.style.display = "block";
    imgSugerencias.style.display = "none";
    word.style.padding = "0 0 0 50px";
    closeSugerencias.style.display = "none";
    lineSugerencias.style.display = "none";
    elementSug.style.display = "none"
}

closeSugerencias.addEventListener('click', close);

//resultados de busqueda

async function traer(limit){
    limitcont += 1;
    let wordBanner = word.value;
    let wordHeader = wordTwo.value;
    let wordSugerencia = wordthree;
    if (limit === 12){
        contResultados.removeChild(element);
        element = document.createElement("div");
        element.className = "resultadosObtenidos";
        element.id = "contResult"
        contResultados.appendChild(element);
    }
    banner.style.display = "none";
    title.style.display = "none";
    resultados.style.display = "flex";
    await fetch(`${urlresultados}?q=${wordBanner || wordHeader || wordSugerencia}&api_key=${api_key}&limit=48`)
    .then(response => response.json())
    .then(data => {
        if(data.data == ''){
            noResultados.style.display = "flex";
            vermas.style.display = "none";
            titulo.innerHTML = `<div class="line"></div>
            <p class="titulo">Lorem Ipsum</p>`
        }else{
            for (i = limit-12; i < limit; i++){
                let gifs = data.data[i].images.original.url;
                let tarGif = document.createElement("div");
                tarGif.id = "gif";
                tarGif.className = "gif";
                element.appendChild(tarGif);
                tarGif.innerHTML = `<img class="img-gif" src="${gifs}">`;
                noResultados.style.display = "none";
                vermas.style.display = "flex";
                titulo.innerHTML = `<div class="line"></div>
                <p class="titulo">${wordBanner || wordHeader || wordSugerencia}</p>`
            }
        }
    });
}  

okBanner.addEventListener('click',()=>traer(12));
okHeader.addEventListener('click',()=>traer(12));
vermas.addEventListener('click',()=>traer(limitcont * 12));
