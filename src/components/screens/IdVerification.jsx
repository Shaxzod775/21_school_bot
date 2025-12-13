import { useState } from 'react'
import { motion } from 'framer-motion'
import { ScanFace, PenLine } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import './IdVerification.css'

export default function IdVerification({ onNext, onBack }) {
  const { t } = useLanguage()
  const [method, setMethod] = useState(null)

  const methods = [
    {
      id: 'myid',
      name: 'MyID',
      icon: ScanFace,
      description: t('id.myidDesc')
    },
    {
      id: 'manual',
      name: t('id.manual'),
      icon: PenLine,
      description: t('id.manualDesc')
    }
  ]

  const handleNext = () => {
    if (method === 'myid') {
      // Simulate MyID verification
      setTimeout(() => {
        onNext({ verified: true })
      }, 1500)
    } else {
      onNext({ verified: false })
    }
  }

  return (
    <div className="screen id-screen">
      <ProgressBar current={3} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('id.title')}</h2>
        <p className="screen-subtitle">
          {t('id.subtitle')}
        </p>

        <div className="method-list">
          {methods.map((m) => (
            <motion.button
              key={m.id}
              className={`method-card ${method === m.id ? 'selected' : ''}`}
              onClick={() => setMethod(m.id)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="method-icon-wrapper">
                <m.icon size={24} />
              </div>
              <div className="method-info">
                <span className="method-name">{m.name}</span>
                <span className="method-desc">{m.description}</span>
              </div>
              <div className="method-radio">
                {method === m.id && <div className="radio-dot" />}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="screen-footer">
        <div className="button-group">
          <Button variant="ghost" onClick={onBack}>
            {t('common.back')}
          </Button>
          <Button onClick={handleNext} disabled={!method}>
            {t('common.continue')}
          </Button>
        </div>
      </div>
    </div>
  )
}
