import { motion } from 'framer-motion'
import { Code, Gamepad2, Briefcase, MapPin, Gift } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import Countdown from '../ui/Countdown'
import './Welcome.css'

export default function Welcome({ onNext }) {
  const { t } = useLanguage()

  const features = [
    {
      icon: Code,
      title: t('welcome.feature1Title'),
      desc: t('welcome.feature1Desc')
    },
    {
      icon: Gamepad2,
      title: t('welcome.feature2Title'),
      desc: t('welcome.feature2Desc')
    },
    {
      icon: Briefcase,
      title: t('welcome.feature3Title'),
      desc: t('welcome.feature3Desc')
    },
    {
      icon: MapPin,
      title: t('welcome.feature4Title'),
      desc: t('welcome.feature4Desc')
    },
    {
      icon: Gift,
      title: t('welcome.feature5Title'),
      desc: t('welcome.feature5Desc')
    }
  ]

  return (
    <div className="welcome-screen">
      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="welcome-logo">
          <motion.div
            className="logo-circle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <span>21</span>
          </motion.div>
        </div>

        <motion.h1
          className="welcome-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t('welcome.title')}
        </motion.h1>

        <motion.p
          className="welcome-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t('welcome.subtitle')}
        </motion.p>

        <Countdown targetDate="2026-01-19" />

        <motion.div
          className="welcome-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`feature-item ${index === features.length - 1 ? 'feature-item-full' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.08 }}
            >
              <div className="feature-icon-wrapper">
                <feature.icon size={20} strokeWidth={2} />
              </div>
              <div className="feature-text">
                <span className="feature-title">{feature.title}</span>
                <span className="feature-desc">{feature.desc}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="welcome-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={onNext} size="large" fullWidth>
          {t('welcome.button')}
        </Button>
        <p className="welcome-note">
          {t('welcome.note')}
        </p>
      </motion.div>
    </div>
  )
}
