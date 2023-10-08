import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, Paper, InputBase, IconButton } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import {
  getStoredCities,
  setStoredCities,
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from "../utils/storage"

import "./popup.css"
import "fontsource-roboto"
import WeatherCard from "./WeatherCard"

const App: React.FC<{}> = () => {
  const [cities, setCities] = useState<string[]>([])
  const [cityInput, setCityInput] = useState<string>("")
  const [options, setOptions] = useState<LocalStorageOptions | null>(null)

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities))
    getStoredOptions().then((options) => setOptions(options))
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

  const handleTempScaleButtonClick = () => {
    const updatedOptions: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === "metric" ? "imperial" : "metric",
    }
    setStoredOptions(updatedOptions).then(() => {
      setOptions(updatedOptions)
    })
  }

  if (!options) return null

  return (
    <Box mx='8px' my='16px'>
      <Grid container justifyContent='space-evenly'>
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
        <Grid item>
          <Paper>
            <Box py='4px'>
              <IconButton onClick={handleTempScaleButtonClick}>
                {options.tempScale === "metric" ? "\u2103" : "\u2109"}
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {cities.map((city, index) => (
        <WeatherCard
          key={index}
          city={city}
          tempScale={options.tempScale}
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
