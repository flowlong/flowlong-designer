import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as elIcons from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus)

// 统一注册el图标
for(let icon in elIcons){
    app.component(`ElIcon${icon}`, elIcons[icon])
}
app.mount('#app')
