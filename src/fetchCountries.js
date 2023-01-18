const BASE_URL = 'https://restcountries.com/v3.1';
const API_KEY = '95632b02f9162f375a368971925f5209';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}/all?fields=name.official,capital,population,flags.svg,languages
  `).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
