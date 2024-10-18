import React, { useState, useEffect, useRef } from "react";
import "./Search.css";

import SearchIcon from "../assets/search-01-stroke-rounded";

const API_KEY = "abae1978571521216c421ecdc24f3b57"; // Replace with your OpenWeather API key

function Search({ name, onCitySelect }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (name) {
      setCity(name);
    }
  }, [name]);

  const handleOnChange = async (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);

    if (inputValue) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=5&appid=${API_KEY}`
        );

        if (!response.ok) throw new Error("Failed to fetch cities");

        const data = await response.json();
        const filteredCities = data.map(
          (city) => `${city.name}, ${city.country}`
        );
        setSuggestions(filteredCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleCitySelect = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
    onCitySelect(suggestion);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSuggestions([]); // Close suggestions if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section ref={searchRef} className="search">
      <div className="search-box">
        <input
          className=""
          type="text"
          onChange={handleOnChange}
          value={city}
          placeholder="Search for a city..."
        />

        <SearchIcon className="search-icon" />
      </div>
      {loading && <div>Loading...</div>} {/* Loading indicator */}
      {suggestions.length > 0 && !loading && (
        <div className="dropdown-container">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion element"
              onClick={() => handleCitySelect(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Search;
