// Get forecasts array from localStorage
const weatherData = JSON.parse(localStorage.getItem('forecasts')) || [];
console.log("All forecasts: ", weatherData);

// Function to group the weather data by date
function groupByDate(data) {
    return data.reduce((acc, item) => {
        const date = item.date;
        if (!acc[date]) {
        acc[date] = [];
        }
        acc[date].push(item);
        return acc;
    }, {});
}

// Iterate through each second-level array, group by date, and maintain the nested structure
const nestedGroupedArray = weatherData.map(secondLevelArray => {
    const groupedByDate = groupByDate(secondLevelArray);
    return Object.keys(groupedByDate).map(date => groupedByDate[date]);
});

  // Check the final nested grouped array
console.log("Nested Grouped Array:", nestedGroupedArray);



// Light & Dark mode toggle
// Access toggle switch HTML element
const themeSwitcher = document.querySelector('#theme-toggle');
const setMode = document.querySelector('.set-theme');

// Set theme to persist after reload
let theme = JSON.parse(localStorage.getItem('theme'));

const setTheme = (theme) => {
    if (theme === 'dark') {
        setMode.setAttribute('class', 'dark');
    } else {
        setMode.setAttribute('class', 'light');
    }
};

setTheme(theme);

// Listen for a click event on toggle switch
themeSwitcher.addEventListener('click', function () {
    // If mode is dark, apply light background
    if (theme === 'dark') {
    theme = 'light';
    }
    // If mode is light, apply dark background
    else {
        theme = 'dark';
    }
    setTheme(theme);
    localStorage.setItem('theme', JSON.stringify(theme));
});

const displayCurrentForecast = function () {
    const currentForecast = nestedGroupedArray[0];
    console.log ("Current Day Forecast: ", currentForecast);

    const currentForecastContainer = document.querySelector('#current-forecast-container');

    // let highestTempText = '';
    // let lowestTempText = '';
    
    // currentForecast.forEach(dayArray => {
    //     dayHighestTempObj = dayArray[0];
    //     dayLowestTempObj = dayArray[0];

    //     dayArray.forEach(obj => {
    //         if (obj.temperature > dayHighestTempObj.temperature) {
    //             dayHighestTempObj = obj;
    //         }
    //         if (obj.temperature < dayLowestTempObj.temperature) {
    //             dayLowestTempObj = obj;
    //         }
    //     });

    //     highestTempText = `${dayHighestTempObj.temperature}`;
    //     lowestTempText = `${dayLowestTempObj.temperature}`;
    // });

    const currentCityDiv = document.querySelector('#current-city')
    const currentCity = document.createElement('h2');
    currentCity.textContent = currentForecast[0][0].city;

    currentCityDiv.appendChild(currentCity);
    
    currentForecast.forEach(dayArray => {
        const dayHighestTempObj = dayArray.reduce((prev, current) => (prev.temperature > current.temperature) ? prev : current);
        const dayLowestTempObj = dayArray.reduce((prev, current) => (prev.temperature < current.temperature) ? prev : current);

        const currentForecastCard = document.createElement('div');
        currentForecastCard.classList.add('card', 'm-3');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex','flex-column', 'justify-content-center');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'd-flex', 'justify-content-center');
        cardTitle.textContent = new Date(dayArray[0].date).toDateString();

        const highestTempText = `High: ${dayHighestTempObj.temperature}`;
        const lowestTempText = `Low: ${dayLowestTempObj.temperature}`;

        const cardText = document.createElement('p');
        cardText.classList.add('card-text', 'd-flex', 'justify-content-center');
        cardText.textContent = `${highestTempText}, ${lowestTempText}`;

        const iconUrl = dayArray;
        const icon = document.createElement('img');
        icon.classList.add('d-flex', 'justify-content-center')
        icon.src = dayArray[0].icon;

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        cardBody.appendChild(icon);

        currentForecastCard.appendChild(cardBody);
        currentForecastContainer.appendChild(currentForecastCard);
    });
}

displayCurrentForecast();

const renderPreviousForecasts = function () {
    const forecastHistoryContainer = document.querySelector('#forecast-history-list');

    const forecastHistoryListItem = document.createElement('li');
    const forecastHistoryButton = document.createElement('button');
    forecastHistoryButton.classList.add('btn', 'btn-secondary', 'btn-lg');
}