// constants
const BASE_URL = 'https://restcountries.com/v3.1'; //всички базови дани се  намират  във  този адрес и се  взимат  от  там 

// elements
const countryTemplate = document.getElementById('country-template');
const countriesList = document.getElementById('countries-list');
const switchButtons = document.querySelector('.countries-list-switch');
const searchForm = document.getElementById('search-form');
const searchResultsList = document.getElementById('search-result-list');
const searchFormInput = searchForm.querySelector('input[name="country"]');

// request api
/*
fetch(`${BASE_URL}/all`)//това ни взима цялата  информациа 
.then(function(data){
   // console.log(data)
   return data.json()
})

.then(function(data){
    console.log(data)
}) //така  ни се  дава нашия  списък със дани (масиви) */

const api = function (path) {//това  ни звзима дани те  от API след  като го направим трябва да  го конзол логна  да  проверя дали работи 
    return fetch(`${BASE_URL}/${path}`).then((response) => (response.json()));
}

// api('region/europe')

//initial load
const loadRegion = function (region) {
    api(`region/${region}`)
        .then((data) => {
            console.log(data)
            renderCountries(data)
        })

}

loadRegion('europe')
// get country clone

// render countries

const renderCountries = (countries) =>{
    countries.forEach(country =>{
    const template = document.importNode(countryTemplate, true)//така  клонирам целиа div със  всички елементи във  него 

        template.removeAttribute('id');//така премахвам id  на  клонираните  елементи 
        template.classList.remove('d-none')//по този начин премахжаме  class от  клонираните  обекти 

        template.querySelector('.country-name').innerText = country.name.common ;//тези пропарти та  name and common ги взимам от главния  масив със  цялата информация  
        template.querySelector('.country-capital').innerText = country.capital; // така си взимам столицата от главния масив
        template.querySelector('.country-population').innerText = country.population.toLocaleString('bg-BG'); //това  прави цифрите  по стандарта  на  изписване  на  държавата 
        template.querySelector('.country-region').innerText = country.region;
        template.querySelector('.country-flag').setAttribute('src', country.flags.svg)  ; 



        countriesList.appendChild(template) ;//така  вкарвам взетата информациа във  избраня  div във  html елемента 

        // console.log(template)

    })
}

// load countries list

// list switcher

// load search results

// search form
