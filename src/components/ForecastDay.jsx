import { describeWeather } from '../utils/weatherCodes'

export default function ForecastDay({ day }) {
    const { label, icon } = describeWeather(day.code)
    const weekday = new Date(`${day.date}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
    })

    return (
        <li className="forecast-day">
            <span>{weekday}</span>
            <span className="fd-icon" role="img" aria-label={label}>
                {icon}
            </span>
            <strong>{day.max}°</strong>
            <small>{day.min}°</small>
        </li>
    )
}