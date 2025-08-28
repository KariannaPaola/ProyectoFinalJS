/**
 * @const seccion - seccion del html donde se agregaran las tarjeta de los personajes
 * @const btnNext y @const btnPrev - botones utilizados para navegar entre paginas.
 * @let personajesFavoritos = Array que contiene los personajes favoritos 
 * @let numeroPagina = variable utilizada para realizar la paginacion con el incremento +1 o el decremento -1
 *@let statusPersonaje= variable utilizada para indicar con el color verde o rojo si un perosnaje esta vivo o no.
 */

const seccion= document.getElementById("seccion")
const btnNext=document.getElementById("btnNext")
const btnPrev=document.getElementById("btnPrev")
const parrafoSiguiente=document.getElementById("parrafoSiguiente")
const parrafoAnterior=document.getElementById("parrafoAnterior")
const personajesFavoritosGuardados = localStorage.getItem("PERSONAJES FAVORITOS");
let numeroPagina=1; 
let statusPersonaje=""
let personajesFavoritos = JSON.parse(personajesFavoritosGuardados);
  if(personajesFavoritos===null){
      personajesFavoritos=[]
    }

 /**
 * @function anadirFavoritos - funcion que permite añadir un nuevo personaje al array de personajes favoritos, usando el metodo push y guardando el personaje en LocalStorage, tambien contiene el metodo find que verifica que el array no contenga ya el personaje que se quiere agregar. Esta funcion es llamada al hacer click en el boton de favorito. Contiene @param personaje, el cual representa cada uno de los elementos del array que contiene la API.
 */

function anadirFavoritos (personaje){ 
const personajesAgregados= personajesFavoritos.find((p) => p.id === personaje.id);
  if(personajesAgregados !== undefined){
    alert("Este personaje ya fue añadido a tu lista de personajes favoritos")
  }else  {
    personajesFavoritos.push(personaje) 
    const favPersonajesString = JSON.stringify(personajesFavoritos); 
    localStorage.setItem("PERSONAJES FAVORITOS", favPersonajesString); 
    alert (personaje.name + " se agrego exitosamente a Personajes Favoritos " )
  }

}
/**
 * @async @function getData - funcion asincrona utilizada para obtener los datos de la API
 */

async function getData(link) {
  try {
    const apiUrl= await fetch(link)
    const data= await apiUrl.json()  
    return data
  }catch (error) {
    console.log("Error al obtener datos " + error) 
  }
}

/**
 * @async @function mostrarData - funcion asincrona utilizada para mostrar los personajes de la API. Contiene @param pagina, el cual representa el numero de pagina en la que se encuentra el usuario. Contiene el metodo forEach para iterar en cada uno de los elementos de la API
 */

async function mostrarData(pagina) {
  numeroPagina=pagina
  const paginaAct=`https://rickandmortyapi.com/api/character?page=${numeroPagina}`
  seccion.innerHTML=""  
  const arrayData= await getData(paginaAct)
  arrayData.results.forEach(function(personaje) {
    if (personaje.status==="Dead"){
      statusPersonaje="bg-red-500"
    }else if(personaje.status==="Alive"){
      statusPersonaje="bg-green-700"
    }else{
      statusPersonaje="bg-neutral-400"
    }
    const dataMostrada=document.createElement("div")
    dataMostrada.innerHTML=`<div class="bg-gray-900 flex flex-col justify-center w-auto items-center rounded-[30px] border-[2px] border-solid border-green-600 gap-1 relative pb-[10px]">
    <img class="w-auto h-auto rounded-t-[30px]" src=${personaje.image} alt="" srcset="">
    <P class="font-extrabold text-[15px] text-green-100 ">${personaje.name}</P>
    <P class="${statusPersonaje} pr-[10px] pl-[10px] rounded-[20px] font-bold ">${personaje.status}</P>
    <P class="text-white font-bold text-[13px]">${personaje.species}</P>
    <P class="text-white  font-bold text-[13px]">Gender:${personaje.gender}</P>
    <button class="btnFavorito absolute top-3 right-5"><i class="fa-solid fa-heart fa-2x corazon"></i></button>
    </div>` 
    const btnFavorito=dataMostrada.querySelector(".btnFavorito")
    btnFavorito.addEventListener('click', () => {anadirFavoritos (personaje)});
    seccion.appendChild(dataMostrada)});
    if(paginaAct===`https://rickandmortyapi.com/api/character?page=1`){
      btnPrev.style.display = 'none'
      parrafoAnterior.style.display = 'none'
    }else{ 
      btnPrev.style.display = 'block'
      parrafoAnterior.style.display = 'flex'
    }
    if(paginaAct===`https://rickandmortyapi.com/api/character?page=42`){
      btnNext.style.display = 'none' 
      parrafoSiguiente.style.display = 'none'
    }else{ 
      btnNext.style.display = 'block'
      parrafoSiguiente.style.display = 'flex'
    } 
}

btnNext.addEventListener('click', () => {mostrarData(numeroPagina+1)} );
btnNext.style.color = 'white'

btnPrev.addEventListener('click', () => {mostrarData(numeroPagina-1)} );
btnPrev.style.color = 'white'

mostrarData(numeroPagina)




