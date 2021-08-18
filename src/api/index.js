/* 
 包含多个接口请求函数的模块
 函数的返回值是promise对象
*/
import ajax from './ajax'

const BASE = '/api'
const BASE2 = '/baidu'
/* eslint-disable no-console */
/* 1、根据经纬度获取位置详情 */
export const reqAddress = (latitude,longitude) =>ajax({
    method:'GET',//可以不写
    url:BASE + `/position/${latitude},${longitude}`
})

/* 2、获取食品分类列表 */
export const reqCategorys = ()=>ajax.get(BASE + '/index_category',{
    headers:{
        needToken:true
    }
})

/* 3、根据经纬度获取商铺列表 */
export const reqShops = ({latitude,longitude})=>ajax({
    url:BASE + '/shops',
    params:{latitude,longitude},
    headers:{
        needToken:true
    }
})
/* 测试 */
// reqAddress('40.10038','116.36867').then((result)=>{
//     console.log('result',result)
// })
// reqShops('40.10038','116.36867').then((result)=>{
//     console.log('result',result)
// })

/* 
4、发送短信验证码
*/
export const reqSendCode = (phone) =>ajax.get(BASE + '/sendcode',{
    params:{
        phone
    }
})

/* 
5、用户名密码登录
*/
export const reqPwdLogin = ({name,pwd,captcha}) =>ajax.post(BASE + '/login_pwd',{
   name,
   pwd,
   captcha
})

/* 
6、手机号短信验证码登录
*/
export const reqSmsLogin = (phone,code) =>ajax.post(BASE + '/login_sms',{
    phone,
    code
 })

/* 
 7、自动登录
*/
export const reqAutoLogin = () =>ajax({
    url:BASE + '/auto_login',
    headers:{
        needToken:true
    }
    
 })

export const reqBaiDuXxx=()=>ajax(BASE2+'/xxx')

/**
 * 获取商家信息
 */
export const reqShopInfo = () => ajax('/shop_info')

/**
 * 获取商家评价数组
 */
export const reqShopRatings = () => ajax('/shop_ratings')

/**
 * 获取商家商品数组
 */
export const reqShopGoods = () => ajax('/shop_goods')