const formEl = document.querySelector('#form-input');
const cityInput = document.querySelector('.city-input');
const stateInput = document.querySelector('.state-input');
const countryInput = document.querySelector('.country-input');
const openWeatherMapApiKey = '62098b83f1a9969de04386130e975d5b';
const googleMapsApiKey = 'AIzaSyC4o_3wr-rxXJXUJeT88KC_Z7QVg6y1nOM';

const getMeasurementUnits = function(units) {
    const unitsInput = document.querySelector('.measurement-input');
    const selectedUnits = unitsInput.value;

    let measurementType;
    if (selectedUnits === 'celsius') {
        measurementType = 'metric';
    } else if (selectedUnits === 'fahrenheit') {
        measurementType = 'imperial';
    }
    return measurementType;
}

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
                    const cityNameData = data[0].name;
                    const stateNameData = data[0].state;
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;

                    const measurementType = getMeasurementUnits();

                    getWeatherApi(latitude, longitude, measurementType);
                    
                    console.log(cityNameData, stateNameData, latitude, longitude);
                });
            }
        })

}

const getWeatherApi = function (latitude, longitude, measurementType) {

    const requestForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${measurementType}&appid=${openWeatherMapApiKey}`;

    fetch(requestForecastUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(requestForecastUrl)
                    console.log(data);
                })
            }
        })
}

formEl.addEventListener('submit', formSubmitHandler);