import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import { validatePassword } from '../../utils/validation'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ProgressBar from '../ui/ProgressBar'
import './Password.css'

export default function Password({ onNext, onBack }) {
  const { formData, updateFormData } = useForm()
  const { t } = useLanguage()
  const [password, setPassword] = useState(formData.password || '')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const passwordStrength = useMemo(() => {
    if (!password) return { score: 0, label: '', color: '' }

    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z0-9]/.test(password)) score++

    if (score <= 1) return { score: 1, label: t('password.weak'), color: '#FF4A50' }
    if (score <= 2) return { score: 2, label: t('password.medium'), color: '#FFB800' }
    if (score <= 3) return { score: 3, label: t('password.good'), color: '#44EB99' }
    return { score: 4, label: t('password.excellent'), color: '#44EB99' }
  }, [password, t])

  const requirements = [
    { met: password.length >= 8, text: t('password.req1') },
    { met: /[A-Z]/.test(password), text: t('password.req2') },
    { met: /[a-z]/.test(password), text: t('password.req3') },
    { met: /\d/.test(password), text: t('password.req4') },
    { met: /[^a-zA-Z0-9]/.test(password), text: t('password.req5') }
  ]

  const handleSubmit = () => {
    const validation = validatePassword(password)
    if (!validation.isValid) {
      setError(t('validation.password'))
      return
    }
    if (password !== confirmPassword) {
      setError(t('password.mismatch'))
      return
    }
    updateFormData({ password })
    onNext()
  }

  const isValid = passwordStrength.score >= 2 && password === confirmPassword && confirmPassword.length > 0

  return (
    <div className="screen password-screen">
      <ProgressBar current={9} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('password.title')}</h2>
        <p className="screen-subtitle">
          {t('password.subtitle')}
        </p>

        <div className="password-inputs">
          <Input
            type="password"
            placeholder={t('password.placeholder')}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setError('')
            }}
            autoFocus
          />

          {password && (
            <motion.div
              className="password-strength"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="strength-bar">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`strength-segment ${level <= passwordStrength.score ? 'active' : ''}`}
                    style={{ backgroundColor: level <= passwordStrength.score ? passwordStrength.color : undefined }}
                  />
                ))}
              </div>
              <span className="strength-label" style={{ color: passwordStrength.color }}>
                {passwordStrength.label}
              </span>
            </motion.div>
          )}

          <div className="password-requirements">
            {requirements.map((req, index) => (
              <div key={index} className={`requirement ${req.met ? 'met' : ''}`}>
                <span className="requirement-icon">{req.met ? '✓' : '○'}</span>
                <span>{req.text}</span>
              </div>
            ))}
          </div>

          <Input
            type="password"
            placeholder={t('password.confirmPlaceholder')}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              setError('')
            }}
            error={error}
          />
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
