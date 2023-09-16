function createUserList(){
    return [
        {
            userId:1,
            avatar:'http://n.sinaimg.cn/sinacn/w800h600/20180204/22d4-fyrhcqy2922590.gif',
            username:'admin',
            password:'111111',
            desc:'administrator',
            roles:['admin'],
            buttons:['cuser.detail'],
            routes:['home'],
            token:'Admin Token',
        },
        {
            userId:2,
            avatar:'',
            username:'system',
            password:'111111',
            desc:'system',
            roles:['system'],
            buttons:['cuser.detail','cuser.user'],
            routes:['home'],
            token:'System Token',
        },
    ]
}
//对外暴露两个接口
//登录
//获取用户信息
export default[
{
    url:'/api/user/login',
    method:'POST',
    response:({body})=>{
        const {username,password} = body;
        const checkUser = createUserList().find(
            (item)=>item.username === username && item.password === password,
        )
        if(!checkUser){
            return {code:201,data:{message:'account or password error!'}}
        }
        const {token} = checkUser
        return {code:200,data:{token}}
    }
},
{
    url:'/api/user/info',
    method:'get',
    response:(request)=>{
        const token = request.headers.token;
        const checkUser = createUserList().find(
            (item)=>item.token ===token
        )
        if(!checkUser){
            return {code:201,data:{message:"acquire user info failed."}}
        }
        return {code:200,data:{checkUser}}
    }

}
]