let apiKey = 'e8d249f20e884a05a10173744251701';
let apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

async function getWeatherApi(enterCity) {
    document.querySelector('.loading').style.display = 'block'; // Show loading indicator
    let searchCity = `${apiUrl}${encodeURIComponent(enterCity)}`;
    try {
        let response = await fetch(searchCity);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        let gettingData = await response.json();
        console.log(gettingData);

        // Check if data is available
        if (gettingData && gettingData.location && gettingData.current) {
            document.querySelector('.city').textContent = gettingData.location.name;
            document.querySelector('.temperature').innerHTML = Math.floor(gettingData.current.temp_c) + '°C';
            document.querySelector('.humidity-speed').innerHTML = gettingData.current.humidity + '%';
            document.querySelector('.wind-speed').textContent = gettingData.current.wind_kph + ' km/h';

            // Dynamic weather image based on condition
            let weatherCondition = gettingData.current.condition.text.toLowerCase().replace(/\s+/g, '_');
            document.querySelector('.weather-img').src = `images/${weatherCondition}.png`;
        } else if (response.status == 400) {
            alert('City not found, please try again.');
        }

    } finally {
        document.querySelector('.loading').style.display = 'none'; // Hide loading indicator
    }
}

// Event listener for the search icon
document.querySelector('.s-img').addEventListener('click', () => {
    let enterCity = document.querySelector('.search-city').value.trim();
    if (enterCity) {
        getWeatherApi(enterCity); // Call the function with the city entered
    }
});

// Event listener for the input change (optional for live feedback)
document.querySelector('.search-city').addEventListener('click', (e) => {
    let enterCity = e.target.value.trim();
    if (enterCity) {
        getWeatherApi(enterCity); // Call the function with the city entered
    }
});
