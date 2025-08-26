// IMPORTS
import getWeatherData from "./getweatherdata.js";
import { displayWeather, showLoader, showPlaceholder } from "./UI.js";

// VARIABLES
const searchForm = document.getElementById("search-form");
const searchInputElement = document.getElementById("search-input");

// Start with placeholder
showPlaceholder();

// ON USER SEARCH
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = searchInputElement.value.trim();

  if (!city) {
    alert("⚠️ Please enter a city name");
    return;
  }

  try {
    showLoader();
    const data = await getWeatherData(city);
    displayWeather(data);
  } catch (err) {
    console.error("Error fetching weather:", err);
    alert("❌ Could not fetch weather data. Try again!");
    showPlaceholder();
  }

  searchInputElement.value = "";
});
