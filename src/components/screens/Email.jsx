import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import { validateEmail } from '../../utils/validation'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ProgressBar from '../ui/ProgressBar'
import './Email.css'

export default function Email({ onNext, onBack }) {
  const { formData, updateFormData } = useForm()
  const { t } = useLanguage()
  const [email, setEmail] = useState(formData.email || '')
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setEmail(e.target.value)
    setError('')
  }

  const handleSubmit = () => {
    const validation = validateEmail(email)
    if (!validation.isValid) {
      setError(t('validation.email'))
      return
    }
    updateFormData({ email })
    onNext()
  }

  const isValid = email.includes('@') && email.includes('.')

  return (
    <div className="screen email-screen">
      <ProgressBar current={8} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('email.title')}</h2>
        <p className="screen-subtitle">
          {t('email.subtitle')}
        </p>

        <div className="email-input-wrapper">
          <Input
            type="email"
            placeholder="example@mail.com"
            value={email}
            onChange={handleChange}
            error={error}
            autoFocus
          />
          <p className="email-hint">
            {t('email.hint')}
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
