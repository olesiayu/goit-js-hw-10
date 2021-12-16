import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.querySelector('#search-box');
const countryListEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;


input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

    
function onSearch(e) {
    const searchQuery = e.target.value.trim();
        
    if (searchQuery === '')
    {clearMarkup();
        return}

        fetchCountries(searchQuery)
            .then(country => {
                if (country.length > 10) {
                    clearMarkup();
                    Notify.info("Too many matches found. Please enter a more specific name.");
                } else if (country.length <= 10 && country.length >= 2)
                {
                    renderCountryListMarkup(country);
                }
                else if (country.length === 1) {
                    renderCountryInfoMarkup(country);
                }
                else {clearMarkup();}              
            })
    .catch((error) => console.log(error));
}

  
function renderCountryInfoMarkup(array) {
    countryListEl.innerHTML = "";

    const countryMarkup =
        array.map(({ flags, name, capital, population, languages }) => {
            return `<div class="country">
  <img class="country-flag" src="${flags.svg}" alt="flag"/>
  <h2>${name.official}</h2></div>
  <div><p>Capital: ${capital}</p>
  <p>Population: ${population}</p>
  <p>Languages: ${Object.values(languages)}</p>
</div>`;
        }).join("");
    
    countryInfoEl.innerHTML = countryMarkup;
}


function renderCountryListMarkup(array) {
    countryInfoEl.innerHTML = "";

    const countryListMarkup =
        array.map(({ flags, name }) => {
            return `<li><div class="country">
  <img class="country-flag" src="${flags.svg}" alt="flag" />
  <h2>${name.official}</h2>
</div></li>`;
        }).join("");
    
    countryListEl.innerHTML = countryListMarkup;
}


function clearMarkup() {
    countryListEl.innerHTML = "";
    countryInfoEl.innerHTML = "";
}
    





