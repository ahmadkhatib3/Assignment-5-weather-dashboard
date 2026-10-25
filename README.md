# Weather Dashboard

A React weather app built with Vite. Search any city to see its current weather
(temperature, conditions, feels like, humidity, wind) and a five-day forecast.

Weather data comes from [Open-Meteo](https://open-meteo.com/), which is free and
**does not need an API key**, so there is nothing to configure.

## Install and run

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the address Vite prints in the terminal (usually http://localhost:5173/).

## Features

- Search by city name
- Current conditions with a weather icon
- Five-day forecast
- Loading, error (with a "Try again" button) and success states

## Project structure

```
src/
├── main.jsx
├── App.jsx                 state + data fetching
├── index.css
├── api/weather.js          fetchWeather(): geocoding + forecast requests
├── utils/weatherCodes.js   weather code -> label and icon
└── components/
    ├── SearchBar.jsx
    ├── LoadingSpinner.jsx
    ├── ErrorMessage.jsx
    ├── WeatherCard.jsx
    ├── WeatherDetails.jsx
    ├── Forecast.jsx
    └── ForecastDay.jsx
```

## State and props

- **useState in `App`:** `city`, `weather`, `status` ('loading', 'error' or 'ready'),
  `error` and `attempt`. `SearchBar` keeps its own `query` state for the input field.
- **useEffect in `App`:** fetches the weather when the page loads and again whenever
  `city` or `attempt` changes. The cleanup function aborts the previous request so
  an old response cannot overwrite a newer one.
- **Props:** `App` passes `onSearch` to `SearchBar`, `weather` to `WeatherCard`,
  `days` to `Forecast`, and `message` and `onRetry` to `ErrorMessage`.
- **Prop drilling:** data never goes deeper than two levels:
  `App → WeatherCard → WeatherDetails` and `App → Forecast → ForecastDay`.
  No Context was needed.