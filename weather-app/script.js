// 'https://rapidapi.com/worldapi/api/open-weather13'

const getWeatherData = (city) => {
  const URL = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1ba6171f76mshea340f7a46551fep17d9f1jsn9022890e3da4',
      'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
    }
  };

  const weatherPromise  = fetch(URL, options);
  return weatherPromise.then((response) => {
    return response.json();
  })
}

const searchCity = async () => {
  const city = document.getElementById('city-input').value;
  const data = await getWeatherData(city)
  showWeatherData(data)

  // getWeatherData(city)
  // .then((response)=>{
  //   showWeatherData(response);
  // }).catch((error)=>{
  //   console.log(error);
  //   console.log("Something happend");
  // })
}

const showWeatherData = (weatherData) => {
  const cityNameDiv = document.getElementById('city-name')
  const weatherTypeDiv = document.getElementById('weather-type')
  const tempDiv = document.getElementById('temp')
  const minTempDiv = document.getElementById('min-temp')
  const maxTempDiv = document.getElementById('max-temp')

  cityNameDiv.innerText = weatherData.location.city
  weatherTypeDiv.innerText = weatherData.current_observation.condition.text
  tempDiv.innerText = weatherData.current_observation.condition.temperature
  minTempDiv.innerText = weatherData.forecasts[0].low
  maxTempDiv.innerText = weatherData.forecasts[0].high
}
