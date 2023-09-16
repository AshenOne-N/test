import { createApp } from 'vue'

//引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//import { zhCn } from 'element-plus/dist/locale/zh-cn.mjs';
import zhCn from 'element-plus/es/locale/lang/zh-cn'

//import App from './App.vue'
import App from '@/App.vue'//使用了src的相对路径

//导入svg插件配置
import 'virtual:svg-icons-register'

const app = createApp(App)
app.use(ElementPlus,{
    locale:zhCn
})
//console.log(import.meta.env.VITE_SERVER)获取环境变量

//全局注册svg自定义组件
//import svgicon from '@/components/svgicon/index.vue'
//app.component('svgicon',svgicon)

//自定义插件使用
import globalComponents from '@/components/index.ts'
app.use(globalComponents)

//引入scss样式
//import '@/styles'
import '@/styles/index.scss'

//导入路由
import router from '@/router'

//测试mock接口
/*
import axios from 'axios'
axios({
    url:'/api/user/login',
    method:'post',
    data:{
        username:'admin',
        password:'111111'
    }
})*/

//导入pinia
import pinia from '@/store'
//导入路由守卫
import './permission'
app.use(pinia)

app.use(router)

app.mount('#app')
