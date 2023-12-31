import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Button,
} from "@mui/material"
import {
  OpenWeatherData,
  OpenWeatherTempScale,
  fetchOpenWeatherData,
} from "../../utils/api"

const WeatherCardContainer: React.FC<{
  children: React.ReactNode
  onDelete?: (number) => void
}> = ({ children, onDelete }) => {
  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color='secondary' onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  )
}
type WeatherCardState = "loading" | "error" | "ready"

const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
  onDelete?: (number) => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>("loading")
  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState("ready")
      })
      .catch((err) => {
        setCardState("error")
      })
  }, [city, tempScale])

  if (cardState == "loading" || cardState == "error") {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography variant='body1'>
          {cardState == "loading"
            ? "loading..."
            : `Error: Could not retrieve data for the city: ${city}`}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant='h5'>{weatherData.name}</Typography>
      <Typography variant='body1'>
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant='body1'>
        Feels Liks: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  )
}

export default WeatherCard
