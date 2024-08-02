import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import { ToastContainer, toast } from 'react-toastify';

const Weather = ({apiKey}) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('New York');

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      setCurrentWeather(response.data);

      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
      setForecast(forecastResponse.data.list.filter((item, index) => index % 8 === 0));
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('City not found. Please try another city.');
      } else {
        toast.error('Error fetching weather data. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(search);
    setSearch('');
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search city..."
          className="w-full p-2 border border-gray-300 rounded"
        />
      </form>
      {currentWeather && (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{currentWeather.name}</h1>
          <img src={`http://openweathermap.org/img/w/${currentWeather.weather[0].icon}.png`} alt={currentWeather.weather[0].description} className="w-20 mx-auto mb-2" />
          <p className="text-xl">{currentWeather.main.temp}°C</p>
          <p className="text-gray-600">{currentWeather.weather[0].description}</p>
        </div>
      )}
      <h2 className="text-2xl font-semibold mt-8 mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {forecast.map((weather, index) => (
          <WeatherCard
            key={index}
            day={new Date(weather.dt_txt).toLocaleDateString('en-US', { weekday: 'long' })}
            icon={weather.weather[0].icon}
            temp={weather.main.temp}
            description={weather.weather[0].description}
          />
        ))}
      </div>
    </div>
  );
};

export default Weather;
