var today = moment().format("ddd, MMMM Do");
var searchBtn = document.querySelector(".search-button");
var searchEntry = document.querySelector(".input");
var cityName = localStorage.getItem("cityNameStore");

var apiKey = "&appid=ba1183e07f8507a06a0f7789be56d651"; //api key allows us to request info
var todaysWeatherUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" + //allows user to request current weather info and future forecast info for whatever city they search.
  cityName +
  "&units=imperial" +
  apiKey;
var futureWeatherUrl =
  "https://api.openweathermap.org/data/2.5/forecast?q=" +
  cityName +
  "&units=imperial" +
  apiKey;

//currently stores city name in local storage. My Tutor and I attempted to create the list under the search bar of searched cities but we weren't able to figure it out.
//i plan on returning to this app down the road and finding a solution.

let storedWeather = JSON.parse(localStorage.getItem("weather")) || [];

function saveCityInfo() {
  localStorage.setItem("cityNameStore", searchEntry.value);
}

$.ajax({
  url: todaysWeatherUrl,
  method: "GET",
}).then(function (response) {
  console.log(response); //logs response object in the console. all info about searched city can be viewed in console.
  let nameOfCity = response.name;
  let cityTemp = response.main.temp;
  let windSpeed = response.wind.speed;
  let humidity = response.main.humidity;

  _updateStorageWeather(nameOfCity, cityTemp, windSpeed, humidity);

  _generateCityList();

  $(".city").html("<h1>" + response.name + "</h1>"); //displays searched city's current day weather info. Displays weather icon, wind speed, humidity, and temperature.
  $(".weather-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.weather[0].icon +
      ".png' >"
  );
  $(".wind").text("Wind Speed: " + response.wind.speed + " mph");
  $(".humidity").text("Humidity: " + response.main.humidity + "%");
  $(".temp").text("Temperature: " + response.main.temp + " F");
});

const _generateCityList = () => {};

const _updateStorageWeather = () => {};

function displayToday() {
  $(".todays-date").text(today);
}
displayToday();

$.ajax({
  url: futureWeatherUrl,
  method: "GET",
}).then(function (response) {
  var firstDay = moment(response.list[0].dt_txt).format("ddd, MMMM Do"); //future forecast day 1 info displayed. Weather Icon, Temperature, and Humidity displayed for each day.
  $(".day-one-temp").text("Temperature: " + response.list[0].main.temp + " F");
  $(".day-one-date").html("<h5>" + firstDay + "</h5>");
  $(".day-one-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[0].weather[0].icon +
      ".png' alt='Icon that describes weather condition.'>"
  );
  $(".day-one-humidity").text(
    "Humidity: " + response.list[0].main.humidity + "%"
  );

  var secondDay = moment(response.list[8].dt_txt).format("ddd, MMMM Do"); //future forecast day 2 info displayed
  $(".day-two-temp").text("Temperature: " + response.list[8].main.temp + " F");
  $(".day-two-date").html("<h5>" + secondDay + "</h5>");
  $(".day-two-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[8].weather[0].icon +
      ".png' alt='Icon that describes weather condition.'>"
  );
  $(".day-two-humidity").text(
    "Humidity: " + response.list[8].main.humidity + "%"
  );

  var thirdDay = moment(response.list[16].dt_txt).format("ddd, MMMM Do"); //future forecast day 3 info displayed
  $(".day-three-temp").text(
    "Temperature: " + response.list[16].main.temp + " F"
  );
  $(".day-three-date").html("<h5>" + thirdDay + "</h5>");
  $(".day-three-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[16].weather[0].icon +
      ".png' alt='Icon that describes weather condition.'>"
  );
  $(".day-three-humidity").text(
    "Humidity: " + response.list[16].main.humidity + "%"
  );

  var fourthDay = moment(response.list[24].dt_txt).format("ddd, MMMM Do"); //future forecast day 4 info displayed
  $(".day-four-temp").text(
    "Temperature: " + response.list[24].main.temp + " F"
  );
  $(".day-four-date").html("<h5>" + fourthDay + "</h5>");
  $(".day-four-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[24].weather[0].icon +
      ".png' alt='Icon that describes weather condition.'>"
  );
  $(".day-four-humidity").text(
    "Humidity: " + response.list[24].main.humidity + "%"
  );

  var fifthDay = moment(response.list[32].dt_txt).format("ddd, MMMM Do"); ////future forecast day 5 info displayed
  $(".day-five-temp").text(
    "Temperature: " + response.list[32].main.temp + " F"
  );
  $(".day-five-date").html("<h5>" + fifthDay + "</h5>");
  $(".day-five-icon").html(
    "<img src='https://openweathermap.org/img/w/" +
      response.list[32].weather[0].icon +
      ".png' alt='Icon that describes weather condition.'>"
  );
  $(".day-five-humidity").text(
    "Humidity: " + response.list[32].main.humidity + "%"
  );
});

searchBtn.addEventListener("click", saveCityInfo);
