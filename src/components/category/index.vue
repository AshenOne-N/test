<template>
     <el-card>
            <el-form inline="true">
                <el-form-item label="一级分类">
                    <!--自定义事件传参需要用$event专门表示-->
                    <el-select placeholder="一级属性" v-model="categoryStore.c1_ID" @change="c1handler($event)" :disabled="!scene">
                        <el-option v-for="(item,index) in categoryStore.c1_arr" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        <!--label为显示文字 value为select收集数据
                           <el-option v-for="(item,index) in c1_arr" :key="item.id" >{{ item.name }}</el-option> 
                        -->
                    </el-select>
                </el-form-item>
                <el-form-item label="二级分类">
                    <el-select placeholder="二级属性" @change="c2handler" v-model="categoryStore.c2_ID" :disabled="!scene">
                        <el-option v-for="(item,index) in categoryStore.c2_arr"  :key="item.id" :label="item.name" :value="item.id" />
                        
                    </el-select>
                </el-form-item>
                <el-form-item label="三级分类">
                    <el-select placeholder="三级属性" v-model="categoryStore.c3_ID" :disabled="!scene">
                        <el-option v-for="(item,index) in categoryStore.c3_arr"  :key="item.id" :label="item.name" :value="item.id" />
                        
                    </el-select>
                </el-form-item>
            </el-form>
        </el-card>
</template>
<script setup lang="ts">
//引入分类接口方法
import { onMounted } from 'vue';
import useCategoryStore from '@/store/modules/category.ts';
//接收数值
defineProps(['scene']);
let categoryStore = useCategoryStore();

const c1handler = (v)=>{
    console.log(v)
    categoryStore.getC2(categoryStore.c1_ID);
    categoryStore.c2_ID = '';
    categoryStore.c2_arr=[];
    categoryStore.c3_ID = '';
    categoryStore.c3_arr=[];
}
const c2handler = ()=>{
    categoryStore.getC3(categoryStore.c2_ID);
    categoryStore.c3_ID='';
    categoryStore.c3_arr=[];
}
onMounted(()=>{
    categoryStore.getC1();
})
</script>
<style scoped lang="scss">
</style>