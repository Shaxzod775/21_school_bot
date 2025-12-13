import './Loading.css'

export default function Loading({ text = 'Загрузка...' }) {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <div className="loading-spinner" />
        <span className="loading-text">{text}</span>
      </div>
    </div>
  )
}
