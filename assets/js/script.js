const formEl = document.querySelector('#form-input');
const cityInput = document.querySelector('.city-input');
const stateInput = document.querySelector('.state-input');
const countryInput = document.querySelector('.country-input');
const measurementInput = document.querySelector('.measurement-input');
const apiKey = '62098b83f1a9969de04386130e975d5b';

// function getWeatherApi () {
//     const requestLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},${countryCode}&appid=${apiKey}`
//     const requestForecastUrl = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

// }

const formSubmitHandler = function (event) {
    event.preventDefault();

    const cityName = cityInput.value.trim();
    const stateName = stateInput.value.trim();
    const countryName = countryInput.value.trim();

}

formEl.addEventListener('submit', formSubmitHandler);