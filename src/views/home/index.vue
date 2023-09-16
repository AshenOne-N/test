<template>
    <h1>这是登录成功展示数据页面{{ useStore.username }}</h1>
 </template>
 <script setup lang="ts">
 //import { onMounted } from 'vue';
 import useUserStore from '@/store/modules/user';
 let useStore = useUserStore();
 /*
onMounted(()=>{
   useStore.userInfo();
})*/
 </script>
 <style scoped  lang="scss">
 .layout_container{
    width: 100%;
    height:100vh;
    background: red;
 }
 </style>