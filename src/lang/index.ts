// User defined lang
import en from './en.json'
import pl from './pl.json'
import { createI18n } from 'vue-i18n'

const messages = { en, pl }

export const getLocale = () => {
  const cookieLanguage = sessionStorage.getItem('language')
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return 'pl'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocale(),
  messages
})
