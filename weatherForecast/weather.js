var LOCATE_BASE_URL = "http://api.openweathermap.org/data/2.5/weather?";
var URL_PARAMETERS = "&units=imperial&type=accurate&mode=json";
var IMAGE_URL = "http://openweathermap.org/img/w/";


    
window.onload=function(){getUserLocation();  };

//This function will get user location coordinates that 
//will be used by getWeatherData function
function getUserLocation() {
	alert("Enable Location Service on your device");
  if (navigator.geolocation) {
    var timeoutVal = 10 * 1000 * 1000;
    navigator.geolocation.getCurrentPosition(getWeatherData,
      display_error, {
        enableHighAccuracy: true,
        timeout: timeoutVal,
        maximumAge: 0
      });
  } else {
    alert("Geolocation is not supported by this browser");
  }
}


//This function that will handle errors to request. 
function display_error(error) {
  var errors = {
    1: 'Permission denied',
    2: 'Turn On your Location Service',
    3: 'Request timeout'
  };
 alert("Error: " + errors[error.code]);
	
}

//Make asynchronous request and get weather data using AJAX. 
function getWeatherData(position) {
  var TODAYS_WEATHER_API_URL = LOCATE_BASE_URL + "lat=" + position.coords.latitude 
          + "&lon=" + position.coords.longitude + URL_PARAMETERS 
          + "&APPID=301f627f30cd968f892bf374c1445463";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var obj = JSON.parse(xmlhttp.responseText);
      //Return HTML content of elements with specified id(s)
      document.getElementById("displaylocation").innerHTML =  obj.name+", "+obj.sys.country;
  document.getElementById("display_temp").innerHTML = "<img src='" + IMAGE_URL
			+ obj.weather[0].icon + ".png'>"+ obj.main.temp + " °F";
  document.getElementById("displayweatherinfo").innerHTML = obj.weather[0].description + "<br>" +
        "Humidity: " + obj.main.humidity + " % <br>" + "Pressure:  " + obj.main.pressure +" hPa<br>"
    + "Cloudiness: " + obj.clouds.all + " % <br>" +  "Wind Speed  "+obj.wind.speed+" m/s";

    }
  };
  
  xmlhttp.open("GET", TODAYS_WEATHER_API_URL , true);
  xmlhttp.send();

}








