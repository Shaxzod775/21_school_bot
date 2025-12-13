import { createContext, useContext, useState, useEffect } from 'react'
import { translations, languages } from '../utils/translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Try to get saved language from localStorage
    const saved = localStorage.getItem('app_language')
    if (saved && translations[saved]) {
      return saved
    }
    // Try to detect from Telegram WebApp
    if (window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code) {
      const tgLang = window.Telegram.WebApp.initDataUnsafe.user.language_code
      if (translations[tgLang]) return tgLang
      if (tgLang === 'uk') return 'ru' // Ukrainian users might prefer Russian
    }
    // Default to Russian
    return 'ru'
  })

  useEffect(() => {
    localStorage.setItem('app_language', language)
  }, [language])

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return value || key
  }

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang)
    }
  }

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: changeLanguage,
      t,
      languages,
      translations: translations[language]
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
