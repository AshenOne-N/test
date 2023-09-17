//路由鉴权,即访问限制
import router from '@/router'
import nprogress from 'nprogress'
//引入进度样式
import 'nprogress/nprogress.css'
//不要加载圆球
nprogress.configure({showSpinner:false});
//获取用户仓库数据
import useUserStore from './store/modules/user'
import pinia from './store'
let userStore = useUserStore(pinia);
import setting from './setting'

//全局前置守卫
router.beforeEach(async (to:any,from:any,next:any)=>{ //内部有await，这里加async
    //修改标签名
    //document.title = setting.title + to.meta.title;
    document.title = `${setting.title}-${to.meta.title}`;
    //to:访问对象
    //from之前对象
    //next放行函数
    nprogress.start();
    //获取token判断登录与否
    //获取用户信息
    let username = userStore.username;
    let token = userStore.token;
    if(token){
        if(to.path=='/login'){
            next({path:'/'});//登录成功，访问login
        }else{//访问其余路由
            if(username){//有用户信息，放行
                next();
            }else{
                try{
                    //获取用户信息后放行
                    await userStore.userInfo();
                    next();
                }catch(error){
                    //token过期或异常
                    //退出登录，清空数据
                    await userStore.userLogout();
                    next({path:'/login',query:{redirect:to.path}});
                }
            }
            
        }
    }else{
        if(to.path == '/login'){
            next();
        }else{
            next({path:'/login',query:{redirect:to.path}});
        }
    }
    //next();
    
})
//全局后置守卫
router.afterEach((to,from)=>{
    nprogress.done();
})
//全部路由：登录，404，任意，首页，数据大屏，权限管理，商品管理
//未登录：login，其他指向login
//登录成功：login指向首页，其余可以
