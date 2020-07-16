import API_KEY from './config';
import './style.css';

const cityInput = document.getElementById('city-input');
const cityInputError = document.getElementById('city-input-error');
const cityBtn = document.getElementById('city-btn');
const tempDiv = document.getElementById('temp');
const cityCountryDiv = document.getElementById('city-country');
const minTempDiv = document.getElementById('min-temp');
const maxTempDiv = document.getElementById('max-temp');
const weatherDiv = document.getElementById('weather');
const toggle = document.getElementById('toggle');
const loading = document.getElementById('loading');
const toggleContainerDiv = document.getElementById('toggle-container');
let fahrenheit = false;

function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function celsiusToFahrenheit(celsius) {
  return Math.round((celsius * 9) / 5 + 32);
}


async function getWeatherData(city, latitude = '', longitude = '') {
  try {
    let response;
    if (city) {
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`); // eslint-disable-line no-undef
    } else if (latitude !== '' && longitude !== '') {
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`); // eslint-disable-line no-undef
    } else {
      return { error: 'Invalid parameters' };
    }

    if (response.status === 200) {
      const weatherData = await response.json();
      const weather = weatherData.weather[0].main;
      const minTempC = kelvinToCelsius(Number(weatherData.main.temp_min));
      const maxTempC = kelvinToCelsius(Number(weatherData.main.temp_max));
      const minTempF = celsiusToFahrenheit(minTempC);
      const maxTempF = celsiusToFahrenheit(maxTempC);
      const city = weatherData.name;
      const { country } = weatherData.sys;
      const tempC = kelvinToCelsius(Number(weatherData.main.temp));
      const tempF = celsiusToFahrenheit(tempC);

      return {
        weather, tempF, tempC, minTempF, minTempC, maxTempF, maxTempC, city, country,
      };
    }
    return { error: response.statusText };
  } catch (error) {
    return { error: error.message };
  }
}

function renderDegrees(weatherData) {
  tempDiv.textContent = `${fahrenheit ? `${weatherData.tempF} ºF` : `${weatherData.tempC} ºC`}`;
  minTempDiv.textContent = `Min: ${fahrenheit ? `${weatherData.minTempF} ºF` : `${weatherData.minTempC} ºC`}`;
  maxTempDiv.textContent = `Max: ${fahrenheit ? `${weatherData.maxTempF} ºF` : `${weatherData.maxTempC} ºC`}`;
}

function render(weatherData) {
  if (weatherData.error) {
    cityInputError.textContent = weatherData.error;
    setTimeout(() => { cityInputError.textContent = ''; }, 2000);
  } else {
    cityCountryDiv.textContent = `${weatherData.city}, ${weatherData.country}`;
    weatherDiv.textContent = weatherData.weather;
    renderDegrees(weatherData);

    toggleContainerDiv.classList.remove('hidden');
    toggle.addEventListener('change', (event) => {
      fahrenheit = event.target.checked;
      renderDegrees(weatherData);
    });
  }
}

async function changeElements(event) {
  const city = cityInput.value;
  if (city === '') {
    return;
  }
  event.preventDefault();
  loading.style.display = 'block';
  const weatherData = await getWeatherData(city);
  loading.style.display = 'none';
  render(weatherData);
}

function changeElementsByGeolocation() {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    loading.style.display = 'block';
    const weatherData = await getWeatherData(null, latitude, longitude);
    loading.style.display = 'none';
    render(weatherData);
  });
}

changeElementsByGeolocation();
cityBtn.addEventListener('click', changeElements);
