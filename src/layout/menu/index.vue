<template>
    <template v-for="(item, index) in menuList" :key="item.path">
        <!--没有子路由-->

        <el-menu-item v-if="!item.children && item.meta.show" :index="item.path" @click="goRoute">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <template #title>
                <span>{{ item.meta.title }}
                </span>
            </template>
        </el-menu-item>
        <!--只有一个子路由-->
        <el-menu-item v-if="item.children && item.children.length == 1 && item.children[0].meta.show"
            :index="item.children[0].path" @click="goRoute">
            <el-icon>
                <component :is="item.children[0].meta.icon"></component>
                
            </el-icon>
            <template #title>
                <span>{{ item.children[0].meta.title }}</span>
            </template>
        </el-menu-item>
        <!--有两个以上子路由-->
        <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menuList="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>
<script setup lang="ts">
//获取路由实例，为了通过api实现路由跳转
import { useRouter } from 'vue-router';
let $router = useRouter();

defineProps(['menuList']);
const goRoute = (vc: any) => {
    //路由跳转
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>
<style scoped lang="scss">
div {
    color: white;
}
</style>