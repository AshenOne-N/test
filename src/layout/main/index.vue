<template>
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <!--渲染子路由-->
                <component :is="Component" v-if="showFlag" />
            </transition>
        </router-view>
</template>
<script setup lang="ts">
import { watch,ref,nextTick } from 'vue'; 
import useLayoutSettingStore from '@/store/modules/setting';
let showFlag = ref(true);
let layoutSettingStore = useLayoutSettingStore();
watch(()=>layoutSettingStore.refresh,()=>{
    showFlag.value = false;
    nextTick(()=>{
        showFlag.value=true;
    })
})
</script>
<style scoped lang="scss">
.fade-enter-from{
   opacity:0;
   //transfrom:Lrotate(0deg);
   transform:scale(0);
}
.fade-enter-active{
    transition:all .3s;
}
.fade-enter-to{
    opacity:1;
    //transform:rotate(360deg);
    transform:scale(1);
}
</style>