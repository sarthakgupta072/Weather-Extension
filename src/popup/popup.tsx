import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, Paper, InputBase, IconButton } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import { getStoredCities, setStoredCities } from "../utils/storage"

import "./popup.css"
import "fontsource-roboto"
import WeatherCard from "./WeatherCard"

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>("")

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
  }, [])

  const handleCityButtonClick = () => {
    if (cityInput === "") return

    const updatedCities = [...cities, cityInput]
    console.log("updating cities")
    setStoredCities(updatedCities).then(() => {
      console.log("updated cities")
      setCities(updatedCities)
      setCityInput("")
    })
  }

  const handleCityDeleteButtonClick = (index: number) => {
    cities.splice(index, 1)
    const updatedCities = [...cities]
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities)
      setCityInput("")
    })
  }

  return (
    <Box mx='8px' my='16px'>
      <Grid container>
        <Grid item>
          <Paper>
            <Box px='15px' py='5px'>
              <InputBase
                placeholder='Add a city name'
                value={cityInput}
                onChange={(event) => setCityInput(event.target.value)}
              />
              <IconButton onClick={handleCityButtonClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          key={index}
          city={city}
          onDelete={() => handleCityDeleteButtonClick(index)}
        />
      ))}
      <Box height='10px' />
    </Box>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
