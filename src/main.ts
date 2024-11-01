// import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import '@fortawesome/fontawesome-free/css/all.css';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#app')
