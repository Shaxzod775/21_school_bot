import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Clock, Monitor, Users, Info } from 'lucide-react'
import { useForm } from '../../context/FormContext'
import { useLanguage } from '../../context/LanguageContext'
import { CAMPUSES } from '../../utils/constants'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import ProgressBar from '../ui/ProgressBar'
import './Campus.css'

export default function Campus({ onNext, onBack }) {
  const { formData, updateFormData } = useForm()
  const { t } = useLanguage()
  const [campus, setCampus] = useState(formData.campus || '')
  const [showModal, setShowModal] = useState(false)
  const [selectedCampusInfo, setSelectedCampusInfo] = useState(null)

  const handleCampusInfo = (c) => {
    setSelectedCampusInfo(c)
    setShowModal(true)
  }

  const handleSubmit = () => {
    updateFormData({ campus })
    onNext()
  }

  return (
    <div className="screen campus-screen">
      <ProgressBar current={7} total={11} />

      <motion.div
        className="screen-content"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h2 className="screen-title">{t('campus.title')}</h2>
        <p className="screen-subtitle">
          {t('campus.subtitle')}
        </p>

        <div className="campus-list">
          {CAMPUSES.map((c) => (
            <motion.div
              key={c.id}
              className={`campus-card ${campus === c.id ? 'selected' : ''}`}
              onClick={() => setCampus(c.id)}
              whileTap={{ scale: 0.98 }}
            >
              <div className="campus-main">
                <div className="campus-radio">
                  {campus === c.id && <div className="radio-dot" />}
                </div>
                <div className="campus-info">
                  <span className="campus-name">{c.name}</span>
                  <span className="campus-location">{c.location}</span>
                </div>
              </div>
              <button
                className="campus-info-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  handleCampusInfo(c)
                }}
              >
                <Info size={18} />
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="screen-footer">
        <div className="button-group">
          <Button variant="ghost" onClick={onBack}>
            {t('common.back')}
          </Button>
          <Button onClick={handleSubmit} disabled={!campus}>
            {t('common.continue')}
          </Button>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCampusInfo?.name}
        footer={
          <Button onClick={() => setShowModal(false)} fullWidth>
            {t('campus.understood')}
          </Button>
        }
      >
        {selectedCampusInfo && (
          <>
            <div className="modal-info-row">
              <MapPin size={18} className="modal-icon" />
              <span>{selectedCampusInfo.address}</span>
            </div>
            <div className="modal-info-row">
              <Clock size={18} className="modal-icon" />
              <span>{t('campus.hours')}</span>
            </div>
            <div className="modal-divider" />
            <div className="modal-stats">
              <div className="modal-stat">
                <Monitor size={16} className="modal-icon" />
                <span>{selectedCampusInfo.workstations} {t('campus.workstations')}</span>
              </div>
              <div className="modal-stat">
                <Users size={16} className="modal-icon" />
                <span>{selectedCampusInfo.capacity} {t('campus.students')}</span>
              </div>
            </div>
          </>
        )}
      </Modal>
    </div>
  )
}
