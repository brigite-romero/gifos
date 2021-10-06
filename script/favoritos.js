let contResultados = document.getElementById('favoritosGuardados');
let array = localStorage.someFavorites;
let vermas = document.getElementById('ver-mas')
let noFavoritos = document.getElementById('noFavoritos')
let limitcont = 1;

async function traer(limit){
    limitcont += 1;
    var guardados = JSON.parse(array)
    console.log(guardados)
    noFavoritos.style.display = "none"
    for (i = limit-12; i < limit; i++){
        let gifs = guardados[i].images.original.url;
        let tarGif = document.createElement("div");
        tarGif.id = "gif";
        tarGif.className = "gif";
        contResultados.appendChild(tarGif);
        tarGif.innerHTML = `<img class="img-gif" src="${gifs}">`;
    }
    if(array == []){
        noFavoritos.style.display = "flex"
    }
}  

traer(12)
vermas.addEventListener('click',()=>traer(limitcont * 12));
