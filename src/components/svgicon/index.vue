<template>
    <svg :style="{width,height}">
        <use :xlink:href="prefix + name"></use>
    </svg>
</template>
<script setup lang="ts">
defineProps({
width:{
    type:String,
    default:'40px',
},
height:{
    type:String,
    default:'40px'
},
prefix:{
    type:String,
    default:'#icon-'
},
name:String
})
</script>
<style scoped>
</style>