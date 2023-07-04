// constants
const BASE_URL = 'https://restcountries.com/v3.1'; 

// elements
const countryTemplate = document.getElementById('country-template');
const countriesList = document.getElementById('countries-list');
const switchButtons = document.querySelector('.countries-list-switch');
const searchForm = document.getElementById('search-form');
const searchResultsList = document.getElementById('search-result-list');
const searchFormInput = searchForm.querySelector('input[name="country"]');

// request api


const api = function (path) { 

    NProgress.start(); 

    return fetch(`${BASE_URL}/${path}`)  

        .then((response) => response.json())
        .catch(error => console.log(error))
        .finally(() => NProgress.done()) 


}



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
    const template = document.importNode(countryTemplate, true) 

    template.removeAttribute('id');
    template.classList.remove('d-none')
    template.querySelector('.country-name').innerText = country.name.common; 
    template.querySelector('.country-capital').innerText = country.capital; 
    template.querySelector('.country-population').innerText = country.population.toLocaleString('bg-BG');  
    template.querySelector('.country-region').innerText = country.region;
    template.querySelector('.country-flag').setAttribute('src', country.flags.svg);

    return template;
}

// render countries

const renderCountries = (countries, toElement) => {
    toElement.innerHTML = ''
    countries.forEach(country => {

        const htmlTemlate = getCountryHtml(country)
        toElement.appendChild(htmlTemlate); 

       
    })
}



// list switcher

switchButtons.addEventListener('click', function (event) {

    const buttonEl = event.target
    const region = buttonEl.dataset.region
    loadRegion(region)

    switchButtons.querySelector('.active').classList.remove('active');
    buttonEl.classList.add('active') 


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
    const inputValue = searchFormInput.value; 
    loadSearchList(inputValue)
    //get input value
})