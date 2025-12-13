import { motion } from 'framer-motion'
import './ProgressBar.css'

export default function ProgressBar({ current, total, currentStep, totalSteps }) {
  // Support both naming conventions
  const step = current || currentStep || 1
  const steps = total || totalSteps || 11
  const progress = (step / steps) * 100

  return (
    <motion.div
      className="progress-container"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="progress-bar">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="step-indicator">
        <span>Шаг {step} из {steps}</span>
        <div className="step-dots">
          {Array.from({ length: steps }).map((_, i) => (
            <span
              key={i}
              className={`step-dot ${i + 1 < step ? 'completed' : ''} ${i + 1 === step ? 'current' : ''}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
