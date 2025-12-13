import { useState } from 'react'
import './Input.css'

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  hint,
  error,
  success,
  maxLength,
  icon,
  className = '',
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  const inputClasses = [
    'form-input',
    error && 'error',
    success && 'success',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={inputType}
          className={inputClasses}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        )}
      </div>
      {hint && !error && <span className="form-hint">{hint}</span>}
      {error && <span className="form-error">{error}</span>}
    </div>
  )
}
