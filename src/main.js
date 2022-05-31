import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import 'animate.css';
import '@ocrv/vue-tailwind-pagination/styles'

createApp(App).use(router).use(router).mount('#app')
