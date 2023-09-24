//属性相关API
import request from '@/utils/request';
import type { CategoryRespnseData ,AttrResponseData,Attr} from './type';
enum API{
    C1_URL='/admin/product/getCategory1',
    C2_URL='/admin/product/getCategory2/',
    C3_URL='/admin/product/getCategory3/',
    ATTR_URL='/admin/product/attrInfoList/',
    //添加修改属性
    CATTR_URL='/admin/product/saveAttrInfo',
    DELATTR_URL='/admin/product/deleteAttr/'
}
//获取1级分类
export const reqC1 = ()=>{
    return request.get<any,CategoryRespnseData>(API.C1_URL);
}
export const reqC2 = (C1ID:number|string)=>{
    return request.get<any,CategoryRespnseData>(API.C2_URL+C1ID);
}
export const reqC3 = (C2ID:number|string)=>{
    return request.get<any,CategoryRespnseData>(API.C3_URL+C2ID);
}
export const reqAttr = (C1ID:number|string,C2ID:number|string,C3ID:number|string)=>{
    return request.get<any,AttrResponseData>(API.ATTR_URL + `${C1ID}/${C2ID}/${C3ID}`)
}
export const reqCAttr =(data:Attr)=>{
    return request.post<any,any>(API.CATTR_URL,data);
}
export const reqDelAttr = (AttrId)=>{
    return request.delete<any,any>(API.DELATTR_URL+AttrId);
}