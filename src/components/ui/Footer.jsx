import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import './Footer.css'

export default function Footer({ onAiClick }) {
  const { t } = useLanguage()

  return (
    <div className="app-footer">
      <motion.button
        className="footer-ai-button"
        onClick={onAiClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <Sparkles className="ai-icon" size={22} />
        <span className="ai-button-text">{t('aiChat.title')}</span>
        <span className="ai-pulse"></span>
      </motion.button>
    </div>
  )
}
