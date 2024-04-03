import getCountries from "./utils/getCountries.js";
import color from "./utils/colorToggle.js";
import displayError from "./utils/displayError.js";
import colorLoad from "./utils/colorLoad.js";

const selectFilter = document.querySelector(".select-filter");
const filterHeader = document.querySelector(".filter-header");
const selectList = document.querySelector(".regions");
const form = document.getElementById("search-form");
const textInput = document.getElementById("country-name");


const ALL_API = "https://restcountries.com/v3.1/all";
const REGION_API = "https://restcountries.com/v3.1/region/";
const NAME_API = "https://restcountries.com/v3.1/name/";
const Search_API = "https://countries-api-v7sn.onrender.com/countries?search=${text}";

window.addEventListener("DOMContentLoaded", () => {
  getCountries(ALL_API);
  colorLoad();
});


selectList.addEventListener("click", getTheRegion);

function getTheRegion(e) {
  if (e.target.classList.contains("show")) return;
  getCountries(REGION_API + e.target.textContent);
}

form.addEventListener("submit", getTheName);

function getTheName(e) {
  e.preventDefault();
  getCountries(NAME_API + textInput.value);
  this.reset();
}

selectFilter.addEventListener("mouseenter", () => {
  selectList.classList.add("show");
});
selectFilter.addEventListener("mouseleave", () => {
  selectList.classList.remove("show");
});
