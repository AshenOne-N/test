import request from '@/utils/request';
import type { TrademarkResponseData } from './type';
//接口地址
enum API{
    TRADEMARK_URL='/admin/product/baseTrademark/'
}
//获取已有品牌接口方法
//page:第几页，默认第一页
//limit:几个品牌，默认3
export const reqHasTrademark = (page:number,limit:number) =>request.get<any,TrademarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`);