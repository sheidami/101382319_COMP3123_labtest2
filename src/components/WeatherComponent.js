import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherComponent.css';

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('Toronto');
  const API_KEY = '1195f0162f556b7cdf8f7898a698fd1a';

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [city, API_KEY]);

  const handleSearch = () => {
    fetchData();
  };

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const firstDay = weatherData.list[0];
  const upcomingDays = weatherData.list.slice(1, 6); 

  return (
    <div className="weather-container">
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <section className="weather-info">
        <h2>Weather in {weatherData.city.name}, {weatherData.city.country}</h2>
        <div className="first-day">
          <img
            src={`http://openweathermap.org/img/wn/${firstDay.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <h3>Today</h3>
          <p>{formatDate()}</p>
          <p>Temperature: {convertKelvinToCelsius(firstDay.main.temp)} °C</p>
          <p>Weather Condition: {firstDay.weather[0].description}</p>
          <p>Humidity: {firstDay.main.humidity}%</p>
          <p>Wind Speed: {firstDay.wind.speed} m/s</p>
        </div>
      </section>

      <section className="upcoming-days">
        <h3>Upcoming Days</h3>
        <ul>
          {upcomingDays.map((day) => (
            <li key={day.dt}>
              <img
                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <div>
                  <p style={{ marginBottom: '10px' }}>Temperature: {convertKelvinToCelsius(day.main.temp)} °C</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
};
const formatDate = () => {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return today.toLocaleDateString('en-US', options);
};

export default WeatherComponent;