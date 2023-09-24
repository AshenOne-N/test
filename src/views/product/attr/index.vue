<template>
    <div>
        <category :scene="scene"></category>
        <el-card class="main-card">
            <div v-if="scene">
                <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3_ID ? false : true"
                    @click="addAttr">添加属性</el-button>
                <el-table border class="el-table" :data="attrData">
                    <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
                    <el-table-column label="属性名称" width="120px" prop="attrName"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-tag class="el_tag" v-for="(item)  in row.attrValueList" :key="item.id">{{ item.valueName
                            }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px">
                        <template #="{row, $index}">
                            <el-button type="warning" size="small" icon="Edit" @click="updateAttr(row)"></el-button>

                            <el-popconfirm title="确定删除？" width="200px" icon="delete" @confirm="deleteAttr(row.id)">
                                <template #reference>
                                    <el-button type="danger" size="small" icon="delete"  ></el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-else>
                <el-form :inline="true">
                    <el-form-item label="属性名称">
                        <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" size="default" icon="Plus" :disabled="attrParams.attrName ? false : true"
                    @click="addAttrValue">添加属性值</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
                <el-table border class="el_table1" :data="attrParams.attrValueList">
                    <el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
                    <el-table-column label="属性值名称">
                        <template #="{ row, $index }">
                            <el-input placeholder="请输入属性值名称" v-model="row.valueName" v-if="row.flag"
                                @blur="toggle(row, $index)" :ref="(vc:any)=>{
                                    inputArr[$index]=vc;
                                }"></el-input>
                            <div v-else @click="changevf(row,$index)">{{ row.valueName }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #="{row,$index}">
                            <el-button size="default" @click="deleteAttrValue(row,$index)" type="primary" icon="Delete">删除</el-button>
                        </template>
                       
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="default" @click="saveAttrValue"
                    :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
                <el-button size="default" @click="cancel">取消</el-button>
            </div>

        </el-card>
    </div>
</template>
<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
import type { AttrList, Attr } from '@/api/product/attr/type'
import { reqAttr, reqCAttr,reqDelAttr } from '@/api/product/attr/iindex';
import { ref, watch, reactive, nextTick ,onBeforeUnmount} from 'vue';
import { ElMessage } from 'element-plus';

let attrData = ref<AttrList>([]);
let categoryStore = useCategoryStore();
//控制input聚焦显示切换
let inputArr = ref<any>([]);
//控制场景切换
let scene = ref<boolean>(true);
let attrParams = reactive<Attr>({
    attrName: '',//新增属性名字
    attrValueList: [

    ],//属性值数组
    categoryId: '',//某个三级分类的id
    categoryLevel: 3,//三级分类
});
const getAttrs = async () => {
    //console.log(reqAttr(categoryStore.c1_ID,categoryStore.c2_ID,categoryStore.c3_ID))
    let result = await reqAttr(categoryStore.c1_ID, categoryStore.c2_ID, categoryStore.c3_ID)
    if (result.code == 200) {
        attrData.value = result.data
        console.log(attrData.value)
    }
}
watch(() => categoryStore.c3_ID, () => {
    //清空查询结果
    attrData.value = [];
    if (categoryStore.c3_ID) {
        getAttrs();
    }
    const { c1_ID, c2_ID, c3_ID } = categoryStore;
    console.log(c1_ID, c2_ID, c3_ID);
})
const addAttr = () => {
    scene.value = false;
}
const deleteAttr= async(attrId)=>{
    let result = await reqDelAttr(attrId);
    if (result.code == 200){
        ElMessage({
            type: 'success',
            message: '删除成功'
        });
        getAttrs();
    }else{
        ElMessage({
            type: 'success',
            message: '删除失败'
        });
    }

}

const updateAttr = (row:Attr) => {
    //此为浅拷贝，需深拷贝
    //structureClone()
    //Object.assign(attrParams,row);
    //深拷贝
    //console.log(row)
    Object.assign(attrParams,JSON.parse(JSON.stringify(row)));
    scene.value = false;
}
const cancel = () => {
    scene.value = true;
}
const addAttrValue = () => {
    //添加属性值对象
    attrParams.attrValueList.push({
        valueName: '',
        flag: true,//显示切换控制位
    });
    nextTick(()=>{
        inputArr.value[attrParams.attrValueList.length-1].focus();
    })

}
const saveAttrValue = async () => {
    attrParams.categoryId = categoryStore.c3_ID;
    let result = await reqCAttr(attrParams);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: attrParams.id ? '修改成功' : '添加成功'
        });
        scene.value = true;
    } else {
        ElMessage({
            type: 'error',
            message: attrParams.id ? '修改失败' : '添加失败'
        });
    }
    //清空表格数据
    Object.assign(attrParams, {
        attrName: '',//新增属性名字
        attrValueList: [

        ],//属性值数组
        categoryId: '',//某个三级分类的id
        categoryLevel: 3,//三级分类
    });

    getAttrs();
}
const toggle = (row, $index) => {
    //校验内容不为空
    if (row.valueName.trim() == '') {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        });
        return;
    }
    //防止重复
    let repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName;
        }
    });
    if (repeat) {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        });
        return;
    }
    row.flag = false;


}
const changevf = (row,$index) => {
    row.flag = true;
    nextTick(()=>{
        inputArr.value[$index].focus();
    })
}
const deleteAttrValue=(row,$index)=>{
    attrParams.attrValueList.splice($index,1);
}

//跳转前清空数据
onBeforeUnmount(()=>{
    //仓库自带清空方法$reset
    categoryStore.$reset();
})
</script>

<style scoped lang="scss">
.main-card {
    margin-top: 20px;

    .el-table {
        margin: 10px 0px;

        .el_tag {
            margin: 5px;
        }
    }

    .el_table1 {
        margin: 10px 0px;
    }
}
</style>