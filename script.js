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

async function getData(link) {
  try {
    const apiUrl= await fetch(link)
    const data= await apiUrl.json()  
    return data
  }catch (error) {
    console.log("Error al obtener datos " + error) 
  }
}

async function mostrarData(pagina) {
  numeroPagina=pagina
  const paginaAct=`https://rickandmortyapi.com/api/character?page=${numeroPagina}`
  console.log(paginaAct)
  seccion.innerHTML=""  
  const arrayData= await getData(paginaAct) 
  arrayData.results.forEach(function(personaje) {
    console.log(arrayData.results)
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




