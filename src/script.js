const formEl = document.querySelector('#form-input');
const cityInput = document.querySelector('.city-input');
const stateInput = document.querySelector('.state-input');
const countryInput = document.querySelector('.country-input');

console.log(openWeatherMapApiKey);

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
                    console.log(data);
                    let weatherArray = data.list.map(forecast => {
                        return {
                            date: dayjs(forecast.dt_txt.split(' ')[0]).format('MMMM D YY'),
                            time: forecast.dt_txt.split(' ')[1],
                            temperature: forecast.main.temp,
                            weather: forecast.weather[0].description,
                            windSpeed: forecast.wind.speed
                        };
                    });
                    console.log(weatherArray);
                })
            }
        });
}

formEl.addEventListener('submit', formSubmitHandler);