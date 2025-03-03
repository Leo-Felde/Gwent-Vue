import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

import './assets/styles/main.sass'

import notificationPlugin from './plugins/notificationPlugin'
import carouselPlugin from './plugins/carouselPlugin'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(notificationPlugin)
app.use(carouselPlugin)
app.mount('#app')
