import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { FormProvider } from './context/FormContext'
import { LanguageProvider } from './context/LanguageContext'
import { useTelegram } from './hooks/useTelegram'

// Screens
import Welcome from './components/screens/Welcome'
import Consent from './components/screens/Consent'
import Phone from './components/screens/Phone'
import IdVerification from './components/screens/IdVerification'
import NameEntry from './components/screens/NameEntry'
import Pinfl from './components/screens/Pinfl'
import Gender from './components/screens/Gender'
import Campus from './components/screens/Campus'
import Email from './components/screens/Email'
import Password from './components/screens/Password'
import Rules from './components/screens/Rules'
import Confirmation from './components/screens/Confirmation'
import Success from './components/screens/Success'

// Components
import Toast from './components/ui/Toast'
import Loading from './components/ui/Loading'
import AiChat from './components/ui/AiChat'
import Footer from './components/ui/Footer'
import LanguageSwitcher from './components/ui/LanguageSwitcher'
import SplashScreen from './components/ui/SplashScreen'

// Styles
import './styles/globals.css'
import './components/screens/screens.css'

const screens = [
  'welcome',
  'consent',
  'phone',
  'id',
  'name',
  'pinfl',
  'gender',
  'campus',
  'email',
  'password',
  'rules',
  'confirm',
  'success'
]

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [currentScreen, setCurrentScreen] = useState('welcome')
  const [history, setHistory] = useState([])
  const [toast, setToast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [direction, setDirection] = useState(1)
  const [isAiChatOpen, setIsAiChatOpen] = useState(false)

  const { tg, haptic } = useTelegram()

  // Auto-hide splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (tg) {
      tg.ready()
      tg.expand()
    }
  }, [tg])

  // Handle back button
  useEffect(() => {
    if (tg && currentScreen !== 'welcome' && currentScreen !== 'success') {
      tg.BackButton.show()
      tg.BackButton.onClick(goBack)
    } else if (tg) {
      tg.BackButton.hide()
    }

    return () => {
      if (tg) {
        tg.BackButton.offClick(goBack)
      }
    }
  }, [currentScreen, tg])

  const navigateTo = (screen) => {
    setDirection(1)
    setHistory(prev => [...prev, currentScreen])
    setCurrentScreen(screen)
    haptic('light')
  }

  const goNext = () => {
    const currentIndex = screens.indexOf(currentScreen)
    if (currentIndex < screens.length - 1) {
      navigateTo(screens[currentIndex + 1])
    }
  }

  const goBack = () => {
    if (history.length > 0) {
      setDirection(-1)
      const prevScreen = history[history.length - 1]
      setHistory(prev => prev.slice(0, -1))
      setCurrentScreen(prevScreen)
      haptic('light')
    }
  }

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const renderScreen = () => {
    const props = {
      onNext: goNext,
      onBack: goBack,
      showToast,
      setLoading,
      haptic
    }

    switch (currentScreen) {
      case 'welcome':
        return <Welcome onNext={() => navigateTo('consent')} />
      case 'consent':
        return <Consent {...props} />
      case 'phone':
        return <Phone {...props} />
      case 'id':
        return <IdVerification {...props} />
      case 'name':
        return <NameEntry {...props} />
      case 'pinfl':
        return <Pinfl {...props} />
      case 'gender':
        return <Gender {...props} />
      case 'campus':
        return <Campus {...props} />
      case 'email':
        return <Email {...props} />
      case 'password':
        return <Password {...props} />
      case 'rules':
        return <Rules {...props} />
      case 'confirm':
        return <Confirmation {...props} />
      case 'success':
        return <Success />
      default:
        return <Welcome onNext={() => navigateTo('consent')} />
    }
  }

  return (
    <LanguageProvider>
      <FormProvider>
        <div className="app">
          <AnimatePresence>
            {showSplash && <SplashScreen />}
          </AnimatePresence>

          <LanguageSwitcher />

          <div className="screens-container">
            <AnimatePresence mode="wait" custom={direction}>
              {renderScreen()}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {toast && <Toast message={toast.message} type={toast.type} />}
          </AnimatePresence>

          {loading && <Loading />}

          <Footer onAiClick={() => setIsAiChatOpen(true)} />

          <AiChat
            isOpen={isAiChatOpen}
            onClose={() => setIsAiChatOpen(false)}
          />
        </div>
      </FormProvider>
    </LanguageProvider>
  )
}

export default App
