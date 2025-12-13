import { motion } from 'framer-motion'
import './Toast.css'

export default function Toast({ message, type = 'success' }) {
  return (
    <motion.div
      className={`toast ${type}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
    >
      <span className="toast-icon">
        {type === 'success' ? '✅' : '❌'}
      </span>
      <span className="toast-message">{message}</span>
    </motion.div>
  )
}
