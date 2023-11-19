import './style.scss'

import { createApp } from 'vue'
import App from './App.vue'
import installI18n from './lang'

// create and start the app
const app = createApp(App)
installI18n(app)
app.mount('#app')
