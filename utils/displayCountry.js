import getCountry from './getCountry.js';
import formatPopulation from './formatPop.js';

const countryContainer = document.querySelector('.country-container');
const BORDER_API = 'https://restcountries.com/v3.1/alpha/';

function displayCountry(country) {
  
  countryContainer.innerHTML = '';

  let {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages,
  } = country[0];
  let nativeName = Object.values(name.nativeName)[0].common;
  name = name.common;
  currencies = Object.values(currencies)[0].name;
  languages = Object.values(languages).join(', ');
  flags = flags.png;
  tld = tld.join(', ');
  population = formatPopulation(population);

  let borders = getBorders(country);

  let countryEl = document.createElement('div');
  countryEl.classList.add('country-container');
  countryEl.innerHTML = `
<img src="${flags}" alt="${name}" class="country-img" />

<div class="single-country-info">
<h1 class="home-country-name">${name}</h1>
<div class= "detail-container">
<div class="country-detail">
  <p>Native Name: <span>${nativeName}</span></p>
  <p>Population: <span>${population}</span></p>
  <p>Region: <span>${region}</span></p>
  <p>Sub Region: <span>${subregion}</span></p>
  <p>Capital: <span>${capital}</span></p>
</div>
<div class="country-detail">
  <p>Top Level Domain: <span>${tld}</span></p>
  <p>Currencies: <span>${currencies}</span></p>
  <p>Languages: <span>${languages}</span></p>
</div>
</div>

<div class="border">
  <p>Border Countries:</p>
  <div class="country-border">
  ${borders}
  </div>
</div>
<div>
  `;


  document.title = name;
  countryContainer.appendChild(countryEl);


  const BorderBtn = document.querySelectorAll('.single-country-border');
  BorderBtn.forEach((btn) =>
    btn.addEventListener('click', (e) => {
      localStorage.setItem('country', `${e.target.textContent}`);
      getCountry(BORDER_API + e.target.textContent);
    })
  );
}
function getBorders(country) {
  if (!country[0].borders) return `<p class="no-border">No borders</p>`;
  return country[0].borders
    .map((border) => `<div class="single-country-border">${border}</div>`)
    .join(' ');
}

export default displayCountry;
