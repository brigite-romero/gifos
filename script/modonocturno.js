//modo oscuro
const classmode = document.getElementById('body');
const seccionmn = document.getElementById('darkmode');
const seccionmd = document.getElementById('mododiurno');

if (localStorage.getItem('darkmode') == 'true') {
	classmode.classList.add('darkmode');
} else {
	classmode.classList.remove('darkmode');
}

function darkmode (){
    classmode.classList.add('darkmode');
    localStorage.setItem('darkmode', true);
}

function daymode (){
    classmode.classList.remove('darkmode');
    localStorage.setItem('darkmode', false);
}

seccionmn.addEventListener('click', darkmode);
seccionmd.addEventListener('click', daymode);

