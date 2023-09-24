//定义小仓库数据state类型
//路由对象类型
import type { RouteRecordRaw } from "vue-router";
import type { CategoryObj } from "@/api/product/attr/type";
export interface UserState{
    token:string|null,
    username:string,
    avatar:string,

    menuRoutes:RouteRecordRaw[]
}
//定义分类仓库state对象类型
export interface CategoryState{
    c1_ID:string|number,
    c1_arr:CategoryObj[],
    c2_ID:string|number,
    c2_arr:CategoryObj[],
    c3_ID:string|number,
    c3_arr:CategoryObj[],
}