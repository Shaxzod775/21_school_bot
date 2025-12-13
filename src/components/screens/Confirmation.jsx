import { useState } from 'react'
import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import { CAMPUSES } from '../../utils/constants'
import Button from '../ui/Button'
import ProgressBar from '../ui/ProgressBar'
import Loading from '../ui/Loading'
import './Confirmation.css'

export default function Confirmation({ onNext, onBack }) {
  const { formData } = useForm()
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const campus = CAMPUSES.find(c => c.id === formData.campus)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    onNext()
  }

  const dataRows = [
    { label: t('confirm.name'), value: `${formData.lastName} ${formData.firstName} ${formData.middleName || ''}`.trim() },
    { label: t('confirm.phone'), value: formData.phone },
    { label: t('confirm.email'), value: formData.email },
    { label: t('confirm.pinfl'), value: formData.pinfl ? `${formData.pinfl.slice(0, 4)}****${formData.pinfl.slice(-4)}` : '' },
    { label: t('confirm.gender'), value: formData.gender === 'male' ? t('gender.male') : t('gender.female') },
    { label: t('confirm.campus'), value: campus?.name || '' }
  ]

  return (
    <div className="screen confirmation-screen">
      <ProgressBar current={11} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('confirm.title')}</h2>
        <p className="screen-subtitle">
          {t('confirm.subtitle')}
        </p>

        <div className="confirmation-data">
          {dataRows.map((row, index) => (
            <motion.div
              key={row.label}
              className="data-row"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="data-label">{row.label}</span>
              <span className="data-value">{row.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="confirmation-note">
          <div className="note-icon-wrapper">
            <Info size={16} />
          </div>
          <span className="note-text">
            {t('confirm.note')}
          </span>
        </div>
      </motion.div>

      <div className="screen-footer">
        <div className="button-group">
          <Button variant="ghost" onClick={onBack}>
            {t('common.back')}
          </Button>
          <Button onClick={handleSubmit} loading={isSubmitting}>
            {t('confirm.submit')}
          </Button>
        </div>
      </div>

      {isSubmitting && <Loading text={t('confirm.submitting')} />}
    </div>
  )
}
