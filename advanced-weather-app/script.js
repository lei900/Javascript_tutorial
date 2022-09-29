// Get DOM Elements
const currentTemperature = document.getElementById('currentTemp')
const weatherIcon = document.getElementById('weatherIcon')
const weatherDescription = document.getElementById('weatherDescription')
const windSpeed = document.getElementById('wind')
const windDirection = document.getElementById('windDir')
const lowestToday = document.getElementById('lowestToday')
const highestToday = document.getElementById('highestToday')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')
const sunrise = document.getElementById('sunrise')
const sunset = document.getElementById('sunset')
const sunriseRelative = document.getElementById('sunriseRelative')
const sunsetRelative = document.getElementById('sunsetRelative')
const userLocation = document.getElementById('location')
const time = document.getElementById('time')
const date = document.getElementById('date')
const searchInput = document.getElementById('searchInput')

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// fetch('https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=8109965e7254a469d08a746e8b210e1e&units=metric')
//   .then(response => response.json())
//   .then(data => console.log(data))

const getWeatherData = async () => {
  // Use the try-catch block to handle errors
  try {
    // Create a const that stores the user input from the searchbar or defaults back to 'Los Angeles' if left blank
    const city = searchInput.value || 'Tokyo'

    // Create 2 promises that call the APIs and pass in the city name
    // If the user haven't typed anything, use Los Angeles as default
    const currentWeather = new Promise(async (resolve, reject) => {
      try {
        const weatherApiData = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=metric`,
        )

        resolve(await weatherApiData.json())
      } catch (error) {
        reject()
      }
    })

    const forecast = new Promise(async (resolve, reject) => {
      try {
        const forecastApiData = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8109965e7254a469d08a746e8b210e1e&units=metric&cnt=10`,
        )

        resolve(await forecastApiData.json())
      } catch (error) {
        reject()
      }
    })

    // Using the Promise.all method, wait for both promises to resolve, and save the returned data in a variable
    const data = await Promise.all([currentWeather, forecast])

    // Now pass that data into the updateDom() function
    updateDom(data)
  } catch (error) {
    console.log(error)
  }
}

// Create a function that returns a cardinal direction based on the degree passed in
// Hint: Draw a Circle and Visualize each Direction First. It will help... A ton!
const getDirection = (degree) => {
  switch (true) {
    case degree < 22.5:
      return 'N'
    case degree < 67.5:
      return 'NE'
    case degree < 112.5:
      return 'E'
    case degree < 157.5:
      return 'SE'
    case degree < 202.5:
      return 'S'
    case degree < 247.5:
      return 'SW'
    case degree < 292.5:
      return 'W'
    case degree < 337.5:
      return 'NW'
  }
}

// Update each DOM element with the API data
const updateDom = (data) => {
  console.log('🔥 updating', data)

  currentTemperature.innerText = data[0].main.temp.toFixed(1)

  // Weather Icon
  // https://openweathermap.org/img/wn/API_RESPONSE_DATA@2x.png
  weatherIcon.src = `https://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`

  weatherDescription.innerText = data[0].weather[0].description

  windSpeed.innerText = data[0].wind.speed.toFixed(1)

  windDirection.innerText = getDirection(data[0].wind.deg)

  lowestToday.innerText = Math.round(data[0].main.temp_min)

  highestToday.innerText = Math.round(data[0].main.temp_max)

  pressure.innerText = data[0].main.pressure

  humidity.innerText = data[0].main.humidity

  // Save both Sunrise and Sunset time in a variable as Milliseconds
  // Hint: the data from the API is in seconds
  const sunriseTime_ms = new Date(data[0].sys.sunrise * 1000)
  const sunsetTime_ms = new Date(data[0].sys.sunset * 1000)

  // Use the Sunrise Time in Milliseconds to get Sunrise Time
  // use the .toLocaleString() method to get the time in a readable format
  sunrise.innerText = sunriseTime_ms.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })

  // Do the same for Sunset
  sunset.innerText = sunsetTime_ms.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })

  // Using timeago.js, create relative timestamps for both sunrise and sunset
  sunriseRelative.innerText = timeago.format(sunriseTime_ms)
  sunsetRelative.innerText = timeago.format(sunsetTime_ms)

  // Get the location of the user from the API
  userLocation.innerText = data[0].name

  // Get and format Current Time
  time.innerText = new Date(Date.now()).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })

  // Get and format Current Date
  date.innerText = new Date(Date.now()).toLocaleString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  // Call the renderChart function and pass in the list array of the 2nd object in the data array
  renderChart(data[1].list)
}

// Create a function that renders the chart
const renderChart = (data) => {
  // Store the DOM element that will hold the chart
  const myChart = echarts.init(document.getElementById('chart'))

  const option = {
    legend: {
      data: ['temperature'],
    },
    tooltip: {},
    xAxis: {
      data: data.map(item => item.dt_txt),
    },
    yAxis: {},
    series: [
      {
        type: 'line',
        smooth: true,
        areaStyle: {
          opacity: 0.5,
        },
        data: data.map(item => item.main.temp),
      },
    ],
  }

  // Using the given function from the documentation, generate the chart using the options above
  myChart.setOption(option)
}

// Call the getWeatherData function
getWeatherData()
