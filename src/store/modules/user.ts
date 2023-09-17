//创建用户相关仓库
import { defineStore } from 'pinia'
//引入接口
import { reqLogin ,reqUserInfo,reqLogout} from '@/api/user'
//引入数据类型
import type { loginForm ,loginResponseData,userInfoResponseData} from '@/api/user/type'
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
            let result:loginResponseData = await reqLogin(data);
            console.log(result);
            if(result.code === 200){
                this.token = (result.data as string);
                //本地存储持久化存储token
                localStorage.setItem("TOKEN",(result.data as string));
                return 'ok';//无返回或返回‘ok'都会返回一个成功的promise对象
            }else{
                return Promise.reject(new Error(result.data));
            }
        },
        async userInfo(){
           let result:userInfoResponseData = await reqUserInfo();
           console.log(result);
           if(result.code == 200){
            this.username = result.data.name;
            this.avatar = result.data.avatar;
            return 'ok';
           }else{
            return  Promise.reject(new Error(result.message));
           }
        },
        async userLogout(){
            let result:any = await reqLogout();
            console.log(result);
            if(result.code == 200){
                this.token='';
                this.username='';
                this.avatar = '';
                localStorage.removeItem('TOKEN');
                return 'ok';
            }else{
                return  Promise.reject(new Error(result.message));
            }

        }
    }
})

export default useUserStore