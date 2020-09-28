//setting time and date
$("#top-date").text(moment().format("MMM Do YYYY"));
$("#top-time").text(moment().format("LT"));

//reloading time and date every second
setInterval(function () {
  $("#top-date").text(moment().format("MMM Do YYYY"));
  $("#top-time").text(moment().format("LT"));
}, 1000);

moment().format("MMM Do YYYY");

var APIKey = "166a433c57516f51dfab1f7edaed8413";
var lat = "";
var lon = "";
var cityName = "";
if (!localStorage.lastCity) {
  cityName = "Toronto";
} else {
  cityName = localStorage.lastCity;
}
var cityArray = [];
var cityHistory = [];

getWeather();
//calls weather API
function getWeather() {
  // Here we are building the URL we need to query the database
  var queryURL =
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=` +
    APIKey;

  // We then created an AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#temp").html(`Temp: ${response.main.temp} \xB0C`);
    $("#cityDisplay").html(`${response.name}`);
    $("#wind").html(`Wind: ${response.wind.speed} m/s`);
    $("#humid").html(`Humidity: ${response.main.humidity}%`);
    $("#icon").html(
      `<img class="ml-5" src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"/>`
    );

    lat = response.coord.lat;
    lon = response.coord.lon;

    var DailyURL =
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=` +
      APIKey;

    $.ajax({
      url: DailyURL,
      method: "GET",
    }).then(function (response) {
      $("#temp1").html(`Temp: ${response.daily[1].temp.day} \xB0C`);
      $("#date1").text(moment().add(1, "days").format("MMM Do YYYY"));
      $("#humid1").html(`Humidity: ${response.daily[1].humidity}%`);
      console.log(response);
      $("#img1").html(
        `<img src="http://openweathermap.org/img/wn/${response.daily[1].weather[0].icon}@2x.png"/>`
      );

      $("#temp2").html(`Temp: ${response.daily[2].temp.day} \xB0C`);
      $("#date2").text(moment().add(2, "days").format("MMM Do YYYY"));
      $("#humid2").html(`Humidity: ${response.daily[2].humidity}%`);
      $("#img2").html(
        `<img src="http://openweathermap.org/img/wn/${response.daily[2].weather[0].icon}@2x.png"/>`
      );

      $("#temp3").html(`Temp: ${response.daily[3].temp.day} \xB0C`);
      $("#date3").text(moment().add(3, "days").format("MMM Do YYYY"));
      $("#humid3").html(`Humidity: ${response.daily[3].humidity}%`);
      $("#img3").html(
        `<img src="http://openweathermap.org/img/wn/${response.daily[3].weather[0].icon}@2x.png"/>`
      );

      $("#temp4").html(`Temp: ${response.daily[4].temp.day} \xB0C`);
      $("#date4").text(moment().add(4, "days").format("MMM Do YYYY"));
      $("#humid4").html(`Humidity: ${response.daily[4].humidity}%`);
      $("#img4").html(
        `<img src="http://openweathermap.org/img/wn/${response.daily[4].weather[0].icon}@2x.png"/>`
      );

      $("#temp5").html(`Temp: ${response.daily[5].temp.day} \xB0C`);
      $("#date5").text(moment().add(5, "days").format("MMM Do YYYY"));
      $("#humid5").html(`Humidity: ${response.daily[5].humidity}%`);
      $("#img5").html(
        `<img src="http://openweathermap.org/img/wn/${response.daily[5].weather[0].icon}@2x.png"/>`
      );
    });

    var UvURL =
      `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=` +
      APIKey;

    $.ajax({
      url: UvURL,
      method: "GET",
    }).then(function (response) {
      $("#uvNum").text(`${response.value}`);
      console.log(response.value);
      if (response.value < 2) {
        $("#uvNum").attr("class", "btn btn-success");
      } else if (response.value >= 2 && response.value <= 5) {
        $("#uvNum").attr("class", "btn btn-warning");
      } else if (response.value > 5 && response.value <= 7) {
        $("#uvNum").attr("class", "btn btnOrange");
      } else if (response.value >= 8 && response.value <= 10) {
        $("#uvNums").attr("class", "btn btn-danger");
      }
    });
  });
}

function reSubmit(city) {
  cityName = city;
  getWeather();
}

$("#searchButton").on("click", function () {
  cityName = $("#cityName").val();
  getWeather();
  saveCity();
});

function saveCity() {
  localStorage.lastCity = cityName;
  var cityList = JSON.parse(localStorage.cityList || "[]");
  cityList.push(cityName);
  localStorage.cityList = JSON.stringify(cityList);

  cityHistory = JSON.parse(localStorage.cityList);
  document.getElementById("cityHistory").innerHTML = ``;

  for (var i = 0; i < cityHistory.length; i++) {
    document.getElementById(
      "cityHistory"
    ).innerHTML += `<a class="list-group-item list-group-item-action" onClick="reSubmit('${cityHistory[i]}')">${cityHistory[i]}</a>`;
  }
}
