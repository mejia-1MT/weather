import React from "react";
import "./Card.css";
import Search from "./Search";
//SVG
import FeelsIcon from "../assets/thermometer-warm-stroke-rounded";
import HumidityIcon from "../assets/humidity-stroke-rounded";
import WindIcon from "../assets/fast-wind-stroke-rounded";

function Card({ weatherDetails, onCitySelect }) {
  const { name, temp, feels_like, weather, icon, humidity, wind } =
    weatherDetails;

  return (
    <article className="card">
      <Search name={name} onCitySelect={onCitySelect} />

      <div className="image">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={name}
        />
      </div>
      <h2 className="weather">{weather}</h2>

      <h1 className="temp">
        {Math.floor(temp)} <span className="degree"> °</span>
      </h1>

      <div className="details">
        <div className="details-div">
          <p>
            <FeelsIcon className="icon" />
            Feels
          </p>
          <span>{Math.floor(feels_like)}°</span>
        </div>
        <div className="details-div">
          <p>
            <HumidityIcon className="icon" /> Humidity
          </p>
          <span>{humidity}%</span>
        </div>
        <div className="details-div">
          <p>
            <WindIcon className="icon" />
            Wind
          </p>
          <span>{wind}</span>
        </div>
      </div>

      <div className="circle"></div>
    </article>
  );
}

export default Card;
