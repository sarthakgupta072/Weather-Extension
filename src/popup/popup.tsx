import React from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import "fontsource-roboto"
import WeatherCard from "./WeatherCard"

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city='Bangalore' />
      <WeatherCard city='Jammu' />
      <WeatherCard city='Bangal' />
    </div>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
