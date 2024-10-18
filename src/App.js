import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

const API_KEY = "abae1978571521216c421ecdc24f3b57";

function App() {
  const [cityName, setCityName] = useState("Antipolo"); // Use state for city name
  const [weatherDetails, setWeatherDetails] = useState({});

  useEffect(() => {
    async function getWeather() {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const chosen = {
          name: data.name,
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          weather: data.weather[0].main,
          icon: data.weather[0].icon,
          wind: data.wind.speed,
        };

        setWeatherDetails(chosen);
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    }

    getWeather();
  }, [cityName]);

  function onCitySelect(city) {
    setCityName(city);
  }

  const time = weatherDetails.icon[weatherDetails.icon.length - 1];
  const colorSelector = weatherDetails.description.split(" ").join("-");

  // const time = "d";
  // const colorSelector = "clear-sky";

  console.log(colorSelector);
  return (
    <div className={`App  ${time === "n" ? "night" : colorSelector}`}>
      <Card weatherDetails={weatherDetails} onCitySelect={onCitySelect} />
    </div>
  );
}

export default App;
