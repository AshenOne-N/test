<template>
    <el-icon style="margin-right:10px;" @click="changeIcon">
        <component :is="layoutSettingStore.fold?'Expand':'Fold'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
        <!--动态展示
                <el-breadcrumb-item>homepage</el-breadcrumb-item>
                <el-breadcrumb-item>promotion management</el-breadcrumb-item>-->
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-show="item.meta.show" :to="item.path">
            <el-icon style="margin: 0px 2px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

let $route = useRoute();

import { ArrowRight } from '@element-plus/icons-vue';
import userLayoutSettingStore from '@/store/modules/setting.ts';
let layoutSettingStore = userLayoutSettingStore();
const changeIcon = () => {
    layoutSettingStore.fold = !layoutSettingStore.fold

}
</script>
<style scoped lang="scss"></style>