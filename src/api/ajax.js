/* 
能发送ajax的函数（axios），函数的返回值是promise
1、处理post请求的请求体参数：转换为urlencode格式（默认用的json格式）---》请求拦截器处理
2、让成功的结果不是response，而是response.data--->响应拦截器的成功回调
3、统一处理请求错误：响应拦截器的失败回调
4、如果需要携带token的请求，从state中取出token
    1）没有，不发请求，直接进入失败的流程
    2）有，添加到请求头中：Authorization=token
*/
import axios from 'axios'
import qs from 'qs'

import store from '../store'
//axios.defaults.baseURL = 'http://localhost:4000'
// 浏览器不能跨域请求，当前是localhost：8080，应用其代理请求

//添加请求拦截器
axios.interceptors.request.use(config=>{
    //1、处理post请求的请求体参数：转换为urlencode格式（默认用的json格式）
    const {method,data} = config
    if(method.toUpperCase() === 'POST' && data instanceof Object){
        config.data = qs.stringify(data)
    }
    //4、如果需要携带token的请求，从state中取出token
    if(config.headers.needToken){
        const token = store.state.token;
        //1）没有，不发请求，直接进入失败的流程
        if(!token){
            const error = new Error('没有token,不能发请求')
            throw error
        }else{ //2）有，添加到请求头中：Authorization=token
            config.headers['Authorization']=token
        }
       
    }
    return config
})
//添加相应拦截器
axios.interceptors.response.use(response=>{
    //让成功的结果不是response，而是response.data
    return response.data
},error=>{
    alert('请求异常：'+error.message)
    //中断promise链
    return new Promise(()=>{})
})

export default axios
