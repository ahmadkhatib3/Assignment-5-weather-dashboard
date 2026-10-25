import ForecastDay from './ForecastDay'

export default function Forecast({ days }) {
    return (
        <section className="card">
            <h2>Next five days</h2>
            <ul className="forecast">
                {days.map((day) => (
                    <ForecastDay key={day.date} day={day} />
                ))}
            </ul>
        </section>
    )
}