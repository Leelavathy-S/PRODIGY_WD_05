const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key
const weatherDiv = document.getElementById("weather");

function displayWeather(data) {
  const { name, main, weather } = data;
  const html = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${main.temp}°C</p>
    <p><strong>Condition:</strong> ${weather[0].main} - ${weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon" />
  `;
  weatherDiv.innerHTML = html;
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value;
  if (!city) return alert("Please enter a city name.");
  fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
}

function getWeatherByLocation() {
  if (!navigator.geolocation) return alert("Geolocation not supported.");
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
  }, () => {
    alert("Unable to retrieve your location.");
  });
}

function fetchWeather(url) {
  weatherDiv.innerHTML = "Loading...";
  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => displayWeather(data))
    .catch(err => {
      weatherDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    });
}
