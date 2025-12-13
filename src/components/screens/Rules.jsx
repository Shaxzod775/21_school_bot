import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClipboardList, Scale, Wallet, UserCheck, Clock } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import './Rules.css'

export default function Rules({ onNext, onBack }) {
  const { t } = useLanguage()
  const [accepted, setAccepted] = useState(false)
  const [expanded, setExpanded] = useState(null)

  const RULES = [
    {
      id: 'selection',
      icon: ClipboardList,
      title: t('rules.rule1Title'),
      description: t('rules.rule1Desc')
    },
    {
      id: 'fairplay',
      icon: Scale,
      title: t('rules.rule2Title'),
      description: t('rules.rule2Desc')
    },
    {
      id: 'expenses',
      icon: Wallet,
      title: t('rules.rule3Title'),
      description: t('rules.rule3Desc')
    },
    {
      id: 'age',
      icon: UserCheck,
      title: t('rules.rule4Title'),
      description: t('rules.rule4Desc')
    },
    {
      id: 'schedule',
      icon: Clock,
      title: t('rules.rule5Title'),
      description: t('rules.rule5Desc')
    }
  ]

  return (
    <div className="screen rules-screen">
      <ProgressBar current={10} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('rules.title')}</h2>
        <p className="screen-subtitle">
          {t('rules.subtitle')}
        </p>

        <div className="rules-list">
          {RULES.map((rule, index) => (
            <motion.div
              key={rule.id}
              className={`rule-card ${expanded === rule.id ? 'expanded' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className="rule-header"
                onClick={() => setExpanded(expanded === rule.id ? null : rule.id)}
              >
                <div className="rule-icon-wrapper">
                  <rule.icon size={18} />
                </div>
                <span className="rule-title">{rule.title}</span>
                <span className="rule-toggle">
                  {expanded === rule.id ? '−' : '+'}
                </span>
              </div>
              {expanded === rule.id && (
                <motion.div
                  className="rule-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <p>{rule.description}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <label className="rules-checkbox">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span className="checkmark"></span>
          <span className="checkbox-label">
            {t('rules.accept')}
          </span>
        </label>
      </motion.div>

      <div className="screen-footer">
        <div className="button-group">
          <Button variant="ghost" onClick={onBack}>
            {t('common.back')}
          </Button>
          <Button onClick={onNext} disabled={!accepted}>
            {t('common.continue')}
          </Button>
        </div>
      </div>
    </div>
  )
}
