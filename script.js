const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key

const weatherIcons = {
  "Sunny": "images/weather-icons/sunny.png",
  "Partly Cloudy": "images/weather-icons/partly-cloudy.png",
  "Cloudy": "images/weather-icons/cloudy.png",
  "Rainy": "images/weather-icons/rainy.png",
  "Snowy": "images/weather-icons/snowy.png"
};

function getCurrentWeather(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      const weatherInfo = document.getElementById("current-weather");
      weatherInfo.querySelector("img").src = weatherIcons[data.weather[0].main];
      weatherInfo.querySelector("p:nth-child(2)").textContent = `${Math.round(data.main.temp - 273.15)}°C`; // Convert Kelvin to Celsius
      weatherInfo.querySelector("p:nth-child(3)").textContent = data.weather[0].main;
      weatherInfo.querySelector("p:nth-child(4)").textContent = `Humidity: ${data.main.humidity}%`;
      weatherInfo.querySelector("p:nth-child(5)").textContent = `Wind: ${data.wind.speed} km/h`;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      // Handle errors like displaying an error message to the user
    });
}

function handleSearch() {
  const locationInput = document.querySelector("#location-search input");
  const location = locationInput.value.trim();

  if (location) {
    getCurrentWeather(location);
    locationInput.value = ""; // Clear input field after search
  }
}

document.getElementById("location-search button").addEventListener("click", handleSearch);

// Call getCurrentWeather for initial location (optional)
// getCurrentWeather("Multan"); // Replace with your default location
