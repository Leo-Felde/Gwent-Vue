import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import './assets/styles/main.sass'

import notificationPlugin from './plugins/notificationPlugin'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(notificationPlugin)
app.mount('#app')
