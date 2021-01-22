import React from 'react'

const WeatherDetails = ({ currentWeather }) => (
  <div>
    <p><b>temperature: </b>{currentWeather.temperature}°C</p>
    {currentWeather.weather_icons
      .map((iconLink, i) =>
        <img
          key={iconLink}
          src={iconLink}
          alt={currentWeather.weather_descriptions[i]} />
      )}
    <p><b>wind: </b>{currentWeather.wind_speed}km/h direction {currentWeather.wind_dir}</p>
  </div>
)

export default WeatherDetails