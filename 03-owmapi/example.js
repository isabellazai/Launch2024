// STEP 1: Copy the OWMGeocode and other OWM .js files into your website
// STEP 2: Enter your API key below (uncomment)
// STEP 3: Uncomment the resources for your website
// STEP 4: Write the load functions to perform each step
// STEP 5: Call the load1() function when the weather should load

//const APIKEY = "APIKEYHERE";
//let units = "imperial";

// RESOURCES (Uncomment for each .js file)
// let owmGeocode = new OWMGeocode(APIKEY);
// let owmWeather = new OWMWeather(APIKEY, units);
// let owmForecast = new OWMForecast(APIKEY, units);
// let owmPollution = new OWMPollution(APIKEY);


//    load1()  -->  load2()  -->  load3()
//     |             |             |
//     Get location  |             Display weather
//                   Get weather from location

function load1() {
    const locationBox = document.getElementById("location");
    owmGeocode.city = locationBox.value;
    owmGeocode.request(load2); // link to second function
}

function load2() {
    owmWeather.lat = owmGeocode.getLat();
    owmWeather.lon = owmGeocode.getLon();
    owmWeather.request(load3); // link to third function
}

function load3() {
    const weatherReport = document.getElementById("weather-report");
    // See display.js for more examples
    weatherReport.innerHTML = `Weather report for ${owmGeocode.city}: ${owmWeather.json.weather[0].description}`;

    let temperature = owmWeather.json.main.feels_like;
    if (temperature < 60) {
        document.body.style.backgroundColor = " lightblue";
    }
    else if (temperature < 75) {
         document.body.style.backgroundColor = "limegreen"
    }
    else {
         document.body.style.backgroundColor = "darkred";
    }
}