<template>
    <el-button size="small" icon="Refresh" :circle="true" @click="refreshpage"></el-button>
    <el-button size="small" icon="FullScreen" :circle="true" @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" :circle="true"></el-button>
    <!--
    <img class="avaimg" src="../../../../public/logo.png">-->
    <img class="avaimg" :src="userStore.avatar">
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
//获取用户相关仓库
import useUserStore from '@/store/modules/user';
let userStore = useUserStore();

import { useRouter ,useRoute} from 'vue-router';
let $router = useRouter();
let $route = useRoute();

let layoutSettingStore = useLayoutSettingStore();
const refreshpage = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}
//全屏点击回调
const fullScreen = ()=>{
    //DOM对象属性，判断全屏状态
    let full = document.fullscreenElement;
    if(!full){
        document.documentElement.requestFullscreen();//文档根节点方法进入全屏
    }else{
        document.exitFullscreen();//真的不优雅
    }
}
const logout = ()=>{
    //1.发请求，标识token无效
    //2.清空用户数据
    userStore.userLogout();
    //3.跳转登录页面
    $router.push({path:'/login',query:{redirect:$route.path}});
}
</script>
<style scoped lang="scss">
.avaimg {
    width: 24px;
    height: 24px;
    margin: 0px 10px;
    border-radius: 50%;
}
</style>