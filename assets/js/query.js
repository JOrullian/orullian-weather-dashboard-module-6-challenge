let forecastArray = JSON.parse(localStorage.getItem('forecasts')) || [];

// Light & Dark mode toggle
// Access toggle switch HTML element
const themeSwitcher = document.querySelector('#theme-toggle');
const setMode = document.querySelector('.set-theme');

// Set default mode to dark
let mode = 'dark';

// Listen for a click event on toggle switch
themeSwitcher.addEventListener('click', function () {
    // If mode is dark, apply light background
    if (mode === 'dark') {
    mode = 'light';
    setMode.setAttribute('class', 'light');
    }
    // If mode is light, apply dark background
    else {
        mode = 'dark';
        setMode.setAttribute('class', 'dark');
    }
});

const getForecastsFromStorage = function () {
    const forecasts = JSON.parse(localStorage.getItem('forecasts')) || [];

}

const displayCurrentForecast = function () {
    const currentForecastContainer = document.querySelector('#current-forecast');

    const currentForecastDiv = document.createElement('div');
    const currentForecastCity = document.createElement('h2');
    
    const currentForecastDaysDiv = document.createElement('div');
    const currentForecastDate = document.createElement('h3');
    const currentForecastTime = document.createElement('p');
    const currentForecastTemperature = document.createElement('p');
    const currentForecastHumidity = document.createElement('p');
    const currentForecastWeather = document.createElement('p');
    const currentForecastWindSpeed = document.createElement('p');
    const currentForecastIcon = document.createElement('img');

}

const renderPreviousForecasts = function () {
    const forecastHistoryContainer = document.querySelector('#forecast-history-list');

    const forecastHistoryListItem = document.createElement('li');
    const forecastHistoryCity = document.createElement('h2');
}