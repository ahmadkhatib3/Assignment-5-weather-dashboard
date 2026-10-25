import { useEffect, useState } from 'react'
import SearchBar from './components/SearchBar'
import { fetchWeather } from './api/weather'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import WeatherCard from './components/WeatherCard'
import Forecast from './components/Forecast'

export default function App() {
  const [city, setCity] = useState('Beirut')
  const [weather, setWeather] = useState(null)
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'ready'
  const [error, setError] = useState('')
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setStatus('loading')
      try {
        const data = await fetchWeather(city, controller.signal)
        setWeather(data)
        setStatus('ready')
      } catch (err) {
        if (err.name === 'AbortError') return // an old request was cancelled
        setError(
          err.message === 'Failed to fetch'
            ? 'Check your internet connection and try again.'
            : err.message,
        )
        setStatus('error')
      }
    }
    load()

    return () => controller.abort() // cleanup
  }, [city, attempt])

  return (
    <main className = "app">
      <h1>Weather Dashboard</h1>
      <SearchBar onSearch={setCity} />

        {status === 'loading' && <LoadingSpinner />}
        {status === 'error' && (
          <ErrorMessage message={error} onRetry={() => setAttempt((n) => n + 1)} />
        )}
        {status === 'ready' && (
          <>
            <WeatherCard weather={weather} />
            <Forecast days={weather.daily} />
          </>
        )}
    </main>
  )
}