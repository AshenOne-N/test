//引入项目中的全部全局组件
import svgicon from "@/components/svgicon/index.vue";
import pagination from "@/components/pagination/index.vue";
//引入element-plus提供的全部图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
//全局对象
const allGlobalComponents = { svgicon, pagination };
//对外暴露插件对消
export default {
  //必须叫做install方法
  install(app) {
    //注册项目全部全局组件
    Object.keys(allGlobalComponents).forEach((key) => {
      app.component(key, allGlobalComponents[key]);
    });
    //将element-plus图标注册成为全局组件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
  };
},
}