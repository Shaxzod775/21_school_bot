import { motion } from 'framer-motion'
import './Card.css'

export default function Card({
  children,
  variant = 'default',
  selected = false,
  onClick,
  className = '',
  ...props
}) {
  const classes = [
    'card',
    `card-${variant}`,
    selected && 'selected',
    onClick && 'clickable',
    className
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      {...props}
    >
      {children}
      {selected && <span className="card-check">✓</span>}
    </motion.div>
  )
}

export function InfoCard({ children, icon, small = false, className = '' }) {
  return (
    <div className={`info-card ${small ? 'small' : ''} ${className}`}>
      {icon && <span className="info-icon">{icon}</span>}
      <div className="info-content">{children}</div>
    </div>
  )
}

export function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div
      className="feature-card"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <span className="feature-icon">{icon}</span>
      <div className="feature-text">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </motion.div>
  )
}

export function RuleCard({ icon, title, description }) {
  return (
    <div className="rule-card">
      <span className="rule-icon">{icon}</span>
      <div className="rule-content">
        <strong>{title}</strong>
        <span>{description}</span>
      </div>
    </div>
  )
}
