import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index"
import ElementPlus from 'element-plus'
// 自定义全局css
import './assets/styles/global.css'
import * as ElIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';

// ① 引入createPinia方法从pinia
import { createPinia } from 'pinia'
// ② 拿到pinia实例
const pinia = createPinia()
import '@fortawesome/fontawesome-free/css/all.min.css';
// import * as echarts from "echarts";            // 全局引入echarts

import "tailwindcss/tailwind.css"


const app = createApp(App)
for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}

// app.config.globalProperties.$echarts = echarts
app
    .use(ElementPlus)
    .use(router)
    .use(pinia) // 启用 Pinia

    .mount('#app')
    
