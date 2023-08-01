import React, { useEffect, useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Box from "@mui/material/Box"
import { OpenWeatherData, fetchOpenWeatherData } from "../../utils/api"
import { Typography } from "@mui/material"

const WeatherCard: React.FC<{
  city: string
}> = ({ city }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  useEffect(() => {
    fetchOpenWeatherData(city)
      .then((data) => {
        setWeatherData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [city])

  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <Box mx={"4px"} my={"16px"}>
      <Card>
        <CardContent>
          <Typography variant='h5'>{weatherData.name}</Typography>
          <Typography variant='body1'>
            {Math.round(weatherData.main.temp)}
          </Typography>
          <Typography variant='body1'>
            Feels Liks: {Math.round(weatherData.main.feels_like)}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default WeatherCard
