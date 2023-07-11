/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import axios from 'axios'

function App() {
  const [ country, setCountry ] = useState([])
  const [ filteredCounntries, setFilteredCountries ] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountry(response.data)
        console.log(response.data)
      })
  },[])

  const handleChangeCountry = (event) => {
    const inputValue = event.target.value.toLowerCase()
  
    if (inputValue === '') {
      setFilteredCountries([])
    } else {
      const filtered = country.filter(countrie => {
        const countryName = countrie.name.common.toLowerCase()
        return countryName.includes(inputValue)
      })
      setFilteredCountries(filtered)
    }
  }

  return (
    <div>
      <form>
        <label>Find countries</label>
        <input type="text" onChange={handleChangeCountry} />
      </form>
      <div>
        <h1>Countries</h1>
        <div>
          {
            filteredCounntries.length >= 10 ? <p>Too many matches, write more</p> : filteredCounntries.map((item) => {
              return (
                <div key={item.name.common}>
                  <h2>{item.name.common}</h2>
                  <img src={item.flags.png} alt={item.name.common} width="200" />
                  <p>Capital: {item.capital}</p>
                  <p>Region: {item.region}</p>
                  <p>Population: {item.population}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App
