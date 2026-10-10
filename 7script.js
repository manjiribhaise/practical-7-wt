async function getWeather() {
    let city = document.getElementById("city").value;
    let result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "Please enter a city name!";
        return;
    }

    try {
        result.innerHTML = "Loading...";

        // Get city coordinates
        let url1 = "https://geocoding-api.open-meteo.com/v1/search?name="
                   + encodeURIComponent(city) + "&count=1";

        let response1 = await fetch(url1);
        let data1 = await response1.json();

        if (!data1.results) {
            result.innerHTML = "City not found!";
            return;
        }

        let place = data1.results[0];
        let lat = place.latitude;
        let lon = place.longitude;

        // Get weather data
        let url2 = "https://api.open-meteo.com/v1/forecast?latitude="
                   + lat + "&longitude=" + lon
                   + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m";

        let response2 = await fetch(url2);
        let data2 = await response2.json();

        result.innerHTML =
            "<h2>" + place.name + "</h2>" +
            "<p>Temperature: " +
            data2.current.temperature_2m + " °C</p>" +
            "<p>Humidity: " +
            data2.current.relative_humidity_2m + "%</p>" +
            "<p>Wind Speed: " +
            data2.current.wind_speed_10m + " km/h</p>";

    } catch (error) {
        result.innerHTML = "Error fetching weather data!";
    }
}