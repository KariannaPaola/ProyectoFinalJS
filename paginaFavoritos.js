const section= document.getElementById("seccion")
const personajesFavoritosGuardados = localStorage.getItem("PERSONAJES FAVORITOS");
let personajesFavoritos = JSON.parse(personajesFavoritosGuardados);
let statusPersonaje=""

 /**
 * @function eliminarFavoritos - funcion que permite eliminar un personaje del array de personajes favoritos, usando el metodo splice y guardando el personaje en LocalStorage. Contiene el @param index, el cual representa el indice del personaje seleccionado en el array.
 */
function eliminarFavoritos(index){
  personajesFavoritos.splice(index, 1)
  const favPersonajesString = JSON.stringify(personajesFavoritos); 
  localStorage.setItem("PERSONAJES FAVORITOS", favPersonajesString); 
  mostrarDataFavoritos(personajesFavoritos)

/**
 * @async @function mostrarDataFavoritos - funcion asincrona utilizada para mostrar los personajes favoritos en la pagina "Favoritos" . Contiene @param arrayFavoritos, el cual representa el array de personajes favoritos del usuario.
 */

}
function mostrarDataFavoritos(arrayFavoritos) { 
  if(personajesFavoritos.length==0){
    section.innerHTML="" 
    const dataMostradaFav=document.createElement("div") 
    dataMostradaFav.innerHTML=`<P class="font-extrabold text-[15px] text-green-100">Aun no tienes personajes favoritos añadidos</P>
    </div>` 
    section.appendChild(dataMostradaFav) 
    }else{
  section.innerHTML=""  
    arrayFavoritos.forEach(function(personaje,index){
      if(personaje.status==="Dead"){
      statusPersonaje="bg-red-500"
      }else if(personaje.status==="Alive"){
      statusPersonaje="bg-green-700"
      }else{
      statusPersonaje="bg-neutral-400"
      } 
    dataMostradaFav=document.createElement("div") 
    dataMostradaFav.innerHTML=`<div class="bg-gray-900 flex flex-col justify-center w-auto items-center rounded-[30px] border-[2px] border-solid border-green-600 gap-1 relative pb-[10px] ">
    <img class="w-auto h-auto rounded-t-[30px]" src=${personaje.image} alt="" srcset="">
    <P class="font-extrabold text-[15px] text-green-100 ">${personaje.name}</P>
    <P class="${statusPersonaje} pr-[10px] pl-[10px] rounded-[20px] font-bold ">${personaje.status}</P>
    <P class="text-white font-bold text-[13px]">${personaje.species}</P>
    <P class="text-white  font-bold text-[13px]">Gender:${personaje.gender}</P>
    <button class="btnEliminar absolute top-3 right-5" onclick="eliminarFavoritos(${index})"><i class="fa-solid fa-xmark fa-2x eliminar"></i></button>
    </div>` 
    section.appendChild(dataMostradaFav) 
  });
}}

mostrarDataFavoritos(personajesFavoritos)   