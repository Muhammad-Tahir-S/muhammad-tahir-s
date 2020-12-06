var api = "https://weather-proxy.freecodecamp.rocks/api/current?";
var lon, lat;
var tempCels;
var unit = 'C';

$( document ).ready(function(){
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      var lon = "lon=" + position.coords.longitude;
      var lat = "lat=" + position.coords.latitude;
      getWeather(lon, lat);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
  
  $("#unit").click(function () {
    var currentUnit = $("#unit").text();
    var newUnit = currentUnit == "C" ? "F" : "C";
    $("#unit").text(newUnit);
    if (newUnit == "F") {
      var fahUnit = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
      $("#temp").text(fahUnit + " " + String.fromCharCode(176));
    } else {
      $("#temp").text(tempCels + " " + String.fromCharCode(176));
    }
  });
  
})




function getWeather(lon, lat) {
  var urlString = api + lat + "&" + lon;
  $.ajax({
    url: urlString, success: function (value) {
      $("#city").text(value.name + ", ");
      $("#country").text(value.sys.country + ", ");
      tempCels = Math.round(value.main.temp);
      $("#temp").text(tempCels + " " + String.fromCharCode(176));
      $("#unit").text(unit);
      $("#state").text(value.weather[0].main);
      icon(value.weather[0].main);     
    }
  });
}

function icon(state) {
  var state = state.toLowerCase()
  switch(state) {
      case 'clouds':
        addIcon(state)
        break;
      case 'rain':
        addIcon(state)
        break;
      case 'snow':
        addIcon(state)
        break;
      case 'sun':
        addIcon(state)
        break;
    default:
      $('div.clouds').removeClass('hide');
  }
}

function addIcon(state) {
  $('div.' + state).removeClass('hide');
}