// Selectores
const inputIn = document.querySelector('.input');
const all = document.querySelector('#paises');
const info = document.querySelector('#info');
const infoMore = document.querySelector('#info-more');

let countries = [];

const getCountries = async () => {
  try {
    const respuesta = await (await fetch('https://restcountries.com/v3.1/all')).json();
    countries = respuesta;
  } catch (error) {
    console.log(error);
  }

}
getCountries();


inputIn.addEventListener('input', async e => {


  const filtrado = countries.filter(name => name.name.common.toLowerCase().startsWith(e.target.value.toLowerCase()));
  info.innerHTML = '';
  infoMore.innerHTML = '';
  let infoHTML= '';

    if (filtrado.length === 0 ){
      info.innerHTML = `
      <p> No existen paises por esa busqueda </p>
      `
    }
    else if(filtrado.length > 10) {

      infoMore.innerHTML += `
        <p class="info-paises"> Muchos paises</p>
        `

    } else if (filtrado.length === 1) {
    const clain = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${filtrado[0].latlng[0]}&lon=${filtrado[0].latlng[1]}&appid=8f34169f4b90140d83b5baedd9753685&units=metric`)).json();
    const tempetatura = clain.main.temp; 
    const imagen = clain.weather[0].icon;

    const country =   filtrado[0]; //FILTRA AL PAÍS 
      const pais = country.name.common;
      const timezones = country.timezones[0];
      const capital = country.capital;
      const poblacion = country.population;
      const idioma = country.languages ? Object.values(country.languages).join(', ') : 'No se encontraron idiomas';
      const continente = country.region;
      const bandera = country.flags.svg;

    infoHTML = `
          <div id="informacion">
              <img class="banderas" src=${bandera} alt="${pais}">
          </div>
          <div class="descripcion">
              <h3 class="titulo-pais">${pais}</h3>
              <p class="nombres">${capital}</p>
              <p class="nombres">${poblacion}</p>
              <p class="nombres">${timezones}</p>
              <p class="nombres">${idioma}</p>
              <p class="nombres">${continente}</p>
              <div class="icons"> 
                  <img class="clain-icon" src= "https://openweathermap.org/img/wn/${imagen}@2x.png">
                  <p class="info-country"> ${tempetatura}°</p>
              </div>
          </div>
      `;
    } else  {
      filtrado.forEach(country => {
        const pais = country.name.common;
        const bandera = country.flags.svg;
      //console.log(element.flags.svg);
      //console.log(element.name.common);
      infoHTML += ` 
       <div class="conta-car"
       <div class="card">
          <img class="banderas" src=${bandera}>
          <h3 class="titulo-pais">${pais}</h3>
        </div>
       
        `;
    });
  }
  all.innerHTML = infoHTML;

});







