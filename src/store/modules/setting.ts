//layout组件配置信息仓库
import { defineStore } from "pinia";
let useLayoutSettingStore = defineStore('SettingStore',{
    state:()=>{
        return {
            fold:false,//控制菜单折叠展开
            refresh:false,//刷新控制
        }
    }
})
export default useLayoutSettingStore;