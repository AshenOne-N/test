import axios from "axios";
import { ElMessage } from "element-plus";
//引入token
import useUserStore  from "@/store/modules/user";

let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});

request.interceptors.request.use((config) => {
  //config.headers.token='123'携带token
  //console.log(config)
  //添加token
  let userStore = useUserStore();
  if(userStore.token){
    config.headers.token = userStore.token;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    console.log(response.data);
    return response.data;
  },
  (error) => {
    let msg = "";
    let status = error.response.status;
    console.log(11111);
    switch (status) {
      case 401:
        msg = "Token过期";
        break;
      case 403:
        msg = "无权访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "网络出现问题";
        break;
    }
    ElMessage({
      type: "error",
      msg,
    });
    return Promise.reject(error);
  }
);

export default request;
