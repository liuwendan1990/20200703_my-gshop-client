/* 
    管理shop功能相关状态数据的vuex模块
*/
import Vue from 'vue'
import {
    reqShopInfo,
    reqShopRatings,
    reqShopGoods
} from '../../api'
import {
    RECEIVE_INFO,
    RECEIVE_RATINGS,
    RECEIVE_GOODS,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_CART
} from '../mutaion-types'

const state = {
    goods: [], // 商品列表
    ratings: [], // 商家评价列表
    info: {}, // 商家信息
    cartFoods:[],//购物车food数组
}
const mutations = {
    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    
    [RECEIVE_RATINGS](state, {ratings}) {
        state.ratings = ratings
    },
    
    [RECEIVE_GOODS](state, {goods}) {
        state.goods = goods
    },

    [ADD_FOOD_COUNT](state, {food}) {
        if(food.count){
            food.count++
        }else{
            //给food添加一个新的属性，属性名是count，值是1===>没有数据绑定
            // food.count = 1
            //向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。
            Vue.set(food,'count',1)
            //添加到购物车
            state.cartFoods.push(food)
        }
        
    },

    [REDUCE_FOOD_COUNT](state, {food}) {
        if(food.count>0){
            food.count--
            if(food.count===0){
                state.cartFoods.splice(state.cartFoods.indexOf(food),1)
            }
        }
    },

    [CLEAR_CART](state){
        //将购物车中所有food的count清除
        state.cartFoods.forEach(food => {
            food.count = 0
        });
        //清空购物车数组
        state.cartFoods = []
    }
}
const actions = {
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

    updateFoodCount({commit},{isAdd,food}){
        if(isAdd){
            commit(ADD_FOOD_COUNT,{food})
        }else{
            commit(REDUCE_FOOD_COUNT,{food})
        }
    }
}
const getters = {
    /* 每次点+/-都会重新计算 */
    // cartFoods(state) {
    //     const {goods} = state
    //     const arr = []
    //     goods.forEach(good => {
    //         good.foods.forEach(food=>{
    //             if(food.count>0){
    //                 arr.push(food)
    //             }
    //         })
    //     });
    //     return arr
    // }

    //总数量
    totalCount (state) {
        return state.cartFoods.reduce((pre,food)=>pre+food.count,0)
    },
    //总价格
    totalPrice(state){
        return state.cartFoods.reduce((pre,food)=>pre+food.count*food.price,0)
    },
    /*
     总商家评论数
   */
    totalRatingsCount(state) {
        return state.ratings.length
    },

    /*
    总商家推荐评论数
    */
    positiveRatingsCount(state) {
        return state.ratings.reduce((pre, rating) => pre + (rating.rateType === 0 ? 1 : 0), 0)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}