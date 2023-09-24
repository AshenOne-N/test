<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
        <!--
            boder:设置边框
            label：某列标题
            width：宽度
            align：文字对齐
        -->
        <el-table :data="tableData" border style="width: 100%" class="el_table">
            <el-table-column type="index" label="序号" width="80px" align="center" />
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
            <el-table-column label="品牌LOGO">
                <template #="{ row, $index }">
                    <img :src="row.logoUrl" style="width:100px;height:100px;" alt="获取失败">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作">
                <template #="row, $index">
                    <el-button type="primary" size="small" icon="Edit" @click="updateTrademark(row)"></el-button>
                    
                    <el-popconfirm title="确定删除？" width="200px" icon="delete" @confirm="deleteTrademark(row)">
                        <template #reference>
                            <el-button type="danger" size="small" icon="delete"></el-button>
                        </template>
                    </el-popconfirm>
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
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
            :small="small" :disabled="disabled" :background="background"
            layout=" prev, pager, next, jumper, ->,sizes, total" :total="totalnumber" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
    <!-- :title="trademarkForm.id?'修改品牌':'添加品牌'"
    -->
    <el-dialog v-model="dialogFormVisible" :title="formtitle">
        <el-form :model="trademarkForm" style="width:90%;" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
                <el-input v-model="trademarkForm.tmName" autocomplete="off" placeholder="请输入品牌名称" />
            </el-form-item>
            <el-form-item label="品牌LOGO" :label-width="formLabelWidth" prop="logoUrl">
                <!--
                action:查资料为/admin/product/fileUpload
                加/api让代理工作
                -->
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <UploadFilled />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancel">Cancel </el-button>
                <el-button type="primary" @click="confirm">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">

import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import { reqHasTrademark, reqAddUpdateTM, reqDeleteTrademark } from '@/api/product/trademark/index';

import { ElMessage, type UploadProps } from 'element-plus';

import { Records, TrademarkResponseData, Trademark } from '@/api/product/trademark/type';

const tableData = ref<Records>([]);

const currentPage = ref<number>(1)
const pageSize = ref(3)
const small = ref(true)
const background = ref(true)
const disabled = ref(false)
const totalnumber = ref<number>(100);

//获取el-form组件实例
let formRef = ref();

//控制对话框显示隐藏
const formtitle = ref('')
const dialogFormVisible = ref(false)
//对话框表格内容
const trademarkForm = reactive<Trademark>({
    tmName: '',
    logoUrl: ''
})
const formLabelWidth = '90px';

//添加品牌回调
const addTrademark = () => {
    formtitle.value = '添加品牌'
    trademarkForm.id = 0;
    trademarkForm.tmName = ''
    trademarkForm.logoUrl = ''
    //清理校验结果
    //if(formRef){
    //    formRef.value.clearValidate('tmName');
    //   formRef.value.clearValidate('logoUrl');
    //}
    //可选链
    //formRef.value.clearValidate(['tmName','logoUrl']);

    //textTick
    nextTick(() => {
        formRef.value.clearValidate(['tmName', 'logoUrl']);
    })

    dialogFormVisible.value = true;
}
//删除品牌回调
const deleteTrademark = async (row) => {
    //console.log(row.row.id)
    let result = await reqDeleteTrademark(row.row.id);
    if(result.code == 200){
        ElMessage({
            type:'success',
            message:'删除品牌成功'
        })
        getTableData();
    }else{
        ElMessage({
            type:'error',
            message:'删除品牌失败'
        })
    }
}
//修改品牌回调
const updateTrademark = (row) => {
    //清空校验错误提示信息
    nextTick(() => {
        formRef.value.clearValidate(['tmName', 'logoUrl']);
    })

    formtitle.value = '修改品牌'
    console.log(row.row.logoUrl)
    //获取展示品牌信息
    //trademarkForm.id = row.row.id;
    //trademarkForm.tmName = row.row.tmName;
    //trademarkForm.logoUrl = row.row.logoUrl;
    //可用一行代码实现
    Object.assign(trademarkForm, row.row)

    dialogFormVisible.value = true;
}
//表单取消回调
const cancel = () => {
    dialogFormVisible.value = false;
}
//表单确认回调
const confirm = async () => {
    //发请求前 校验整个表单
    let checkResult = await formRef.value.validate();
    let result = await reqAddUpdateTM(trademarkForm);
    console.log(result);
    if (result.code == 200) {
        //关闭对话框
        dialogFormVisible.value = false;
        ElMessage({
            type: 'success',
            message: "添加品牌成功"
        });
        //重新获取全部品牌信息
        getTableData();
        //清空信息 resetfield或者 调用其close方法？
        trademarkForm.tmName = '';
        trademarkForm.logoUrl = '';
    } else {
        ElMessage({
            type: 'error',
            message: "添加品牌失败"
        })
    }

}
//上传前回调,成功前触发，参数为上传文件
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawfile) => {
    //uid:文件标识
    //name:文件名 png|jpg|gif
    //type:文件类型
    //size:文件大小  4M
    if (rawfile.type == 'image/png' || rawfile.type == 'image/jpeg' || rawfile.type == 'image/gif') {
        if (rawfile.size / 1024 / 1024 < 4) {

        } else {
            ElMessage({
                type: 'error',
                message: "大小超过4M"
            })
        }

    } else {
        ElMessage({
            type: 'error',
            message: "类型错误"
        })
        return false;
    }
}
//上传成功钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    //请求服务器返回数据，其中有url
    //imageUrl.value = URL.createObjectURL(uploadFile.raw!)
    trademarkForm.logoUrl = response.data
    //图片上传成功后清理图片校验结果
    formRef.value.clearValidate('logoUrl');
}

const getTableData = async () => {
    let result: TrademarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value);
    if (result.code == 200) {
        totalnumber.value = result.data.total;
        tableData.value = result.data.records;
    }
};
onMounted(() => {
    getTableData();
})

const handleSizeChange = (val: number) => {
    //console.log(`${val} items per page`) 

    getTableData();
}

//给父组件回传数据
//val为当前页码
const handleCurrentChange = async (val: number) => {
    //当前页码发生变化
    getTableData();
}

watch([currentPage, pageSize], () => {
    getTableData();
})
//自定义校验方法
//r:规则对象 v文本框内容，c放行函数
const validatorTmName = (r: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack();
    } else {
        callBack(new Error('长度小于两位'))
    }
}
//图片自定义校验
const validateLogoUrl = (r: any, v: any, callBack: any) => {
    if (v) {
        callBack();
    } else {
        callBack(new Error('必须上传LOGO图片'));
    }

}
//表单校验规则对象
const rules = {
    tmName: [
        {
            required: true,
            trigger: 'change',
            validator: validatorTmName
        }
    ],
    logoUrl: [
        {
            required: true,
            trigger: 'change',
            validator: validateLogoUrl
        }
    ]
}


</script>
<style scoped lang="scss">
.el_table {
    margin: 10px 0px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>