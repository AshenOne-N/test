<template>
<h1>main page</h1>
<el-button type="primary" size="default" :icon="Plus">主按钮</el-button>
<el-button type="success" size="small" :icon="Edit">编辑按钮</el-button>
<el-button type="danger" size="default" :icon="Delete">删除按钮</el-button>
<el-pagination
      v-model:current-page="currentPage4"
      v-model:page-size="pageSize4"
      :page-sizes="[100, 200, 300, 400]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <svg>
      <use xlink:href="#icon-phone" fill="skyblue"></use>
    </svg>
    <svgicon :name="svgname"></svgicon>
    <pagination></pagination>
</template>
<script setup lang="ts">
//引入图标
import {Plus,Edit,Delete} from '@element-plus/icons-vue'

import { ref } from 'vue'

//import svgicon from '@/components/svgicon/index.vue'
const svgname=ref('phone')


const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}


</script>
<style scoped lang="scss">
</style>