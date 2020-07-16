import API_KEY from './config'; // eslint-disable-line import/no-unresolved
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

const kelvinToCelsius = (kelvin) => Math.round(kelvin - 273.15);

const kelvinToFahrenheit = (kelvin) => Math.round(((kelvin - 273.15) * 9) / 5 + 32);

const getWeatherData = async (city, latitude = '', longitude = '') => {
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
      const city = weatherData.name;
      const { country } = weatherData.sys;
      const minTempRes = Number(weatherData.main.temp_min);
      const maxTempRes = Number(weatherData.main.temp_max);
      const tempRes = Number(weatherData.main.temp);

      const minTemp = fahrenheit ? kelvinToFahrenheit(minTempRes) : kelvinToCelsius(minTempRes);
      const maxTemp = fahrenheit ? kelvinToFahrenheit(maxTempRes) : kelvinToCelsius(maxTempRes);
      const temp = fahrenheit ? kelvinToFahrenheit(tempRes) : kelvinToCelsius(tempRes);

      return {
        weather, temp, minTemp, maxTemp, city, country,
      };
    }
    return { error: response.statusText };
  } catch (error) {
    return { error: error.message };
  }
};

const renderDegrees = (weatherData) => {
  tempDiv.textContent = `${weatherData.temp} ${fahrenheit ? ' ºF' : 'ºC'}`;
  minTempDiv.textContent = `Min: ${weatherData.minTemp} ${fahrenheit ? 'ºF' : 'ºC'}`;
  maxTempDiv.textContent = `Max: ${weatherData.maxTemp} ${fahrenheit ? 'ºF' : 'ºC'}`;
};

const render = (weatherData) => {
  if (weatherData.error) {
    cityInputError.textContent = weatherData.error;
    setTimeout(() => { cityInputError.textContent = ''; }, 2000);
  } else {
    cityCountryDiv.textContent = `${weatherData.city}, ${weatherData.country}`;
    weatherDiv.textContent = weatherData.weather;
    renderDegrees(weatherData);
    toggleContainerDiv.classList.remove('hidden');
  }
};

toggle.addEventListener('change', async (event) => {
  fahrenheit = event.target.checked;
  loading.style.display = 'block';
  const newWeatherData = await getWeatherData(cityCountryDiv.textContent);
  loading.style.display = 'none';
  render(newWeatherData);
});

const changeElements = async (event) => {
  const city = cityInput.value;
  if (city === '') {
    return;
  }
  event.preventDefault();
  loading.style.display = 'block';
  const weatherData = await getWeatherData(city);
  loading.style.display = 'none';
  render(weatherData);
};

const changeElementsByGeolocation = () => {
  navigator.geolocation.getCurrentPosition(async position => {
    const { latitude, longitude } = position.coords;
    loading.style.display = 'block';
    const weatherData = await getWeatherData(null, latitude, longitude);
    loading.style.display = 'none';
    render(weatherData);
  });
};

changeElementsByGeolocation();
cityBtn.addEventListener('click', changeElements);
