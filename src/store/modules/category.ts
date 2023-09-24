import { defineStore } from "pinia";
import { reqC1,reqC2,reqC3 } from "@/api/product/attr/iindex";
import type { CategoryRespnseData } from "@/api/product/attr/type";
import type { CategoryState } from "./types/type";
let useCategoryStore = defineStore('Category',{
    state:():CategoryState=>{
        return {
            c1_arr:[],
            c1_ID:'',
            c2_arr:[],
            c2_ID:'',
            c3_arr:[],
            c3_ID:'',
        }
    },
    actions:{
        async getC1(){
            let result:CategoryRespnseData = await reqC1();
            if(result.code ==200){
                this.c1_arr= result.data;
            }
        },
        async getC2(c1id:number|string){
            let result:CategoryRespnseData = await reqC2(c1id);
            if(result.code ==200){
                this.c2_arr= result.data;
            }
        },
        async getC3(c2id:number|string){
            let result:CategoryRespnseData = await reqC3(c2id);
            if(result.code ==200){
                this.c3_arr= result.data;
            }
        },
    },
    getters:{

    }
})
export default useCategoryStore;