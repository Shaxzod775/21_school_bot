import { useMemo } from 'react'

export function useTelegram() {
  const tg = useMemo(() => window.Telegram?.WebApp, [])

  const haptic = (type = 'light') => {
    if (tg?.HapticFeedback) {
      if (type === 'success') {
        tg.HapticFeedback.notificationOccurred('success')
      } else if (type === 'error') {
        tg.HapticFeedback.notificationOccurred('error')
      } else {
        tg.HapticFeedback.impactOccurred(type)
      }
    }
  }

  const requestContact = (callback) => {
    if (tg) {
      tg.requestContact(callback)
    } else {
      // Demo mode
      callback({ phone_number: '+998901234567' })
    }
  }

  const close = () => {
    if (tg) {
      tg.close()
    }
  }

  const user = tg?.initDataUnsafe?.user || null

  return {
    tg,
    haptic,
    requestContact,
    close,
    user
  }
}
