import { useState } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import './Gender.css'

export default function Gender({ onNext, onBack }) {
  const { formData, updateFormData } = useForm()
  const { t } = useLanguage()
  const [gender, setGender] = useState(formData.gender || '')

  const genders = [
    { id: 'male', label: t('gender.male') },
    { id: 'female', label: t('gender.female') }
  ]

  const handleSubmit = () => {
    updateFormData({ gender })
    onNext()
  }

  return (
    <div className="screen gender-screen">
      <ProgressBar current={6} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('gender.title')}</h2>
        <p className="screen-subtitle">
          {t('gender.subtitle')}
        </p>

        <div className="gender-options">
          {genders.map((g) => (
            <motion.button
              key={g.id}
              className={`gender-card ${gender === g.id ? 'selected' : ''}`}
              onClick={() => setGender(g.id)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="gender-icon-wrapper">
                <User size={32} />
              </div>
              <span className="gender-label">{g.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <div className="screen-footer">
        <div className="button-group">
          <Button variant="ghost" onClick={onBack}>
            {t('common.back')}
          </Button>
          <Button onClick={handleSubmit} disabled={!gender}>
            {t('common.continue')}
          </Button>
        </div>
      </div>
    </div>
  )
}
