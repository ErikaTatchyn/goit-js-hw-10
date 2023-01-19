import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const handleSearch = debounce(value => {
  fetchCountries(value)
    .then(countries => {
      if (countries.length > 10) {
        Notiflix.Notify.failure(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countries.length === 1) {
        countryList.innerHTML = '';
        const country = countries[0];
        countryInfo.innerHTML = `
        <h3>${country.name.official}</h3>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <img src=${
          country.flags.svg
        } alt=${`Flag of ${country.name.official}`} width="50px" height="auto" />
        <p>Languages: ${Object.values(country.languages).join(', ')}</p>
      `;
      } else if (countries.length >= 2) {
        countryInfo.innerHTML = '';
        countryList.innerHTML = '';
        for (let country of countries) {
          const li = document.createElement('li');
          li.innerHTML = `
            <img src=${
              country.flags.svg
            } alt=${`Flag of ${country.name.official}`} width="50px" height="auto" />
            <span>${country.name.official}</span>
          `;
          countryList.appendChild(li);
        }
      } else {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        Notiflix.Notify.Failure('Oops, there is no country with that name.');
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
}, DEBOUNCE_DELAY);

searchInput.addEventListener('input', e => {
  handleSearch(e.target.value);
});
