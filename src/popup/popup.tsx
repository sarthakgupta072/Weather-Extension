import React from "react"
import ReactDOM from "react-dom"
import "./popup.css"
import WeatherCard from "./WeatherCard"

const App: React.FC<{}> = () => {
  return (
    <div>
      <WeatherCard city='Bangalore' />
      <WeatherCard city='Jammu' />
    </div>
  )
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
