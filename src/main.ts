import { useAuthStore } from '@/stores/auth.store';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

const authStore = useAuthStore()
authStore.checkAuth()

app.use(router)

app.mount('#app')
