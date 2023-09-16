//定义小仓库数据state类型
//路由对象类型
import type { RouteRecordRaw } from "vue-router";

export interface UserState{
    token:string|null,
    username:string,
    avatar:string,

    menuRoutes:RouteRecordRaw[]
}