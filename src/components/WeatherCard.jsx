import React from 'react';

const WeatherCard = ({ day, icon, temp, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center">
      <h3 className="text-xl font-semibold mb-2">{day}</h3>
      <img src={`http://openweathermap.org/img/w/${icon}.png`} alt={description} className="w-20 mx-auto mb-2" />
      <p className="text-lg">{temp}°C</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default WeatherCard;
