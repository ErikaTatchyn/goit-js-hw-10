import './css/styles.css';
import { fetchCountries } from './fetchCountries';
const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchFormEl = document.querySelector('#search-box');
const countryCardWrapperEl = document.querySelector('.country-info');

const onSearchFormInput = event => {
  event.preventDefault();

  const searchedQuery = event.target.elements.user_country.value.trim();

  fetchCountries(searchedQuery)
    .then(data => {
      console.log(data);

      countryCardWrapperEl.innerHTML = createCountryCard(data);
    })
    .catch(err => {
      if (err.message === '404') {
        alert('Oops, there is no country with that name');
      }
    });
};

const debouncedOnSearchFormInput = debounce(onSearchFormInput, DEBOUNCE_DELAY);
searchFormEl.addEventListener('input', debouncedOnSearchFormInput);
