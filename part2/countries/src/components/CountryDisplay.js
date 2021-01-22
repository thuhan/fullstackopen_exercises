import React from 'react'
import CountryDetails from './CountryDetails'

const CountryDisplay = ({ countries, countryToFind, setCountryToFind}) => {
  const countriesMatched = countries
    .filter(country =>
      country.name.toLowerCase()
        .includes(countryToFind.toLowerCase()))
  if (!countryToFind) {
    return (
      <div>
        <p>Enter country name to use the app</p>
      </div>
    )
  }

  else if (countriesMatched.length === 1) {
    return (<CountryDetails countryMatched={countriesMatched[0]} />)
  }

  else if (countriesMatched.length > 10) {
    return (
      <div>
        <p>Too many mathches, specify another filter</p>
      </div>
    )
  }

  else {
    return (
      <div>
        {countriesMatched.map(country =>
          <p key={country.alpha2Code}>
            {country.name + "    "}
            <button key={country.alpha2Code} onClick={() => setCountryToFind(country.name)}>
              show
            </button>
          </p>)}
      </div>
    )
  }

}

export default CountryDisplay