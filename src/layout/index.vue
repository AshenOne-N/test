<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{fold:layoutSettingStore.fold?true:false}">
            <Logo></Logo>
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#001529" text-color="white" active-text-color="cyan" :default-active="$useRoute.path" :collapse="layoutSettingStore.fold?true:false">
                   <!--根据路由动态生成菜单-->
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!--顶部导航-->
        <div class="layout_tabbar" :class="{fold:layoutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>
        <!--内容展示区域-->
        <div class="layout_main" :class="{fold:layoutSettingStore.fold?true:false}">
            <!-- 包装一层组件
            <router-view></router-view> -->
            <Main></Main>
        </div>
    </div>
</template>
<script setup lang="ts">
import Logo from './logo/index.vue'
//引入菜单组件
import Menu from './menu/index.vue'
//右侧内容展示区
import Main from './main/index.vue'
//顶部tabbar
import Tabbar from './tabbar/index.vue'

//获取路由对象
import { useRoute } from 'vue-router';
let $useRoute = useRoute();
//引入路由仓库
import useUserStore  from '@/store/modules/user';
let userStore = useUserStore();
//获取layout组件仓库
import useLayoutSettingStore from '@/store/modules/setting';
let layoutSettingStore = useLayoutSettingStore();
</script>
<style scoped  lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    //background: red;
    

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        color:white;
        transition: all 0.3s;//过渡动画

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
            color:white;
            .el-menu{
                border-right: none;
            }
        }
        &.fold{ //父类
            width:$fold-menu-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        //background: cyan;
        //color:black;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;
        &.fold{
            width:calc(100% - $fold-menu-width);
            left:$fold-menu-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: yellowgreen;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width:calc(100% - $fold-menu-width);
            left:$fold-menu-width;
        }
    }
}</style>
