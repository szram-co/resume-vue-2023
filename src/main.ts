import './style.scss'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'

import { i18n } from './lang'
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'
import App from './App.vue'

// create and start the app
const app = createApp(App)

app.use(MotionPlugin)
app.use(i18n)
app.use(VueRecaptchaPlugin, {
  v3SiteKey: '6LecXh8pAAAAAIn9FeYPNt0JCt9hRz4054CIxIeM'
})

app.mount('#app')
