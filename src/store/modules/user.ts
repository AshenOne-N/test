//创建用户相关仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin ,reqUserInfo} from '@/api/user'
//引入数据类型
import type { loginForm ,loginResponseData} from '@/api/user/type'
import type { UserState } from './types/type'

//引入路由，常量
import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User',{
    state:():UserState=>{
        return {
            token:localStorage.getItem("TOKEN"),
            username:'',
            avatar:'',

            menuRoutes:constantRoute,//仓库存储菜单需要的数组
        }
    },
    actions:{
        async userLogin(data:loginForm){
            let result:loginResponseData = await reqLogin(data)
            console.log(result)
            if(result.code === 200){
                this.token = (result.data.token as string);
                //本地存储持久化存储token
                localStorage.setItem("TOKEN",(result.data.token as string));
                return 'ok';//无返回或返回‘ok'都会返回一个成功的promise对象
            }else{
                return Promise.reject(new Error(result.data.message));
            }
        },
        async userInfo(){
           let result = await reqUserInfo();
           console.log(result)
           if(result.code == 200){
            this.username = result.data.checkUser.username;
            this.avatar = result.data.checkUser.avatar;
           }else{

           }
        }
    }
})

export default useUserStore