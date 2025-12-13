import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import { validatePhone } from '../../utils/validation'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ProgressBar from '../ui/ProgressBar'
import './Phone.css'

export default function Phone({ onNext, onBack }) {
  const { formData, updateFormData } = useForm()
  const { t } = useLanguage()
  const [phone, setPhone] = useState(formData.phone || '')
  const [error, setError] = useState('')

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length === 0) return ''
    if (digits.length <= 2) return `+${digits}`
    if (digits.length <= 5) return `+${digits.slice(0, 3)} ${digits.slice(3)}`
    if (digits.length <= 7) return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`
    if (digits.length <= 9) return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
    return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`
  }

  const handleChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setPhone(formatted)
    setError('')
  }

  const handleSubmit = () => {
    const validation = validatePhone(phone)
    if (!validation.isValid) {
      setError(t('validation.phone'))
      return
    }
    updateFormData({ phone })
    onNext()
  }

  const isValid = phone.replace(/\D/g, '').length === 12

  return (
    <div className="screen phone-screen">
      <ProgressBar current={2} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('phone.title')}</h2>
        <p className="screen-subtitle">
          {t('phone.subtitle')}
        </p>

        <div className="phone-input-wrapper">
          <Input
            type="tel"
            placeholder="+998 XX XXX XX XX"
            value={phone}
            onChange={handleChange}
            error={error}
            autoFocus
          />
          <p className="phone-hint">
            {t('phone.hint')}
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
