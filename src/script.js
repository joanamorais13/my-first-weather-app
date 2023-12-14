




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
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(refreshWeather);

}

function handleSearchSubmit(event){
event.preventDefault();
let searchInput = document.querySelector("#search-form-input");

searchCity(searchInput.value)
}

function displayForecast(){
   

let days = ["Tue","Wed","Thu","Fri","Sat"];
let forecastHtml = "";

days.forEach(function(day) {
    forecastHtml = forecastHtml + `
          
            <div class="col-2">
              <div class="weather-forecast-day">${day}</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">18º </span>
                <span class="weather-forecast-temperature-min">12º </span>
              
            </div>
            </div>
        `;
});
let forecastElement = document.querySelector ("#weather-forecast");
forecastElement.innerHTML = forecastHtml;
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Porto");
displayForecast();