




function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function refreshWeather(response){
  let temperatureElement = document.querySelector("#current-temperature")
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  let date= new Date(response.data.time*1000);
  let iconElement = document.querySelector ("#icon");
  temperatureElement.innerHTML= Math.round(temperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = capitalize(response.data.condition.description);
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  windElement.innerHTML = `${Math.round(wind)} km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  getForecast(response.data.city)
}

  function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    
    if (minutes < 10) {
        minutes =`0${minutes}`
    }
   if (hours < 10) {
        hours =`0${hours}`
    }

    return `${day} ${hours}:${minutes}`
  }

function searchCity(city){
let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(refreshWeather);

}

function handleSearchSubmit(event){
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");

searchCity(searchInput.value)
}

function formatDay(timestamp){
    let date = new Date (timestamp*1000);
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return days [date.getDay()];
}

function getForecast (city) {
    let apiKey = "bd79ao40tde3dec118ca46bc3e6dd55f";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response){
let forecastHtml = "";


response.data.daily.forEach(function (day, index) {
        if (index < 5){
          forecastHtml = 
             forecastHtml + `
          
            <div class="col-2">
              <div class="weather-forecast-day">${formatDay(day.time)}</div>
              <img
                src="${day.condition.icon_url}" class="weather-forecast-icon"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)} </span>
                <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)} </span>
              
            </div>
            </div>
        `;
    }
});
let forecastElement = document.querySelector ("#weather-forecast");
forecastElement.innerHTML = forecastHtml;
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Porto");
