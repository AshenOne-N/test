//统一管理项目用户相关接口
import request from "@/utils/request";
import type { loginForm,loginResponseData,userInfoResponseData } from "./type";

enum API{
    LOGIN_URL='/admin/acl/index/login',
    USERINFO_URL='/admin/acl/index/info',
    LOGOUT_URL='/admin/acl/index/logout'
}
//登录请求
export const reqLogin = (data:loginForm)=>request.post<any,loginResponseData>(API.LOGIN_URL,data);
//获取用户信息
export const reqUserInfo = ()=>request.get<any,userInfoResponseData>(API.USERINFO_URL);
//退出登录
export const reqLogout = ()=>request.post<any,any>(API.LOGOUT_URL);
/*统一管理接口
enum API{
    LOGIN_URL='/user/login',
    USERINFO_URL='/user/info'
}
export const reqLogin = (data:loginForm)=>request.post<any,loginResponseData>(API.LOGIN_URL,data);

export const reqUserInfo = ()=>request.get<any,userResponseData>(API.USERINFO_URL)*/


