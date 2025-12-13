import { motion } from 'framer-motion'
import './Button.css'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  loading = false,
  pulse = false,
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    pulse && 'pulse',
    loading && 'loading',
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {loading ? (
        <span className="btn-spinner" />
      ) : (
        <>
          {icon && <span className="btn-icon">{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  )
}
