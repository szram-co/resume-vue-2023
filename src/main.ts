import './style.scss'
import 'bootstrap/js/index.esm'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'

import { i18n } from './lang'
import { VueRecaptchaPlugin } from 'vue-recaptcha'
import App from './App.vue'
import { createHead } from '@vueuse/head'

// create and start the app
const app = createApp(App)
const appHead = createHead()

app.use(appHead)
app.use(MotionPlugin)
app.use(i18n)
app.use(VueRecaptchaPlugin, {
  v3SiteKey: '6LecXh8pAAAAAIn9FeYPNt0JCt9hRz4054CIxIeM'
})

app.mount('#app')
