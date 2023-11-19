// User defined lang
import en from './en.json'
import pl from './pl.json'

import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

const messages = { en, pl }

const getLocale = () => {
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

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getLocale(),
  messages
})

// export default i18n
export default (app: App<Element>): void => {
  app.use(i18n)
}
