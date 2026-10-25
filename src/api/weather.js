const GEO_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export async function fetchWeather(city, signal) {
  // 1. city name -> coordinates
  const geoRes = await fetch(`${GEO_URL}?name=${encodeURIComponent(city)}&count=1`, {signal})
  if (!geoRes.ok) throw new Error('Location lookup failed.')
  const geo = await geoRes.json()
  if (!geo.results) throw new Error(`We couldn't find "${city}".`)
  const place = geo.results[0]

  // 2. coordinates -> current weather
  const url =
    `${FORECAST_URL}?latitude=${place.latitude}&longitude=${place.longitude}` +
    '&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code' +
    '&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=6&timezone=auto'
  const res = await fetch(url, {signal})
  if (!res.ok) throw new Error('Weather service error. Please try again.')
  const data = await res.json()

  // 3. return only what our app needs
  return {
    city: place.name,
    country: place.country,
    temp: Math.round(data.current.temperature_2m),
    feelsLike: Math.round(data.current.apparent_temperature),
    humidity: data.current.relative_humidity_2m,
    wind: Math.round(data.current.wind_speed_10m),
    code: data.current.weather_code,
    daily: data.daily.time.slice(1).map((date, i) => ({
      date,
      code: data.daily.weather_code[i + 1],
      max: Math.round(data.daily.temperature_2m_max[i + 1]),
      min: Math.round(data.daily.temperature_2m_min[i + 1]),
    })),
  }
}