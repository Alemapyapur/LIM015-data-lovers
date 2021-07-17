import { selectName,selectFilter, orderPokes,selectWeak,calc}
from './data.js';
// import data from './data/lol/lol.js';
import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';

//console.log(selectName,selectFilter,selectWeak,calc, data);

// redirecciona a los botones a las paginas
document.getElementById("btn-top").onclick = () => (window.open("inicio.html", "_self"));
document.getElementById("home").onclick = () => (window.open("index.html", "_self"));
document.getElementById("play").onclick = () => (window.open("https://www.pokemongo.com/es-la/"));

//funcion para los cards,llamando a imagenen name numero y size
function pokemonImage(numPoke, arrayPoke) {
    const way = arrayPoke[numPoke];
  //  console.log(way,'pokemon');
    let box = `
        <div class="column pokemon backgray" id="pokemon${way.num}" data-num="${way.num}" >
        <p class="numePoke">${way.num}</p>
        <p class="genPoke">${way.generation['name']}</p>
        <img class="pokes-img" src=${way.img}>
        <p class="namePoke">${way.name}</p>
        <p class="namePoke">CP: ${way.stats['max-cp']}</p>
        </div>
`;
    return box;
}

const imageHtml = (arrayPoke) => {
    let htmlCards = '';
    for (let i = 0; i < arrayPoke.length; i++) {
       // console.log("htmlCards");
htmlCards += pokemonImage(i, arrayPoke)
    }
    document.getElementById("div-pokes").innerHTML += htmlCards;
}

imageHtml(data.pokemon)


//abrir modal
const pokemons = document.getElementsByClassName("pokemon");
const loadModal = () => {
for (const pokemon of pokemons) {
    pokemon.onclick = () => {
    const id = pokemon.getAttribute("data-num");
    //console.log(id);
    openModal(id)
    };
}
}
loadModal();

const openModal = (index) => {
const way = data.pokemon.find(pokemon => pokemon.num== index)
//console.log(way);
// class="column-modal backgray" por class="extras"
let box2 = `
    <div class="extras" >
    <img src=${way.img}>
    <p>Nombre:${way.name}</p>
    <p>Tipo:${way.type}</p>
    <p>Huevos:${way.egg}</p>
    <p>Altura:${way.size['height']}</p>
    <p>Peso:${way.size['weight']}</p>
    <p>Debilidades:${way.weaknesses}</p>
    Pre evolucion:${way.evolution["prev-evolution"] ? way.evolution['prev-evolution'][0].name : "no hay evolucion"}<br>
    Siguiente evolucion:${way.evolution['next-evolution'] ? way.evolution['next-evolution'][0].name : "no hay evolucion"}
    <p>Generation:${way.generation['name']}</p>
    </div>`
let modal = document.getElementById("detalles");
let span = document.getElementsByClassName("close")[0];
modal.style.display = "block";
document.getElementById("modal1").innerHTML = box2;
span.onclick = () => {
    modal.style.display = "none";
}
window.onclick = (event) => {
    if (event.target === modal) {
    modal.style.display = "none";
    }
    (box2);
}
}

//limpiar
const clearForName = () => {
    document.getElementById("filter-type").value = "";
    document.getElementById("div-calc").innerHTML = "";
    document.getElementById("filter-weakness").value = "";
    document.getElementById("order-search").value = "";
}

const clearForType = () => {
    document.getElementById("name-pokemon").value = "";
    document.getElementById("filter-weakness").value = "";
    document.getElementById("order-search").value = "";
}

const clearForWeakness = () => {
    document.getElementById("name-pokemon").value = "";
    document.getElementById("filter-type").value = "";
    document.getElementById("div-calc").innerHTML = "";
    document.getElementById("order-search").value = "";
}

const clearForOrder = () => {
    document.getElementById("name-pokemon").value = "";
    document.getElementById("filter-type").value = "";
    document.getElementById("div-calc").innerHTML = "";
    document.getElementById("filter-weakness").value = "";
}

document.getElementById("name-pokemon").oninput = () => {
    const htmlCards = document.getElementById("div-pokes")
    htmlCards.innerHTML = ""
    const pokesName = document.getElementById("name-pokemon").value;
    const searched = selectName(data.pokemon, pokesName)
    imageHtml(searched)
    loadModal()
    clearForName()
 //   console.log(searched);
}
document.getElementById("filter-type").onchange = () => {
    const htmlCards = document.getElementById("div-pokes")
    htmlCards.innerHTML = ""
    const filterType = document.getElementById("filter-type").value;
    const filtered = selectFilter(data.pokemon, filterType)
  //  console.log(filtered,2);
    imageHtml(filtered)
    loadModal()
    clearForType()
    percent()
};
  //porcentaje por tipo del total
const percent = () => {
    const filterType = document.getElementById("filter-type").value;
    const result = calc(data.pokemon, filterType)
    document.getElementById("div-calc").innerHTML = `Tenemos ${result} % de pokemon de ese tipo .`
}

document.getElementById("filter-weakness").onchange = () => {
    const htmlCards = document.getElementById("div-pokes")
    htmlCards.innerHTML = ""
    const weakFilter = document.getElementById("filter-weakness").value;
    const searched = selectWeak(data.pokemon, weakFilter)
    imageHtml(searched)
    loadModal()
    clearForWeakness()
}

document.getElementById("order-search").onchange = () => {
    const htmlCards = document.getElementById("div-pokes")
    htmlCards.innerHTML = ""
    const searchOrder = document.getElementById("order-search").value
    //console.log(searchOrder);
    const ordered = orderPokes(data.pokemon, searchOrder)
    imageHtml(ordered)
    loadModal()
    clearForOrder()
}