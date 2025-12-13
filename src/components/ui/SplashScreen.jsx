import { motion } from 'framer-motion'
import './SplashScreen.css'

export default function SplashScreen({ onFinish }) {
  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={onFinish}
    >
      {/* Decorative particles */}
      <div className="splash-particle particle-1" />
      <div className="splash-particle particle-2" />
      <div className="splash-particle particle-3" />

      {/* Main logo */}
      <motion.div
        className="splash-content"
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.68, -0.55, 0.265, 1.55]
        }}
      >
        {/* Glow effect */}
        <div className="splash-glow" />

        {/* Logo number */}
        <motion.div
          className="splash-logo"
          initial={{ scale: 0.8 }}
          animate={{ scale: [0.8, 1.05, 0.95, 1] }}
          transition={{
            duration: 0.8,
            times: [0, 0.4, 0.7, 1],
            ease: 'easeOut'
          }}
        >
          21
        </motion.div>

        {/* School text */}
        <motion.p
          className="splash-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          School 21
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
