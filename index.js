const cityInput = document.getElementById('city-input');
const cityInputError = document.getElementById('city-input-error');
const cityBtn = document.getElementById('city-btn');
const tempDiv = document.getElementById('temp');
const cityCountryDiv = document.getElementById('city-country');
const minTempDiv = document.getElementById('min-temp');
const maxTempDiv = document.getElementById('max-temp');
const weatherDiv = document.getElementById('weather');
const toogle = document.getElementById('toogle');
const loading = document.getElementById("loading");
const toggleContainerDiv = document.getElementById('toggle-container');
let fahrenheit = false;

const weatherImages = {
  cloudy: 'https://images.unsplash.com/photo-1533388021507-c0524ab8b0bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
  rainy: 'https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1189&q=80',
  sunny: 'https://images.unsplash.com/photo-1500320821405-8fc1732209ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
}



function kelvinToCelsius(kelvin){
  return Math.round(kelvin - 273.15);
}

function celsiusToFahrenheit(celsius){
  return Math.round((celsius * 9/5) + 32);
}


async function getWeatherData(city, latitude = '', longitude = '') {
  try{
    let response;
    if(city){
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    } else if(latitude !== '' && longitude !== '') {
      response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    } else {
      return;
    }
    
    if(response.status === 200){
      const weatherData = await response.json();
      const weather = weatherData.weather[0].main;
      const minTempC = kelvinToCelsius(Number(weatherData.main.temp_min));
      const maxTempC = kelvinToCelsius(Number(weatherData.main.temp_max));
      const minTempF = celsiusToFahrenheit(minTempC);
      const maxTempF = celsiusToFahrenheit(maxTempC);
      const city = weatherData.name;
      const country = weatherData.sys.country;
      const tempC = kelvinToCelsius(Number(weatherData.main.temp));
      const tempF = celsiusToFahrenheit(tempC);

      return { weather, tempF, tempC, minTempF, minTempC, maxTempF, maxTempC, city, country };
    }
    return { error: response.statusText }
  } catch (error) {
    return { error: error.message }
  }
}


async function changeElements(event){
  const city = cityInput.value;
  if(city === '') {
    return;
  }
  event.preventDefault();
  loading.style.display = 'block';
  const weatherData = await getWeatherData(city);
  loading.style.display = 'none';
  render(weatherData);
}

function render(weatherData){
  if(weatherData.error) {
    cityInputError.textContent = weatherData.error;
    setTimeout(() => {cityInputError.textContent = ''}, 2000);

  } else {
    console.log('I have the data', weatherData);
    cityCountryDiv.textContent = `${weatherData.city}, ${weatherData.country}`;
    weatherDiv.textContent = weatherData.weather;
    renderDegrees(weatherData);

    toggleContainerDiv.classList.remove('hidden');
    toggle.addEventListener('change', () => {
      fahrenheit = event.target.checked;
      renderDegrees(weatherData);
    });
  }
  
}

function renderDegrees(weatherData){
  tempDiv.textContent = `${fahrenheit ? weatherData.tempF + ' ºF' : weatherData.tempC + ' ºC' }`;
  minTempDiv.textContent = `Min: ${fahrenheit ? weatherData.minTempF + ' ºF' : weatherData.minTempC + ' ºC' }`;
  maxTempDiv.textContent = `Max: ${fahrenheit ? weatherData.maxTempF + ' ºF' : weatherData.maxTempC + ' ºC' }`;
}

cityBtn.addEventListener('click', changeElements);

const a = navigator.geolocation.getCurrentPosition(async position => {
  const { latitude, longitude } = position.coords;
  loading.style.display = 'block';
  const weatherData = await getWeatherData(null, latitude, longitude);
  loading.style.display = 'none';
  render(weatherData);
});

