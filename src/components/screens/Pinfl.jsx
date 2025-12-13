import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import { validatePinfl, parsePinfl } from '../../utils/validation'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ProgressBar from '../ui/ProgressBar'
import './Pinfl.css'

export default function Pinfl({ onNext, onBack }) {
  const { formData, updateFormData } = useForm()
  const { t } = useLanguage()
  const [pinfl, setPinfl] = useState(formData.pinfl || '')
  const [error, setError] = useState('')
  const [parsedInfo, setParsedInfo] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 14)
    setPinfl(value)
    setError('')

    if (value.length === 14) {
      const validation = validatePinfl(value)
      if (validation.isValid) {
        setParsedInfo(parsePinfl(value))
      } else {
        setError(t('validation.pinfl'))
        setParsedInfo(null)
      }
    } else {
      setParsedInfo(null)
    }
  }

  const handleSubmit = () => {
    const validation = validatePinfl(pinfl)
    if (!validation.isValid) {
      setError(t('validation.pinfl'))
      return
    }

    const info = parsePinfl(pinfl)
    updateFormData({
      pinfl,
      birthDate: info.birthDate,
      gender: info.gender
    })
    onNext()
  }

  const isValid = pinfl.length === 14 && !error

  return (
    <div className="screen pinfl-screen">
      <ProgressBar current={5} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('pinfl.title')}</h2>
        <p className="screen-subtitle">
          {t('pinfl.subtitle')}
        </p>

        <div className="pinfl-input-wrapper">
          <Input
            type="text"
            inputMode="numeric"
            placeholder={t('pinfl.placeholder')}
            value={pinfl}
            onChange={handleChange}
            error={error}
            success={parsedInfo ? t('pinfl.valid') : ''}
            maxLength={14}
            autoFocus
          />

          {parsedInfo && (
            <motion.div
              className="pinfl-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="pinfl-info-row">
                <span>{t('pinfl.birthDate')}:</span>
                <span>{parsedInfo.birthDate}</span>
              </div>
              <div className="pinfl-info-row">
                <span>{t('pinfl.gender')}:</span>
                <span>{parsedInfo.gender === 'male' ? t('gender.male') : t('gender.female')}</span>
              </div>
            </motion.div>
          )}

          <p className="pinfl-hint">
            {t('pinfl.hint')}
          </p>
        </div>
      </motion.div>

      <div className="screen-footer">
        <div className="button-group">
          <Button variant="ghost" onClick={onBack}>
            {t('common.back')}
          </Button>
          <Button onClick={handleSubmit} disabled={!isValid}>
            {t('common.continue')}
          </Button>
        </div>
      </div>
    </div>
  )
}
