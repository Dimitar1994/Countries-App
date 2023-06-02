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

    NProgress.start(); //така  си зареждаме  lodara  преди това  сме  си заредили script and css фаил

    return fetch(`${BASE_URL}/${path}`)  //взима информациата от  сървара

        .then((response) => response.json())
        .catch(error => console.log(error))//това  е за да  дава гршка  ако нещо от саита  не  зареди
        .finally(() => NProgress.done()) //така казваш стоп на  lodara много е  важно къде  ще го сложим инче  няма да  работи 


}

// api('region/europe')

//initial load
const loadRegion = function (region) {
    api(`region/${region}`)
        .then((data) => {
            renderCountries(data, countriesList)
        })

}

loadRegion('europe')
// get country clone

const getCountryHtml = (country) => {
    const template = document.importNode(countryTemplate, true)//така  клонирам целиа div със  всички елементи във  него 

    template.removeAttribute('id');//така премахвам id  на  клонираните  елементи 
    template.classList.remove('d-none')//по този начин премахжаме  class от  клонираните  обекти 

    template.querySelector('.country-name').innerText = country.name.common;//тези пропарти та  name and common ги взимам от главния  масив със  цялата информация  
    template.querySelector('.country-capital').innerText = country.capital; // така си взимам столицата от главния масив
    template.querySelector('.country-population').innerText = country.population.toLocaleString('bg-BG'); //това  прави цифрите  по стандарта  на  изписване  на  държавата 
    template.querySelector('.country-region').innerText = country.region;
    template.querySelector('.country-flag').setAttribute('src', country.flags.svg);

    return template;
}

// render countries

const renderCountries = (countries, toElement) => {
    toElement.innerHTML = ''
    countries.forEach(country => {

        const htmlTemlate = getCountryHtml(country)
        toElement.appendChild(htmlTemlate);//така  вкарвам взетата информациа във  избраня  div във  html елемента 

        // console.log(template)

    })
}

// load countries list

// list switcher

switchButtons.addEventListener('click', function (event) {

    const buttonEl = event.target
    const region = buttonEl.dataset.region
    loadRegion(region)

    switchButtons.querySelector('.active').classList.remove('active');//премахва класа  фактически и стила на дадениая  бутон 
    buttonEl.classList.add('active') //слага  class  на  кликнати я  бутон


})





// load search results
const loadSearchList = (searchTerm) => {
    api(`name/${searchTerm}`)
        .then((data) => {
          renderCountries(data, searchResultsList)
        })
}
// search form
searchForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputValue = searchFormInput.value; //така  взимаме  информациата  която е  подадена  от  inputa
    loadSearchList(inputValue)
    //get input value
})