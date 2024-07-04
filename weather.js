const apiKey = "94d2a76a34ff37578397ba56eda51fcd";

const weatherDataEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputEl.value;
  console.log(`Fetching weather data for city: ${cityValue}`);
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log('API response:', data);
    updateWeatherData(data);
  } catch (error) {
    console.error('Error:', error);
    weatherDataEl.querySelector(".icon").innerHTML = "";
    weatherDataEl.querySelector(".temperature").textContent = "";
    weatherDataEl.querySelector(".description").textContent =
      "An error occurred, please try again later";
    weatherDataEl.querySelector(".details").innerHTML = "";
  }
}

function updateWeatherData(data) {
  if (!data) {
    console.error('No data received');
    return;
  }

  console.log('Updating weather data:', data);

  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  const details = [
    `Feels like: ${Math.round(data.main.feels_like)}°C`,
    `Humidity: ${data.main.humidity}%`,
    `Wind speed: ${data.wind.speed} m/s`,
  ];

  weatherDataEl.querySelector(".icon").innerHTML = icon ? `<img src="${icon}" alt="Weather Icon">` : "";
  weatherDataEl.querySelector(".temperature").textContent = `${temperature}°C`;
  weatherDataEl.querySelector(".description").textContent = description;
  weatherDataEl.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("");
}