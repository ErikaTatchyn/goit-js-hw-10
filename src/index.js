import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

const handleSearch = debounce(value => {
  fetchCountries(value)
    .then(countries => {
      countryList.innerHTML = '';
      for (let country of countries) {
        console.log(country);
        const li = document.createElement('li');
        li.innerHTML = `
        <h3>${country.name.official}</h3>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <img src=${
          country.flags.svg
        } alt=${`Flag of ${country.name.official}`} />
        <p>Languages: ${Object.values(country.languages)}</p>
      `;
        countryList.appendChild(li);
      }
    })
    .catch(error => console.log(error));
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', e => {
  handleSearch(e.target.value);
});
