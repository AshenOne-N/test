//分类相关类型
export interface ResponseData{
    code:number,
    ok:boolean,
    message:string
}
export interface CategoryObj{
    id:number|string,
    name:string,
    category1Id?:number,
    category2Id?:number,
    category3Id?:number
}
//分类接口返回数据类型
export interface CategoryRespnseData extends ResponseData{
    data:CategoryObj[]
}
//属性与属性值类型
export interface AttrValue{
    id?:number,
    valueName:string,
    attrId?:number,
    flag?:boolean
}
export type AttrValueList = AttrValue[]

export interface Attr{
    id?:number,
    attrName:string|number,
    categoryId:number|string,
    categoryLevel:number,
    attrValueList:AttrValueList
}
export type AttrList = Attr[];
export interface AttrResponseData extends ResponseData{
    data:AttrList;
}