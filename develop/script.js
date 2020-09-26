//setting time and date
$("#top-date").text(moment().format("MMM Do YYYY"));
$("#top-time").text(moment().format("LT"));

//reloading time and date every second
setInterval(function () {
  $("#top-date").text(moment().format("MMM Do YYYY"));
  $("#top-time").text(moment().format("LT"));
}, 1000);

var APIKey = "166a433c57516f51dfab1f7edaed8413";
var city = "Red Deer";
var lat = "";
var lon = "";

// Here we are building the URL we need to query the database
var queryURL =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=` +
  APIKey;

// We then created an AJAX call
$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  $("#temp").append(`Temp: ${response.main.temp} Celcius`);
  $("#cityDisplay").append(`City: ${response.name}`);
  $("#wind").append(`Wind: ${response.wind.speed} m/s`);
  $("#humid").append(`Humidity: ${response.main.humidity}%`);
  lat = response.coord.lat;
  lon = response.coord.lon;
  console.log(lat, lon);

  var UvURL =
    `http://api.openweathermap.org/data/2.5/uvi?lat=52.27&lon=-113.8&appid=` +
    APIKey;

  $.ajax({
    url: UvURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#uv").append(`UV Index: ${response.value}`);
  });
});
