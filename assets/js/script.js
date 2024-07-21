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
            .then(function ([weatherFiveDayArray, weatherCurrentArray]) {
                let currentForecasts = JSON.parse(localStorage.getItem('currentForecasts')) || [];

                currentForecasts = currentForecasts.filter(currentForecast => currentForecast[0]?.city !== cityName); // Remove any existing object with the same cityName

                currentForecasts.unshift(weatherCurrentArray); // Add each item from weatherCurrentArray as a new object in forecasts array

                // Only allow 15 most recent forecasts to occupy array
                if (currentForecasts.length > 15) {
                    currentForecasts = currentForecasts.slice(0, 15);
                };

                localStorage.setItem('currentForecasts', JSON.stringify(currentForecasts));

                let fiveDayForecasts = JSON.parse(localStorage.getItem('fiveDayForecasts')) || [];

                fiveDayForecasts = fiveDayForecasts.filter(fiveDayForecast => fiveDayForecast[0]?.city !== cityName); // Remove any existing object with the same cityName

                fiveDayForecasts.unshift(weatherFiveDayArray); // Add each item from weatherFiveDayArray as a new object in forecasts array

                // Only allow 15 most recent forecasts to occupy array
                if (fiveDayForecasts.length > 15) {
                    fiveDayForecasts = fiveDayForecasts.slice(0, 15);
                };

                localStorage.setItem('fiveDayForecasts', JSON.stringify(fiveDayForecasts));
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
    const requestLocationUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${openWeatherMapApiKey}`;

    return fetch(requestLocationUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function (data) {
                    const latitude = data[0].lat;
                    const longitude = data[0].lon;
                    const measurementType = getMeasurementUnits();

                    const fiveDayWeatherPromise = getFiveDayWeatherApi(latitude, longitude, measurementType, city); // Receive return from getFiveDayWeatherApi function
                    const currentWeatherPromise = getCurrentWeatherApi(latitude, longitude, measurementType, city); // Receive return from getCurrentWeatherApi

                    return Promise.all([fiveDayWeatherPromise, currentWeatherPromise]);
                });
            }
        });
}

const getFiveDayWeatherApi = function (latitude, longitude, measurementType, cityName) {
    const requestForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${measurementType}&appid=${openWeatherMapApiKey}`;

    return fetch(requestForecastUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json().then(function (data) {
                    let weatherFiveDayArray = data.list.map(forecast => {
                        // Parameters for the weatherFiveDayArray object
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
                    console.log(weatherFiveDayArray); // Used to easily verify if weatherFiveDayArray object is created
                    return weatherFiveDayArray; // Return ultimately sent to formSubmitHandler function
                });
            }
        });
}

const getCurrentWeatherApi = function (latitude, longitude, measurementType, cityName) {
    const requestCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${measurementType}&appid=${openWeatherMapApiKey}`

    return fetch(requestCurrentUrl)
        .then(function (response) {
            if(response.ok) {
                return response.json().then(function (data) {
                    console.log(data);
                    let weatherCurrentArray = {
                        // Parameters for the weatherCurrentArray object
                            city: cityName,
                            temperature: data.main.temp,
                            humidity: data.main.humidity,
                            weather: data.weather[0].description,
                            windSpeed: data.wind.speed,
                            icon: convertIdToIcon(data.weather[0].icon)
                    };
                    
                    console.log(weatherCurrentArray); // Used to easily verify if weatherCurrentArray object is created
                    return weatherCurrentArray; // Return ultimately sent to formSubmitHandler function
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