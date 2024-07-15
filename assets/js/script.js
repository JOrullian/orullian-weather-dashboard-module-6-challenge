const formEl = document.querySelector('#form-input');
const cityInput = document.querySelector('.city-input');
const stateInput = document.querySelector('.state-input');
const countryInput = document.querySelector('.country-input');
const firstHalfApi = '62098b83f1a9969d'
const secondHalfApi = 'e04386130e975d5b'

const openWeatherMapApiKey = `${firstHalfApi}${secondHalfApi}` // API concatenate

// Obtain unit type (celsius/fahrenheit)
const getMeasurementUnits = function(units) {
    const unitsInput = document.querySelector('.measurement-input');
    const selectedUnits = unitsInput.value;

    // Convert measurementType inputs to be readable by API
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

    const cityName = cityInput.value.trim(); // Input city name in form

    // Separate inputs for stateInput and countryInput can be added if more specificity is desired. Need to also update html with field inputs.
    // const stateName = stateInput.value.trim();
    // const countryName = countryInput.value.trim();

    if (cityName) {
        getLocationApi(cityName) // Call getLocationApi function to obtain latitude, longitude and city name
            .then(function (weatherArray) {
                let forecasts = JSON.parse(localStorage.getItem('forecasts')) || [];
                forecasts.unshift(weatherArray); // Add each item from weatherArray as a new object in forecasts array
                localStorage.setItem('forecasts', JSON.stringify(forecasts));
                window.open("https://jorullian.github.io/orullian-weather-dashboard-module-6-challenge/query.html", "_target")
            })
            .catch(function (error) {
                console.error('Error fetching location and weather data:', error);
            });
    } else {
        alert('Please enter a city name'); // Error if cityInput left blank
    }
}

const getLocationApi = function (city) {
    const requestLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${openWeatherMapApiKey}`;

    return fetch(requestLocationUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function (data) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    const measurementType = getMeasurementUnits();

                    return getWeatherApi(latitude, longitude, measurementType, city); // Receive return from getWeatherApi function
                });
            }
        });
}

const getWeatherApi = function (latitude, longitude, measurementType, cityName) {
    const requestForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${measurementType}&appid=${openWeatherMapApiKey}`;

    return fetch(requestForecastUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function (data) {
                    let weatherArray = data.list.map(forecast => {
                        // Parameters for the weatherArray object
                        return {
                            city: cityName,
                            date: dayjs(forecast.dt_txt.split(' ')[0]).format('MMMM D YY'),
                            time: convertMilitaryto12Hr(forecast.dt_txt.split(' ')[1]),
                            temperature: forecast.main.temp,
                            humidity: forecast.main.humidity,
                            weather: forecast.weather[0].description,
                            windSpeed: forecast.wind.speed,
                            icon: convertIdToIcon(forecast.weather[0].icon)
                        };
                    });
                    console.log(weatherArray); // Used to easily verify if weatherArray object is created
                    return weatherArray; // Return ultimately sent to formSubmitHandler function
                });
            }
        });
}

const convertIdToIcon = function(iconId) {
    return `https://openweathermap.org/img/wn/${iconId}@2x.png`;
};    

function convertMilitaryto12Hr(militaryTime) {
    const timeArray = militaryTime.split(':');
    let hours = parseInt(timeArray[0]);
    let minutes = timeArray[1];

    let period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${hours}:${minutes} ${period}`;
}

// Function to open query.html with History button
const historyButton = document.querySelector('#history-button');
const openQueryHtml = function () {
        window.open("https://jorullian.github.io/orullian-weather-dashboard-module-6-challenge/query.html", "_blank");
}

// History button and form submit button event listeners
historyButton.addEventListener('click', openQueryHtml)
formEl.addEventListener('submit', formSubmitHandler);