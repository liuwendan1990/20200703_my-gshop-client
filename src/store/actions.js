/* 
 包含n个间接更新状态数据的方法的对象
*/
import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqAutoLogin,
    reqShopInfo,
    reqShopRatings,
    reqShopGoods
} from '../api'
import {
    RECEIVE_ADDRESS,
    RECEIVE_CATEGORYS,
    RECEIVE_SHOPS,
    RECEIVE_USER,
    RECEIVE_TOKEN,
    RESET_USER,
    RESET_TOKEN,

    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS
} from './mutaion-types'

export default {
    /* 
        获取当前地址信息的异步action
    */
   async getAddress ({commit, state}){
        // 1、调用接口请求函数发请求
        const {latitude,longitude} = state;
        const result = await reqAddress(latitude,longitude)
        //2、有了结果，提交mutation
        if(result.code === 0){
            const address = result.data;
            commit(RECEIVE_ADDRESS,address)
        }
   },

   /* 
        获取商品分类列表的异步action
    */
   async getCategorys ({commit}, callback){
        // 1、调用接口请求函数发请求
        const result = await reqCategorys()
        //2、有了结果，提交mutation
        if(result.code === 0){
            const categorys = result.data;
            commit(RECEIVE_CATEGORYS,categorys)

            //在commit之后执行callback
            // callback && callback();//状态数据改变之后执行
            typeof callback ==='function' && callback();//状态数据改变之后执行
        }
    },

    /* 
        获取商家列表的异步action
    */
   async getShops ({commit, state}){
        // 1、调用接口请求函数发请求
        const {latitude,longitude} = state;
        const result = await reqShops(latitude,longitude)
        //2、有了结果，提交mutation
        if(result.code === 0){
            const shops = result.data;
            commit(RECEIVE_SHOPS,shops)
        }
    },
    /* 
        保存user的同步action
    */
    saveUser({commit},user){
        const token = user.token;
        //将token保存到localStorage
        localStorage.setItem('token_key', token)
        //将token保存到state
        commit(RECEIVE_TOKEN,{token})
        //删除user中的token
        delete user.token;
        commit(RECEIVE_USER,{user})
    },
    /* 
        退出登录
    */
   logout({commit}){
        commit(RESET_USER)
        commit(RESET_TOKEN)
        localStorage.removeItem('token_key')
    },
    /* 
        自动登录的异步action
    */
    async autoLogin({commit, state}){
        if(state.token){
            const result= await reqAutoLogin()
            if(result.code===0){
                const user = result.data;
                commit(RECEIVE_USER,{user})
            }
        }
    },

    // 异步获取商家信息
    async getShopInfo({commit}, cb) {
        const result = await reqShopInfo()
        if(result.code===0) {
        const info = result.data
        info.score = 3.5
        commit(RECEIVE_INFO, {info})
    
        cb && cb()
        }
    },
    
    // 异步获取商家评价列表
    async getShopRatings({commit}, cb) {
        const result = await reqShopRatings()
        if(result.code===0) {
        const ratings = result.data
        commit(RECEIVE_RATINGS, {ratings})
    
        cb && cb()
        }
    },
    
    // 异步获取商家商品列表
    async getShopGoods({commit}, cb) {
        const result = await reqShopGoods()
        if(result.code===0) {
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
        cb && cb()
        }
    },

}