import { useState } from 'react'

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        if (!query.trim()) return
        onSearch(query.trim())
        setQuery('')
    }

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search a city"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}