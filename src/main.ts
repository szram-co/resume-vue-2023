import './style.scss'
import 'bootstrap/js/dist/dropdown'

import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'

import { i18n } from './lang'
import { VueRecaptchaPlugin } from 'vue-recaptcha'
import AppComponent from './App.vue'
import { createHead } from '@vueuse/head'
import { ThemeService } from '@/services/Theme.service'
import { FactoryService } from '@/services/Factory.service'

// create and start the app
const app = createApp(AppComponent)
const appHead = createHead()

app.use(appHead).use(MotionPlugin).use(i18n).use(VueRecaptchaPlugin, {
  v3SiteKey: '6LecXh8pAAAAAIn9FeYPNt0JCt9hRz4054CIxIeM'
})

app.provide(ThemeService.getServiceKey(), FactoryService.createService(ThemeService))

app.mount('#app')
