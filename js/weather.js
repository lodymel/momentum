// Weather widget based on location
const weather = document.getElementById('weather');

// OpenWeather API configuration
// API key for GitHub Pages deployment
const API_KEY = 'c4efdba194a93f5831c46bbaca763eb8'; // Production API key
// const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'your_api_key_here'; // Local development
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// Display weather information
function displayWeather(data) {
  const city = data.name;
  const country = data.sys.country;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  weather.innerHTML = `
    <span>🌤️</span>
    <span>${city}, ${country}</span>
    <span>${Math.round(temp)}°C</span>
    <span>${description}</span>
    <span>💧 ${humidity}% 💨 ${windSpeed}m/s</span>
  `;
}

// Get weather by location
function getWeatherByLocation(lat, lon) {
  fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        console.error('Failed to fetch weather information:', data.message);
        weather.innerHTML = `
          <span>🌤️</span>
          <span>Unable to fetch weather information</span>
        `;
      }
    })
    .catch(error => {
      console.error('Failed to fetch weather information:', error);
      weather.innerHTML = `
        <span>🌤️</span>
        <span>Unable to fetch weather information</span>
      `;
    });
}

// Request location permission and get weather
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByLocation(lat, lon);
      },
      (error) => {
        console.error('Unable to get location information:', error);
        weather.innerHTML = `
          <span>🌤️</span>
          <span>Location permission required</span>
        `;
      }
    );
  } else {
    weather.innerHTML = `
      <span>🌤️</span>
      <span>Location not supported</span>
    `;
  }
}

// Execute when page loads
document.addEventListener('DOMContentLoaded', () => {
  getLocationWeather();
});