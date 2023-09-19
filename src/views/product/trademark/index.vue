<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus" >添加品牌</el-button>
        <!--
            boder:设置边框
            label：某列标题
            width：宽度
            align：文字对齐
        -->
        <el-table :data="tableData" border style="width: 100%" class="el_table">
            <el-table-column type="index" label="序号" width="80px" align="center"/>
            <!--默认用div，可以用插槽
                <el-table-column llabel="品牌名称">
                    <template #="{row,column,$index}">
                        row:每个数据对象
                        column：列
                        <pre>{{ row.tmName }}</pre>
                    </template>
                </el-table-column>
            -->
            <el-table-column prop="tmName" label="品牌名称" width="180" />
            <el-table-column prop="address" label="品牌LOGO" >
                <template #="{row,$index}">
                    <img :src="row.logoUrl " style="width:100px;height:100px;" alt="获取失败">
                </template>
            </el-table-column>
            <el-table-column prop="address" label="品牌操作" >
                <template #="row,$index">
                    <el-button type="primary" size="small" icon="Edit"></el-button>
                    <el-button type="danger" size="small" icon="delete"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页器
        pagination
        v-model:current-page:分页当前密码
        page-sizes:下拉选单每页个数
        background：选中颜色
        layout:设置分页6个子组件布局
        可以控制台查看名称
        可用->实现靠右显示
        -->
        <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7, 9]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout=" prev, pager, next, jumper, ->,sizes, total"
      :total="totalnumber"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </el-card>
</template>
<script setup lang="ts">

import { ref,onMounted } from 'vue';
import {reqHasTrademark} from '@/api/product/trademark/index';
import {Records,TrademarkResponseData} from '@/api/product/trademark/type';
const tableData = ref<Records>([]);

const currentPage = ref<number>(1)
const pageSize = ref(3)
const small = ref(true)
const background = ref(true)
const disabled = ref(false)
const totalnumber = ref<number>(100);
const getTableData = async()=>{
    let result:TrademarkResponseData = await reqHasTrademark(currentPage.value,pageSize.value);
    if(result.code ==200){
        totalnumber.value = result.data.total;
        tableData.value = result.data.records;
    }
};
onMounted(()=>{
    getTableData();
})

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<style scoped lang="scss">
.el_table{
    margin:10px 0px;
}
</style>