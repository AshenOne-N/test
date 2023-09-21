import request from "@/utils/request";
import type { TrademarkResponseData, Trademark } from "./type";
//接口地址
enum API {
  TRADEMARK_URL = "/admin/product/baseTrademark/",
  //添加品牌
  ADD_TM_URL = "/admin/product/baseTrademark/save",
  //修改已有品牌
  UPDATE_TM_URL = "/admin/product/baseTrademark/update",
  //删除已有品牌
  DELETE_TM_URL = "/admin/product/baseTrademark/remove/",
}
//获取已有品牌接口方法
//page:第几页，默认第一页
//limit:几个品牌，默认3
export const reqHasTrademark = (page: number, limit: number) =>
  request.get<any, TrademarkResponseData>(
    API.TRADEMARK_URL + `${page}/${limit}`
  );
//添加修改品牌方法
export const reqAddUpdateTM = (data: Trademark) => {
  if (data.id) {
    //修改
    return request.put<any, any>(API.UPDATE_TM_URL);
  } else {
    //新增
    return request.post<any, any>(API.ADD_TM_URL);
  }
};
//删除品牌
export const reqDeleteTrademark = (id: number) => {
  return request.delete<any, any>(API.DELETE_TM_URL + id);
};
