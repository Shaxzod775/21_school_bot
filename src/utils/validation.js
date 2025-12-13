// Email validation
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, error: 'Введите email' }
  }
  if (!isValidEmail(email)) {
    return { isValid: false, error: 'Неверный формат email' }
  }
  return { isValid: true, error: '' }
}

// Phone validation
export const isValidPhone = (phone) => {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned.length >= 12
}

export const validatePhone = (phone) => {
  if (!phone) {
    return { isValid: false, error: 'Введите номер телефона' }
  }
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length < 12) {
    return { isValid: false, error: 'Номер телефона должен содержать 12 цифр' }
  }
  return { isValid: true, error: '' }
}

// PINFL validation
export const validatePinfl = (pinfl) => {
  if (!pinfl) {
    return { isValid: false, error: 'Введите ПИНФЛ' }
  }
  if (!/^\d{14}$/.test(pinfl)) {
    return { isValid: false, error: 'ПИНФЛ должен содержать 14 цифр' }
  }
  if (!/^[3-6]/.test(pinfl)) {
    return { isValid: false, error: 'Неверный формат ПИНФЛ' }
  }
  return { isValid: true, error: '' }
}

// PINFL parsing
export const parsePinfl = (pinfl) => {
  if (!/^\d{14}$/.test(pinfl) || !/^[3-6]/.test(pinfl)) {
    return null
  }

  const genderDigit = parseInt(pinfl[0])
  const gender = (genderDigit === 3 || genderDigit === 5) ? 'male' : 'female'

  const century = genderDigit <= 4 ? 1900 : 2000
  const year = century + parseInt(pinfl.substring(1, 3))
  const month = pinfl.substring(3, 5)
  const day = pinfl.substring(5, 7)

  const birthDate = `${day}.${month}.${year}`

  return { gender, birthDate, genderText: gender === 'male' ? 'Мужской' : 'Женский' }
}

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, error: 'Введите пароль' }
  }

  const requirements = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  }

  const metCount = Object.values(requirements).filter(Boolean).length
  let strength = 'weak'

  if (metCount >= 5) strength = 'strong'
  else if (metCount >= 4) strength = 'good'
  else if (metCount >= 3) strength = 'fair'

  const isValid = requirements.length && requirements.upper && requirements.lower && requirements.number

  return {
    requirements,
    strength,
    isValid,
    error: isValid ? '' : 'Пароль не соответствует требованиям'
  }
}

// Generate secure password
export const generatePassword = () => {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const special = '!@#$%^&*'
  const all = upper + lower + numbers + special

  let password = ''
  password += upper[Math.floor(Math.random() * upper.length)]
  password += lower[Math.floor(Math.random() * lower.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += special[Math.floor(Math.random() * special.length)]

  for (let i = 0; i < 8; i++) {
    password += all[Math.floor(Math.random() * all.length)]
  }

  return password.split('').sort(() => Math.random() - 0.5).join('')
}

// Transliteration
export const transliterate = (text) => {
  const map = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  }

  return text.toLowerCase().split('').map(char => map[char] || char).join('')
}
