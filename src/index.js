function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed")
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    
    iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}" class ="weather-app-icon"/>`;

    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    
    getForecast(response.data.city);
}

function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days [date.getDay()];
    if (minutes < 10) {
        minutes = `0${minutes}`;
    } 
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
    let apiKey = "06b0f64a63552tbee14aof0301449fb0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#city");
    
    searchCity(searchInput.value);
}

function getForecast(city) {
    let apiKey = "06b0f64a63552tbee14aof0301449fb0";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
console.log(response.data);

    let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
    let forecastHTML = `<div class="row">`;
  
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">⛅</div>
    <div class="weather-forecast-temperatures">
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">18°</span>
        <span class="weather-forecast-temperature-min">12°</span>
      </div>
    </div>
  </div>
  
  `;
    });
  
    forecastHTML = forecastHTML + `</div>`;
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
  }

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris");
