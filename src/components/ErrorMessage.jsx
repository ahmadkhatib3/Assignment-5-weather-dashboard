export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className = "status error" role="alert">
      <h2>Couldn't load the weather</h2>
      <p>{message}</p>
      <button type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  )
}