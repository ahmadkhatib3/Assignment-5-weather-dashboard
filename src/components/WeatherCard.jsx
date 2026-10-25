import WeatherDetails from './WeatherDetails'
import { describeWeather } from '../utils/weatherCodes'

export default function WeatherCard({ weather }) {
  const { label, icon } = describeWeather(weather.code)
  return (
    <article className="card">
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <p className="temp">{weather.temp}°C</p>
      <p className="condition"> <span aria-hidden="true">{icon}</span> {label}</p>
      <WeatherDetails
        feelsLike={weather.feelsLike}
        humidity={weather.humidity}
        wind={weather.wind}
      />
    </article>
  )
}