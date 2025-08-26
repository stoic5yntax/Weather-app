import API_KEY from "./config.js";

export default async function getWeatherData(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric
`;
  let response = await fetch(URL);
  let data = await response.json();

  return data;
}
