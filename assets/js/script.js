const formEl = document.querySelector('#form-input');
const cityInput = document.querySelector('.city-input');
const stateInput = document.querySelector('.state-input');
const countryInput = document.querySelector('.country-input');
const measurementInput = document.querySelector('.measurement-input');
const openWeatherMapApiKey = '62098b83f1a9969de04386130e975d5b';
const googleMapsApiKey = 'AIzaSyC4o_3wr-rxXJXUJeT88KC_Z7QVg6y1nOM';

const formSubmitHandler = function (event) {
    event.preventDefault();

    const cityName = cityInput.value.trim();
    // const stateName = stateInput.value.trim();
    // const countryName = countryInput.value.trim();

    if (cityName) {
        getLocationApi(cityName)
    } else {
        alert('Please enter a city name')
    }
}

const getLocationApi = function (city) {
    const requestLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${openWeatherMapApiKey}`

    fetch(requestLocationUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    console.log(latitude, longitude);
                });
            }
        })

}

const getWeatherApi = function (data) {
    const requestForecastUrl = `api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
}

formEl.addEventListener('submit', formSubmitHandler);