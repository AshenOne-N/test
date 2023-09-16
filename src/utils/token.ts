//封装本地存储数据与读取数据方法
export const setToken = (token:string) =>{
    localStorage.setItem('TOKEN',token)
}
//获取数据
export const getToken = ()=>{
    return localStorage.getItem('TOKEN')
}
export const REMOVE_TOKEN = ()=>{
    localStorage.removeItem('TOKEN');
}