import './style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import installI18n from './lang'
import { VueRecaptchaPlugin } from 'vue-recaptcha/head'
import dayjs from 'dayjs'

// create and start the app
const app = createApp(App, {
  provide: () => {
    return { $dayjs: dayjs }
  }
})
installI18n(app)
app.use(VueRecaptchaPlugin, {
  v3SiteKey: '6LecXh8pAAAAAIn9FeYPNt0JCt9hRz4054CIxIeM'
})

app.mount('#app')
