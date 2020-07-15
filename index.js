async function getWeatherData(city) {
  try{
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
    if(response.status === 200){
      const weatherData = await response.json();
      const weather = weatherData.weather[0].main;
      const temp = weatherData.main.temp;
      const tempMin = weatherData.main.temp_min;
      const tempMax = weatherData.main.temp_max;
      const city = weatherData.name;
      const country = weatherData.sys.country;
      return { weather, temp, tempMin, tempMax, city, country };
    }
    return { error: response.statusText }
  } catch (error) {
    return { error: error.message }
  }
}


async function changeElements(){
  const city = 'porto ferreira'
  const loading = document.getElementById("teste");
  loading.style.display = 'block';
  const weatherData = await getWeatherData(city);
  loading.style.display = 'none';
  if(weatherData.error) {
    console.log(weatherData.error);
  }else {
    console.log('I have the data', weatherData);
  }
}

const btn = document.getElementById('btn');
btn.addEventListener('click', changeElements);

const a = navigator.geolocation.getCurrentPosition(position => {
  const { latitude, longitude } = position.coords;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => console.log(data))
});

