import { createContext, useContext, useState } from 'react'

const FormContext = createContext()

const initialFormData = {
  firstName: '',
  lastName: '',
  phone: '',
  gender: '',
  birthDate: '',
  campus: '',
  email: '',
  password: '',
  pinfl: '',
  userId: null
}

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialFormData)

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const updateFields = (fields) => {
    setFormData(prev => ({ ...prev, ...fields }))
  }

  const resetForm = () => {
    setFormData(initialFormData)
  }

  return (
    <FormContext.Provider value={{ formData, updateField, updateFields, resetForm }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('useForm must be used within a FormProvider')
  }
  return context
}
