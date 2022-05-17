import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// import './mock/mock'

import './styles/main.css'
import 'uno.css'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  return {
    app,
  }
}
