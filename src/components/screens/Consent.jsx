import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import './Consent.css'

export default function Consent({ onNext, onBack }) {
  const { t } = useLanguage()
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="screen consent-screen">
      <ProgressBar current={1} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('consent.title')}</h2>
        <p className="screen-subtitle">
          {t('consent.subtitle')}
        </p>

        <div className="consent-box">
          <p>
            {t('consent.text1')}
            <a href="#" className="consent-link"> {t('consent.privacy')}</a> {t('consent.and')}
            <a href="#" className="consent-link"> {t('consent.terms')}</a>.
          </p>
          <p>
            {t('consent.text2')}
          </p>
        </div>

        <label className="consent-checkbox">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span className="checkmark"></span>
          <span className="checkbox-label">{t('consent.agree')}</span>
        </label>
      </motion.div>

      <div className="screen-footer">
        <div className="button-group">
          <Button variant="ghost" onClick={onBack}>
            {t('common.back')}
          </Button>
          <Button onClick={onNext} disabled={!agreed}>
            {t('common.continue')}
          </Button>
        </div>
      </div>
    </div>
  )
}
