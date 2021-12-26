function dateFormat(event) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[event.getDay()];
  let hour = event.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = event.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let dateNow = `${day}  ${hour}:${minute}`;

  return dateNow;
}

function getWeather(response) {
  console.log(response);
  let currentCity = response.data.name;
  let currentTemperature = Math.ceil(response.data.main.temp);
  let weatherDescription = response.data.weather[0].main;
  let currentHumidity = response.data.main.humidity;
  let currentWind = Math.ceil(response.data.wind.speed);

  let h2 = document.querySelector("#city");
  h2.innerHTML = currentCity;

  let temperature = document.querySelector("#temp");
  temperature.innerHTML = currentTemperature;

  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = weatherDescription;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = currentHumidity;

  let windSpeed = document.querySelector("#windSpeed");
  windSpeed.innerHTML = currentWind;
}

function displayCity(city) {
  let apiKey = "d7088a793c0eff8a4e5e745c7821e6e9";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(getWeather);
}

function searchInput(event) {
  event.preventDefault();

  let city = document.querySelector("#typeCity").value;
  displayCity(city);
}

displayCity("Toronto");

let today = document.querySelector("#current-date");
let newTime = new Date();
today.innerHTML = dateFormat(newTime);

let inputSearch = document.querySelector("#enterCity");
inputSearch.addEventListener("submit", searchInput);
