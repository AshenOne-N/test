import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

//配置src别名
import path from 'path'

//引入svg需要的插件
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
      //specify the icon folder tobe cached
      iconDirs:[path.resolve(process.cwd(),'src/assets/icons')],
      //specify symbolId format
      symbolId:'icon-[dir]-[name]'
    })
  ],
  //配置src别名
  resolve:{
    alias:{
      "@":path.resolve("./src")//相对路径别名配置，使用@代替src
    }
  },//

  //scss全局变量配置
  css:{
    preprocessorOptions:{
      scss:{
        javascriptEnabled:true,
        additionalData:'@import "./src/styles/variable.scss";',//此处‘；’一定不要省略
      },
    },
  }
})
