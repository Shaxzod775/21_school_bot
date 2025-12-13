import { motion } from 'framer-motion'
import { Check, Smartphone, Mail, MessageCircle } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import { useTelegram } from '../../hooks/useTelegram'
import './Success.css'

export default function Success() {
  const { tg } = useTelegram()
  const { t } = useLanguage()

  const handleClose = () => {
    if (tg) {
      tg.close()
    }
  }

  const infoItems = [
    { icon: Smartphone, text: t('success.info1') },
    { icon: Mail, text: t('success.info2') },
    { icon: MessageCircle, text: t('success.info3') }
  ]

  return (
    <div className="success-screen">
      <motion.div
        className="success-content"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="success-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <div className="icon-circle">
            <Check size={48} strokeWidth={3} />
          </div>
        </motion.div>

        <motion.h1
          className="success-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {t('success.title')}
        </motion.h1>

        <motion.p
          className="success-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {t('success.message')}
        </motion.p>

        <motion.div
          className="success-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {infoItems.map((item, index) => (
            <motion.div
              key={index}
              className="info-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="info-icon-wrapper">
                <item.icon size={18} />
              </div>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="success-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button onClick={handleClose} size="large" fullWidth>
          {t('success.close')}
        </Button>
      </motion.div>
    </div>
  )
}
