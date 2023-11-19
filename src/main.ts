import './style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import pl from './locales/pl.json'
import en from './locales/en.json'
import { createI18n } from 'vue-i18n'

// configure i18n
const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('selectedLanguage') || 'pl',
  fallbackLocale: 'pl',
  globalInjection: true,
  messages: { pl, en }
})

// create and start the app
const app = createApp(App)
app.use(i18n)
app.mount('#app')
