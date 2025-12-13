import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import './Countdown.css'

export default function Countdown({ targetDate = '2026-01-19' }) {
  const { t, language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const months = {
      ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
      uz: ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'],
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    }
    return `${date.getDate()} ${months[language][date.getMonth()]}`
  }

  const labels = {
    ru: { days: 'дней', hours: 'часов', minutes: 'минут', nextIntensive: 'Следующий интенсив' },
    uz: { days: 'kun', hours: 'soat', minutes: 'daqiqa', nextIntensive: 'Keyingi intensiv' },
    en: { days: 'days', hours: 'hours', minutes: 'minutes', nextIntensive: 'Next intensive' }
  }

  const currentLabels = labels[language] || labels.ru

  return (
    <motion.div
      className="countdown-wrapper"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="countdown-header">
        <div className="countdown-icon">
          <Calendar size={18} />
        </div>
        <div className="countdown-info">
          <span className="countdown-label">{currentLabels.nextIntensive}</span>
          <span className="countdown-date">{formatDate(targetDate)}</span>
        </div>
      </div>

      <div className="countdown-timer">
        <div className="countdown-unit">
          <motion.span
            className="countdown-value"
            key={timeLeft.days}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {String(timeLeft.days).padStart(2, '0')}
          </motion.span>
          <span className="countdown-unit-label">{currentLabels.days}</span>
        </div>

        <span className="countdown-separator">:</span>

        <div className="countdown-unit">
          <motion.span
            className="countdown-value"
            key={timeLeft.hours}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {String(timeLeft.hours).padStart(2, '0')}
          </motion.span>
          <span className="countdown-unit-label">{currentLabels.hours}</span>
        </div>

        <span className="countdown-separator">:</span>

        <div className="countdown-unit">
          <motion.span
            className="countdown-value"
            key={timeLeft.minutes}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            {String(timeLeft.minutes).padStart(2, '0')}
          </motion.span>
          <span className="countdown-unit-label">{currentLabels.minutes}</span>
        </div>
      </div>
    </motion.div>
  )
}
