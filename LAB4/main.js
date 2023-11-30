document.addEventListener("DOMContentLoaded", function () {
  
  const getLocationButton = document.getElementById("currentLocationButton");
  const searchButton = document.getElementById("searchButton");
  const searchLocationInput = document.getElementById("locationInput");

  getLocationButton.addEventListener("click", getCurrentLocation);
  searchButton.addEventListener("click", searchLocation);

  function getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getSunriseSunsetInfo(latitude, longitude);
    document.getElementById("locName").innerHTML= "Chicago";
  }

  function errorCallback(error) {
    console.error("Error getting current location:", error);
    alert("Error getting current location. Please try again or use the search option.");
  }

  function searchLocation() {
    const locationName = searchLocationInput.value;

    if (locationName) {
      geocodeLocation(locationName);
    } else {
      alert("Please enter a location to search.");
    }
  }

  function geocodeLocation(locationName) {
    const geocodeUrl = `https://geocode.maps.co/search?q=${locationName}`;

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
    // console.log("location function")
    //console.log(data)
    // console.log(data[0].lat)
    // console.log(data[0].lon)
    document.getElementById("locName").innerHTML= data[0].display_name;
        if (data.length > 0) {
          const latitude = data[0].lat;
          const longitude = data[0].lon;
          console.log(latitude)
          console.log(longitude)

          getSunriseSunsetInfo(latitude, longitude);
        } else {
          alert("Location not found. Please try again.");
        }
      })
      .catch(error => alert("Location not found. Please try again."));
  }


  function getSunriseSunsetInfo(latitude, longitude) {
    const sunriseSunsetUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}`;

    fetch(sunriseSunsetUrl)
      .then(response => response.json())
      .then(data => {
        console.log("LOCATION")
        console.log(data)
        const today = data.results;
        document.getElementById("tz").innerHTML= today.timezone;
        document.getElementById("todayDate").innerHTML= today.date;
        document.getElementById("sunriseToday").innerHTML= today.sunrise;
        document.getElementById("sunsetToday").innerHTML= today.sunset;
        document.getElementById("dawnToday").innerHTML= today.dawn;
        document.getElementById("duskToday").innerHTML= today.dusk;
        document.getElementById("dayLengthToday").innerHTML= today.day_length;
        document.getElementById("solarNoonToday").innerHTML= today.solar_noon;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        console.log(tomorrowFormatted)

        const tomorrowSunriseSunsetUrl = `https://api.sunrisesunset.io/json?lat=${latitude}&lng=${longitude}&date=${tomorrowFormatted}`;

        fetch(tomorrowSunriseSunsetUrl)
          .then(response => response.json())
          .then(tomorrowData => {
            console.log("LOCATION tomorrowData")
            console.log(tomorrowData)
            const tomorrowResults = tomorrowData.results;
            document.getElementById("tommDate").innerHTML= tomorrowResults.date;
            document.getElementById("sunriseTomorrow").innerHTML= tomorrowResults.sunrise;
            document.getElementById("sunsetTomorrow").innerHTML= tomorrowResults.sunset;
            document.getElementById("dawnTomorrow").innerHTML= tomorrowResults.dawn;
            document.getElementById("duskTomorrow").innerHTML= tomorrowResults.dusk;
            document.getElementById("dayLengthTomorrow").innerHTML= tomorrowResults.day_length;
            document.getElementById("solarNoonTomorrow").innerHTML= tomorrowResults.solar_noon;

            
          })
          .catch(error => console.error("Error fetching tomorrow's sunrise/sunset data:", error));
      })
      .catch(error => console.error("Error fetching today's sunrise/sunset data:", error));
  }

  

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
});
