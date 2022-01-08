function dateFormat(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${day}  ${hours}:${minutes}`;
}

function getWeather(response) {
  console.log(response);

  let currentCity = document.querySelector("#city");
  let currentTemperature = document.querySelector("#temp");
  let currentDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#windSpeed");
  let currentDate = document.querySelector("#current-date");
  let icon = document.querySelector("#weatherIcon");

  celsiusTemp = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  currentTemperature.innerHTML = Math.ceil(response.data.main.temp);
  currentDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.ceil(response.data.wind.speed);
  currentDate.innerHTML = dateFormat(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
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

let today = document.querySelector("#current-date");
let newTime = new Date();
today.innerHTML = dateFormat(newTime);

let inputSearch = document.querySelector("#enterCity");
inputSearch.addEventListener("submit", searchInput);

displayCity("Toronto");
