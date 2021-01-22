import React, { useEffect, useState } from 'react'
import axios from 'axios'
import WeatherDetails from './WeatherDetails'

const api_key = process.env.REACT_APP_API_KEY

const CountryDetails = ({ countryMatched }) => {
  const [currentWeather, setCurrentWeather] = useState({})
  const [showWeather, setShowWeather] = useState(false)

  useEffect(() => {
    axios
      .get('http://api.weatherstack.com/current?access_key=' + api_key + '&query=' + countryMatched.capital)
      .then(response => {
        if (response.data.current) {
          setCurrentWeather(response.data.current)
          setShowWeather(true)
        }
      })
  }, [countryMatched])

  console.log(showWeather);
  const weatherDetails = showWeather
    ? <WeatherDetails currentWeather={currentWeather} />
    : <p>Could not load weather data. Please try again.</p>

  return (
    <div>
      <h1>{countryMatched.name}</h1>
      <p>capital {countryMatched.capital}</p>
      <p>population {countryMatched.population}</p>
      <h2>languages</h2>
      <ul>
        {countryMatched.languages
          .map(language =>
            <li key={language.iso639_1}>{language.name}</li>)
        }
      </ul>
      <img src={countryMatched.flag} alt={"flag of" + countryMatched.name} width='256' />
      <h2>Weather in {countryMatched.capital}</h2>
      {weatherDetails}
    </div>
  )
}

export default CountryDetails