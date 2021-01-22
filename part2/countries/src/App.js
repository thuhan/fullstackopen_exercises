import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDisplay from './components/CountryDisplay'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryToFind, setCountryToFind] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data))
  }, [])

  const findCountryChangeHandler = (event) =>
    setCountryToFind(event.target.value)

  return (
    <>
      <div>
        find countries <input value={countryToFind} onChange={findCountryChangeHandler} />
      </div>
      <CountryDisplay
        countries={countries}
        countryToFind={countryToFind}
        setCountryToFind={setCountryToFind}
      />
    </>
  )
}

export default App;
