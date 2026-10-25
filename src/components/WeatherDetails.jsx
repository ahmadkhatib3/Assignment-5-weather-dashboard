export default function WeatherDetails({ feelsLike, humidity, wind }) {
  return (
    <ul className = "details">
      <li>Feels like: {feelsLike}°C</li>
      <li>Humidity: {humidity}%</li>
      <li>Wind: {wind} km/h</li>
    </ul>
  )
}