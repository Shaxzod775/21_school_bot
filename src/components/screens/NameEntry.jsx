import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import Button from '../ui/Button'
import Input from '../ui/Input'
import ProgressBar from '../ui/ProgressBar'
import './NameEntry.css'

export default function NameEntry({ onNext, onBack }) {
  const { formData, updateFormData } = useForm()
  const { t } = useLanguage()
  const [firstName, setFirstName] = useState(formData.firstName || '')
  const [lastName, setLastName] = useState(formData.lastName || '')
  const [middleName, setMiddleName] = useState(formData.middleName || '')

  const handleSubmit = () => {
    updateFormData({ firstName, lastName, middleName })
    onNext()
  }

  const isValid = firstName.trim().length >= 2 && lastName.trim().length >= 2

  return (
    <div className="screen name-screen">
      <ProgressBar current={4} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('name.title')}</h2>
        <p className="screen-subtitle">
          {t('name.subtitle')}
        </p>

        <div className="name-inputs">
          <Input
            label={t('name.lastName')}
            placeholder={t('name.lastNamePlaceholder')}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoFocus
          />
          <Input
            label={t('name.firstName')}
            placeholder={t('name.firstNamePlaceholder')}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            label={t('name.middleName')}
            placeholder={t('name.middleNamePlaceholder')}
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
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
