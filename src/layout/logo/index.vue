<template>
    <div class="logo">
        <img :src="setting.logo" alt="">
        <p v-show="!layoutSettingStore.fold">{{setting.title}}</p>
    </div>
    </template>
    <script setup lang="ts">
    //引入配置文件
    import setting from '@/setting';
    import useLayoutSettingStore from '@/store/modules/setting';
    let layoutSettingStore = useLayoutSettingStore(); 
    
    </script>
    <style scoped lang="scss">
    .logo{
        width:100%;
        height:$base-menu-logo-height;
        color: white;
        display:flex;
        align-items:center;
        padding: 10px;
        img{
            width: 40px;
            height: 40px;
        }
        p{
            font-size: $base-logo-font-size;
            margin-left: 10px;
        }
    }
    </style>