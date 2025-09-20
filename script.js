const api_key = "<Your api key>";
const api_url = "https://api.openweathermap.org/data/2.5/weather";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherCard = document.getElementById('weather-card');
const cityNameElem = document.getElementById('city-name');
const temperatureElem = document.getElementById('temperature');
const descriptionElem = document.getElementById('description');
const humidityElem = document.getElementById('humidity');
const windElem = document.getElementById('wind');
const weatherIconElem = document.getElementById('weather-icon');
const errorMsg = document.getElementById('error-msg');

//sample data
const sampleData = {
    name : "London",
    weather : [{
        main: "clouds",
        description : "Broken Clouds",
        icon : "04d"
    }],
    main: {
        temp : 16.5,
        humidity: 72
    },
    wind : {speed : 4.2}
};

const fetchWeather = async (city) => {
    try{
        const res = await fetch(`${api_url}?q=${encodeURIComponent(city)}&appid=${api_key}&units=metric`);

        if(!res.ok) throw new Error("City Not Found!");
        const data = await res.json();
        // console.log(data);
        displayWeather(data);
    } catch(err) {
        displayWeather(sampleData);
        showError(err);
    }
}

const showError = (msg) => {
    errorMsg.textContent = msg;
    errorMsg.style.display = '';
    weatherCard.style.display = 'none';
}

const displayWeather = (data) => {
    cityNameElem.textContent = data.name;
    temperatureElem.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElem.textContent = data.weather[0].description;
    humidityElem.textContent = `Humidity : ${data.main.humidity}%`;
    windElem.textContent = `Wind : ${data.wind.speed}`;
    weatherIconElem.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherIconElem.alt = data.weather[0].description;
    weatherCard.style.display = '';
    errorMsg.style.display = 'none';
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if(city) fetchWeather(city);
})

cityInput.addEventListener('keypress', e => {
    if(e.key === 'Enter' && cityInput.value.trim()) fetchWeather(cityInput.value.trim());
})

window.addEventListener('DOMContentLoaded', () => {
    displayWeather(sampleData);
})
