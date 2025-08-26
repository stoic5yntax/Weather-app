// ui.js
import { convertToLocalTime, formatDateTime, formatTime } from "./timeUtil.js";

const placeholder = document.getElementById("placeholder");
const placeholderText = document.getElementById("placeholder-text");
const weatherSection = document.getElementById("weather-section");
const loader = document.getElementById("loader");

// hide weather + loader, show placeholder
export const showPlaceholder = (message) => {
  if (message) placeholderText.textContent = message;
  else
    placeholderText.textContent =
      "Search above to see the weather for your city.";

  placeholder.classList.remove("hidden");
  weatherSection.classList.add("hidden");
  weatherSection.classList.remove("show");
  loader.classList.add("hidden");
  weatherSection.innerHTML = "";
};

// Hide placeholder, show loader, clear weather content
export const showLoader = () => {
  placeholder.classList.add("hidden");
  loader.classList.remove("hidden");
  weatherSection.classList.add("hidden");
  weatherSection.classList.remove("show");
  weatherSection.innerHTML = "";
};

// Hide loader only
export const hideLoader = () => {
  loader.classList.add("hidden");
};

// Render fetched data into the card
export const displayWeather = (data) => {
  if (!data) {
    showPlaceholder("Enter a city to get started");
    return;
  }

  const { name, sys, main, weather, dt, wind, timezone } = data;

  const localDate = convertToLocalTime(dt, timezone);
  const sunrise = convertToLocalTime(sys.sunrise, timezone);
  const sunset = convertToLocalTime(sys.sunset, timezone);

  const dateStr = formatDateTime(localDate);
  const sunriseStr = formatTime(sunrise);
  const sunsetStr = formatTime(sunset);

  placeholder.classList.add("hidden");
  hideLoader();

  weatherSection.classList.remove("hidden");
  weatherSection.classList.add("show");

  weatherSection.innerHTML = `
    <div class="weather-details flex fd-column">
      <div class="location flex fd-column">
        <p>
          ${name}, ${sys.country}
          <img src="https://openweathermap.org/img/wn/${
            weather[0].icon
          }@2x.png" alt="weather icon">
        </p>
        <small>${dateStr}</small>
      </div>

      <div class="info flex fd-column">
        <h1>${main.temp.toFixed(1)}&deg; C
          <span>feels like ${main.feels_like.toFixed(1)}&deg; C</span>
        </h1>
        <p>${weather[0].description}</p>
      </div>

      <div class="additional-info flex">
        <div class="info-element flex fd-column">
          <h3>Humidity: ${main.humidity}%</h3>
          <h3>Wind: ${wind.speed} m/s</h3>
          <h3>Pressure: ${main.pressure} hPa</h3>
        </div>

        <div class="info-element flex fd-column">
          <h3>Sunrise: ${sunriseStr}</h3>
          <h3>Sunset: ${sunsetStr}</h3>
        </div>
      </div>
    </div>
  `;
};
