const apiKey = "17e36330ced40e4b4f33203cff1ac693";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try {
        const resp = await fetch(url(city));
        const respData = await resp.json();
        addWeatherToPage(respData);
    } catch (error) {
        console.log('Error fetching weather data:', error);
    }
}

function addWeatherToPage(data) {
    const temp = Ktoc(data.main.temp);
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
        <h2><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /> ${temp}°C <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" /></h2>
        <small>${data.weather[0].main}</small>
    `;
    main.innerHTML = "";
    main.appendChild(weather);
}

function Ktoc(K) {
    return Math.floor(K - 273.15);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city.trim() !== '') {
        getWeatherByLocation(city);
    }
});
