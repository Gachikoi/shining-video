import { createApp } from 'vue'
import { createPinia } from "pinia"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import ElementPlus from "element-plus"
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/dist/index.css'

// import '@/style/reset.scss'
import '@/style.css'

import App from './App.vue'
import router from './router/router'
import '@/router/permisstion'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
