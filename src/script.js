function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElelment = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#day-time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  console.log(response.data);
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElelment.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_Url}" class="weather-app-icon"/>`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2352603ftcb0855f4834a619baabao7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "2352603ftcb0855f4834a619baabao7f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let searchFormElelment = document.querySelector("#search-form");
searchFormElelment.addEventListener("submit", handleSearchSubmit);

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thurs", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">☀️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15°</strong>
              </div>
              <div class="weather-forecast-temperature">9°</div>
            </div>
        </div>`;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
searchCity("Johannesburg");
