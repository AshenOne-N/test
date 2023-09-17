<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0">1</el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="eleform">
                    <h1>Hello</h1>
                    <h2>另一个世界在等待</h2>
                    <el-form-item prop="username">
                        <el-input v-model="loginForm.username" :prefix-icon="User"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" v-model="loginForm.password" :prefix-icon="Lock" show-password>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" class="login_btn" :loading="loading" @click="loginSubmit">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive,ref } from 'vue';
import useUserStore from '@/store/modules/user';
import {useRouter,useRoute} from 'vue-router';
import {ElNotification} from 'element-plus';
//导入时间判断函数
import {getTime} from '@/utils/getTime';

let $router = useRouter();
let $route = useRoute();

let useStore = useUserStore();

let loginForm = reactive({
    username: 'admin',
    password: 'atguigu123'
})
let loading = ref(false);

//获取表单组件实例,必须与ref属性值一样包括大小写
let eleform = ref();

//const loginSubmit = async () =>{}
async function loginSubmit() {
    await eleform.value.validate()
    loading.value = true;
    try{
        await useStore.userLogin(loginForm);
        //判断登录路径是否有query参数，有跳query，无跳首页
        let redirect:any = $route.query.redirect;
        $router.push({path:redirect||'/'});
        //$router.push('/');
        ElNotification({
            type:'success',
            message:"欢迎回来",
            title:`Hi,${getTime()}好`
        })
        loading.value = false;
    }catch(error){
        ElNotification({
        type:'error',
        message:(error as Error).message
        })
        loading.value = false;
    }
    
}
//默认校验
/*
const rules = {
    username:[
        {required:true,message:"用户名必须大于5位",min:5,max:12,trigger:"blur"}
    ],
    password:[
        {required:true,message:"用户名必须大于5位",min:6,max:12,trigger:"change"}
    ]
}
*/
//自定义校验
//value 表单元素文本内容
const vldUsername = (rule:any,value:any,callback:any)=>{
    
    if(value.length >= 5){
        callback();
    }else{
        callback(new Error('账号长度必须大于5位'));
    }
}
const vldPassword = (rule:any,value:any,callback:any)=>{
    //if(/^\d{6,15}$/.test(value)){
    if(value.length >=6){
        callback();
    }else{
        callback(new Error('密码长度必须在6到15位之间'));
    }
}

const rules = {
    username:[
        {trigger:"blur",validator:vldUsername}
    ],
    password:[
    {trigger:"change",validator:vldPassword}
    ]
}

</script>
<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/background04.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width:70%;
        top: 55vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0;
        }

        .login_btn {
            width: 100%;
        }
    }

}
</style>