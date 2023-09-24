<template>
    <div>
        <category :scene="scene"></category>
        <el-card class="el_class">
            <el-button icon="Plus" type="primary">添加SPU</el-button>
            <el-table border class="el_table">
                <el-table-column label="序号" type="index" align="center" width="80px">

                </el-table-column>
                <el-table-column label="SPU名称">

                </el-table-column>
                <el-table-column label="SPU描述">

                </el-table-column>
                <el-table-column label="SPU操作">

                </el-table-column>

            </el-table>
            <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4"
                :page-sizes="[3, 5, 7, 9]"  :background="background"
                layout=" prev, pager, next, jumper, ->,sizes, total" :total="40" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
let scene = ref<boolean>(true);

const currentPage4 = ref(4)
const pageSize4 = ref(3)
const background = ref(true)
const handleSizeChange = (val: number) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>
<style scoped lang="scss">
.el_class {
    margin: 20px 0px;

    .el_table {
        margin: 10px 0px;
    }
}
</style>