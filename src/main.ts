import { createApp } from 'vue'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from "element-plus"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

// import '@/style/reset.scss'
import '@/style/style.css'

import App from './App.vue'
import router from './router'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app=createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale:zhCn
})

app.mount('#app')
