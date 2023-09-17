import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

//配置src别名
import path from "path";

//引入svg需要的插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

//引入mock插件
//import {UserConfigExport,ConfigEnv} from 'vite'
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //运行模式
  //环境配置文件路径，项目根目录（index.html文件所在位置）所在位置
  let env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        //specify the icon folder tobe cached
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        //specify symbolId format
        symbolId: "icon-[dir]-[name]",
      }),
      viteMockServe({
        mockPath: "./mock",
        enable: command === "serve", //保证开发阶段可以使用mock接口
      }),
    ],
    //配置src别名
    resolve: {
      alias: {
        "@": path.resolve("./src"), //相对路径别名配置，使用@代替src
      },
    }, //

    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";', //此处‘；’一定不要省略
        },
      },
    },
    //代理跨域
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据服务器地址
          target: env.VITE_SERVER,
          //代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
