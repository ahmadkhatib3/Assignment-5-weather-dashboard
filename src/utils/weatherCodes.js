// Open-Meteo returns a numeric code (WMO standard). This turns it into a label + icon.
const CODES = [
    { codes: [0], label: 'Clear sky', icon: '☀️' },
    { codes: [1], label: 'Mostly clear', icon: '🌤️' },
    { codes: [2], label: 'Partly cloudy', icon: '⛅' },
    { codes: [3], label: 'Overcast', icon: '☁️' },
    { codes: [45, 48], label: 'Fog', icon: '🌫️' },
    { codes: [51, 53, 55, 56, 57], label: 'Drizzle', icon: '🌦️' },
    { codes: [61, 63, 65, 66, 67, 80, 81, 82], label: 'Rain', icon: '🌧️' },
    { codes: [71, 73, 75, 77, 85, 86], label: 'Snow', icon: '❄️' },
    { codes: [95, 96, 99], label: 'Thunderstorm', icon: '⛈️' },
]

export function describeWeather(code) {
    const match = CODES.find((entry) => entry.codes.includes(code))
    return match ?? { label: 'Unknown', icon: '🌡️' }
}